import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile() {
  const [racuni, setRacuni] = useState(["", "", "", "", ""]);
  const [popustGeneriran, setPopustGeneriran] = useState(false);
  const [sifra, setSifra] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (racuni.every(r => r.trim() !== "") && !popustGeneriran) {
      const kod = "POPUST-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setSifra(kod);
      setPopustGeneriran(true);
    }
  }, [racuni, popustGeneriran]);

  const handleInput = (index, value) => {
    const trimmed = value.trim();

    const alreadyExists = racuni.some((r, i) => i !== index && r.trim() === trimmed);
    if (alreadyExists) {
      alert("⚠️ Ovaj broj računa je već unesen.");
      return;
    }

    const novi = [...racuni];
    novi[index] = trimmed;
    setRacuni(novi);
  };

  const handleSpremi = async () => {
    try {
      const popunjeni = racuni.filter(r => r.trim() !== "");

      const res = await axios.post("http://localhost:5000/api/racuni/vise", {
        korisnik_email: user.email,
        racuni: popunjeni
      });

      alert(`✅ Spremljeno ${res.data.spremljeno} računa.`);
    } catch (err) {
      console.error("Greška pri slanju računa:", err);
      alert("Došlo je do greške. Pokušajte ponovno.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", fontFamily: "Segoe UI" }}>
      <h2>Osobni profil</h2>

      {user ? (
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
          <p><strong>Ime:</strong> {user.ime}</p>
          <p><strong>Prezime:</strong> {user.prezime}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Uloga:</strong> {user.role}</p>

          <h4 style={{ marginTop: "30px" }}>Upiši brojeve računa:</h4>
          {racuni.map((r, i) => (
            <input
              key={i}
              type="text"
              value={r}
              onChange={(e) => handleInput(i, e.target.value)}
              placeholder={`Račun ${i + 1}`}
              style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
            />
          ))}

          <button
            onClick={handleSpremi}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Spremi račune
          </button>

          {popustGeneriran && (
            <div style={{
              marginTop: "20px",
              backgroundColor: "#d4edda",
              padding: "15px",
              borderRadius: "8px",
              color: "#155724"
            }}>
              🎉 Unijeli ste 5 računa! Vaš kod za popust je: <strong>{sifra}</strong>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: "red" }}>Niste prijavljeni.</p>
      )}
    </div>
  );
}
