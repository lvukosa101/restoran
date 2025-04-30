import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../components/Button";

const termini = ["12:00", "14:00", "16:00", "18:00", "20:00"];

const stolovi = [
  "Stol 1", "Stol 2", "Stol 3", "Stol 4", "Stol 5", "Stol 6",
  "Stol 7", "Stol 8", "Stol 9", "Stol 10", "Stol 11", "Stol 12"
];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`; // npr. "2025-05-01"
};

function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [isDateAvailable, setIsDateAvailable] = useState(false);
  const [napomena, setNapomena] = useState("");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates = {
    "2025-05-01": true,
    "2025-05-02": false,
    "2025-05-03": true
  };

  const handleDateChange = (date) => {
    const dateString = formatDate(date);
    const isAvailable = !!availableDates[dateString];
    setSelectedDate(date);
    setSelectedTime("");
    setSelectedTable("");
    setIsDateAvailable(isAvailable);
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dateString = formatDate(date);

    if (!availableDates.hasOwnProperty(dateString)) return null;

    const isAvailable = availableDates[dateString];

    return (
      <div style={{ textAlign: "center", marginTop: 2 }}>
        <span style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isAvailable ? "green" : "red"
        }} />
      </div>
    );
  };

  const handleConfirm = () => {
    setShowSummary(false);
    setReservationConfirmed(true);
  };

  const isFormComplete = selectedDate && selectedTime && selectedTable;

  return (
    <div style={{ padding: "40px" }}>
      <h2>REZERVACIJA TERMINA</h2>

      {reservationConfirmed && (
        <div style={{ marginBottom: "30px", backgroundColor: "#e0ffe0", padding: "20px", borderRadius: "10px" }}>
          <h4>Rezervacija je potvrđena!</h4>
          <p><strong>Datum:</strong> {selectedDate.toLocaleDateString()}</p>
          <p><strong>Vrijeme:</strong> {selectedTime}</p>
          <p><strong>Stol:</strong> {selectedTable}</p>
          <p><strong>Napomena:</strong> {napomena || "(nema napomene)"}</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ maxWidth: "320px" }}>
          <label>Odaberite datum:</label>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={today}
            tileContent={tileContent}
          />

          {selectedDate && isDateAvailable && (
            <>
              <label style={{ marginTop: "20px", display: "block" }}>Odaberite termin:</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ display: "block", marginBottom: "20px" }}
              >
                <option value="">--</option>
                {termini.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>

              <label>Odaberite stol:</label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                style={{ display: "block", marginBottom: "20px" }}
              >
                <option value="">--</option>
                {stolovi.map((table) => (
                  <option key={table} value={table}>{table}</option>
                ))}
              </select>

              <Button text="ODABERI" onClick={() => setShowSummary(true)} disabled={!isFormComplete} />
            </>
          )}

          {selectedDate && !isDateAvailable && (
            <p style={{ color: "red", marginTop: "20px" }}>Za odabrani datum nisu dostupni termini.</p>
          )}
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
  );
}

export default ReservationPage;
