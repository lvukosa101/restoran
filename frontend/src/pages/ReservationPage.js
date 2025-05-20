import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";

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

  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setSelectedTable("");
    setReservationConfirmed(false);
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
      setShowSummary(false);
      setReservationConfirmed(true);
      setNapomena("");

      setTimeout(() => {
        setSelectedTime("");
        setSelectedTable("");
        setReservationConfirmed(false);
        setConfirmedData(null);
      }, 3000);
    } catch (err) {
      console.error("Greška pri slanju rezervacije:", err.response?.data || err.message);
      alert("Greška pri slanju rezervacije.");
    }
  };

  return (
    <>
      <HeaderLoggedIn />

      <div style={{ padding: "40px", position: "relative" }}>
        <h2>REZERVACIJA TERMINA</h2>

        {reservationConfirmed && confirmedData && (
          <div style={{ marginBottom: "30px", backgroundColor: "#e0ffe0", padding: "20px", borderRadius: "10px" }}>
            <h4>Rezervacija je potvrđena!</h4>
            <p><strong>Datum:</strong> {confirmedData.datum}</p>
            <p><strong>Vrijeme:</strong> {confirmedData.vrijeme}</p>
            <p><strong>Stol:</strong> {confirmedData.selectedTable}</p>
            <p><strong>Napomena:</strong> {confirmedData.napomena || "(nema napomene)"}</p>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ maxWidth: "320px" }}>
            <label>Odaberite datum:</label>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={today}
            />

            {selectedDate && (
              <>
                <label style={{ marginTop: "20px", display: "block" }}>Odaberite vrijeme:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{ display: "block", marginBottom: "20px" }}
                >
                  <option value="">--</option>
                  {sviTermini
                    .filter((t) => getSlobodniStoloviZaTermin(t).length > 0)
                    .map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                </select>
              </>
            )}

            {selectedTime && (
              <>
                <label style={{ marginTop: "20px", display: "block" }}>Odaberite stol:</label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  style={{ display: "block", marginBottom: "20px" }}
                >
                  <option value="">--</option>
                  {getSlobodniStoloviZaTermin(selectedTime).map((table) => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </>
            )}

            <Button text="ODABERI" onClick={() => setShowSummary(true)} disabled={!isFormComplete} />
          </div>

          <div>
            <img src="/eva.png" alt="Restoran" style={{ width: "600px", height: "auto", border: "1px solid #ccc" }} />
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ReservationPage;
