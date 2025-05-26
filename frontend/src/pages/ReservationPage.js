import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../components/Button";
import axios from "axios";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import "../styles/ReservationPage.css";

const sviTermini = ["12:00", "14:00", "16:00", "18:00", "20:00"];
const sviStolovi = Array.from({ length: 12 }, (_, i) => `Stol ${i + 1}`);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [napomena, setNapomena] = useState("");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [zauzetiTerminiPoStolu, setZauzetiTerminiPoStolu] = useState({});
  const [confirmedData, setConfirmedData] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setSelectedTable("");
    setReservationConfirmed(false);
    setConfirmedData(null);
    try {
      const formatted = formatDate(date);
      const res = await axios.get("http://localhost:5000/api/rezervacije/zauzeti-termini-po-datumu", {
        params: { datum: formatted },
      });
      setZauzetiTerminiPoStolu(res.data || {});
    } catch (err) {
      console.error("Greška pri dohvaćanju zauzetih termina:", err);
      setZauzetiTerminiPoStolu({});
    }
  };

  const getSlobodniStoloviZaTermin = (termin) => {
    const zauzetiStolovi = zauzetiTerminiPoStolu[termin] || [];
    return sviStolovi.filter((s) => !zauzetiStolovi.includes(parseInt(s.replace("Stol ", ""))));
  };

  const isTimeInFuture = (time) => {
    if (!selectedDate) return true;

    const now = new Date();
    const selected = new Date(selectedDate);

    const [hours, minutes] = time.split(":").map(Number);
    selected.setHours(hours, minutes, 0, 0);

    return selected > now;
  };

  const isFormComplete = selectedDate && selectedTime && selectedTable;

  const handleConfirm = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      const brojStola = parseInt(selectedTable.replace("Stol ", ""));

      const payload = {
        korisnik_ime: currentUser.ime || "Gost",
        korisnik_prezime: currentUser.prezime || "",
        korisnik_email: currentUser.email || "",
        datum: formatDate(selectedDate),
        vrijeme: selectedTime,
        broj_stola: brojStola,
        napomena: napomena
      };

      await axios.post("http://localhost:5000/api/rezervacije", payload);

      setConfirmedData({ ...payload, selectedTable });
      setReservationConfirmed(true);
    } catch (err) {
      console.error("Greška pri slanju rezervacije:", err.response?.data || err.message);
      alert("Greška pri slanju rezervacije.");
    }
  };

  const handleCloseModal = () => {
    window.location.reload(); // Osvježi stranicu
  };

  return (
    <>
      <HeaderLoggedIn />

      <div style={{ padding: "40px", position: "relative" }}>
        <h2>REZERVACIJA TERMINA</h2>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ maxWidth: "420px" }}>
            <label className="section-label">Odaberite datum:</label>
            <div className="calendar-container">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={today}
              />
            </div>

            {selectedDate && (
              <>
                <div className="section-label">Odaberite vrijeme:</div>
                <div className="custom-select-grid">
                  {sviTermini
                    .filter(
                      (t) =>
                        getSlobodniStoloviZaTermin(t).length > 0 &&
                        isTimeInFuture(t)
                    )
                    .map((time) => (
                      <div
                        key={time}
                        className={`select-card ${selectedTime === time ? "selected" : ""}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </div>
                    ))}
                </div>
              </>
            )}

            {selectedTime && (
              <>
                <div className="section-label">Odaberite stol:</div>
                <div className="custom-select-grid">
                  {getSlobodniStoloviZaTermin(selectedTime).map((table) => (
                    <div
                      key={table}
                      className={`select-card ${selectedTable === table ? "selected" : ""}`}
                      onClick={() => setSelectedTable(table)}
                    >
                      {table}
                    </div>
                  ))}
                </div>
              </>
            )}

            {isFormComplete && (
              <div style={{ marginTop: "20px" }}>
                <Button text="ODABERI" onClick={() => setShowSummary(true)} />
              </div>
            )}

          </div>

          <div>
            <img
              src="/eva.png"
              alt="Restoran"
              className="restaurant-image"
            />
          </div>
        </div>

        {showSummary && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999
          }}>
            <div style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
              minWidth: "300px"
            }}>
              {reservationConfirmed ? (
                <>
                  <h4>Rezervacija je poslana!</h4>
                  <p><strong>Datum:</strong> {confirmedData?.datum}</p>
                  <p><strong>Vrijeme:</strong> {confirmedData?.vrijeme}</p>
                  <p><strong>Stol:</strong> {confirmedData?.selectedTable}</p>
                  <p><strong>Napomena:</strong> {confirmedData?.napomena || "(nema napomene)"}</p>
                  <Button text="Zatvori" onClick={handleCloseModal} />
                </>
              ) : (
                <>
                  <h4>Sažetak odabrane rezervacije:</h4>
                  <p><strong>Datum:</strong> {selectedDate.toLocaleDateString()}</p>
                  <p><strong>Vrijeme:</strong> {selectedTime}</p>
                  <p>{selectedTable}</p>
                  <textarea
                    placeholder="Unesite napomenu..."
                    value={napomena}
                    onChange={(e) => setNapomena(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginTop: "15px", padding: "10px", resize: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                    <Button text="Povratak" onClick={() => setShowSummary(false)} />
                    <Button text="POTVRDI" onClick={handleConfirm} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ReservationPage;
