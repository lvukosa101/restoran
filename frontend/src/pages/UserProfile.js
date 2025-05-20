import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HeaderLoggedIn from "../components/HeaderLoggedIn";

export default function UserProfile() {
  const [racuni, setRacuni] = useState(["", "", "", "", ""]);
  const [popustGeneriran, setPopustGeneriran] = useState(false);
  const [sifra, setSifra] = useState("");
  const [spremljeniRacuni, setSpremljeniRacuni] = useState([]);
  const [povijestPopusta, setPovijestPopusta] = useState([]);

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  const fetchPovijest = useCallback(async () => {
    if (!user.email) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/discount/povijest/${user.email}`);
      setPovijestPopusta(res.data);
    } catch (err) {
      console.error("Povijest popusta nije dohvaćena:", err);
    }
  }, [user.email]);

  useEffect(() => {
    if (!user.email) return;

    const fetchPopust = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/discount/${user.email}`);
        if (res.data) {
          setSifra(res.data.kod);
          const racuniArray = Array.isArray(res.data.racuni)
            ? res.data.racuni
            : typeof res.data.racuni === "string"
            ? JSON.parse(res.data.racuni)
            : [];

          setSpremljeniRacuni(racuniArray);
          setPopustGeneriran(true);
        }
      } catch {
        // nema aktivnog popusta
      }
    };

    fetchPopust();
    fetchPovijest();
  }, [user.email, fetchPovijest]);

  const handleInput = (index, value) => {
    const novi = [...racuni];
    novi[index] = value.trim();
    setRacuni(novi);
  };

  const handleSpremi = async () => {
    const popunjeni = racuni.filter(r => r.trim() !== "");

    if (popunjeni.length < 5) {
      alert("⚠️ Morate unijeti svih 5 računa.");
      return;
    }

    const duplikati = popunjeni.filter((item, index) => popunjeni.indexOf(item) !== index);
    if (duplikati.length > 0) {
      alert("⚠️ Neki brojevi računa su duplikati.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/racuni/vise", {
        korisnik_email: user.email,
        racuni: popunjeni
      });

      if (res.status === 201 && res.data.spremljeno === 5) {
        const kod = "POPUST-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        try {
          await axios.post("http://localhost:5000/api/discount", {
            korisnik_email: user.email,
            kod,
            racuni: popunjeni
          });

          setSifra(kod);
          setPopustGeneriran(true);
          setSpremljeniRacuni(popunjeni);
        } catch (err) {
          console.error("Greška pri spremanju popusta:", err);
          alert("Računi su spremljeni, ali popust nije.");
        }
      }
    } catch (err) {
      if (err.response?.status === 409) {
        const duplicirani = err.response.data.duplicirani || [];
        alert(`Ovi računi već postoje: ${duplicirani.join(", ")}`);
      } else {
        console.error("Greška pri slanju računa:", err);
        alert("Greška pri slanju računa.");
      }
    }
  };

  const handleIskoristiPopust = async () => {
    try {
      await axios.put(`http://localhost:5000/api/discount/iskoristi/${user.email}`);
      setPopustGeneriran(false);
      setSifra("");
      setSpremljeniRacuni([]);
      setRacuni(["", "", "", "", ""]);
      await fetchPovijest();
    } catch {
      alert("Greška pri označavanju popusta.");
    }
  };

  return (
    <>
      <HeaderLoggedIn />
      <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", fontFamily: "Segoe UI" }}>
        <h2>Osobni profil</h2>

        {user?.email ? (
          <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
            <p><strong>Ime:</strong> {user.ime}</p>
            <p><strong>Prezime:</strong> {user.prezime}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Uloga:</strong> {user.role}</p>

            {!popustGeneriran && (
              <>
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

                <button
                  onClick={() => setRacuni(["", "", "", "", ""])}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#aaa",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Očisti račune
                </button>
              </>
            )}

            {popustGeneriran && (
              <div style={{
                marginTop: "20px",
                backgroundColor: "#d4edda",
                padding: "15px",
                borderRadius: "8px",
                color: "#155724"
              }}>
                🎉 Imate aktivan popust!<br />
                Vaši računi: {spremljeniRacuni.join(", ")}<br />
                Vaš kod za popust je: <strong>{sifra}</strong><br />
                <button
                  onClick={handleIskoristiPopust}
                  style={{
                    marginTop: "15px",
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Iskoristi popust
                </button>
              </div>
            )}

            {povijestPopusta.length > 0 && (
              <div style={{
                marginTop: "30px",
                backgroundColor: "#fff3cd",
                padding: "15px",
                borderRadius: "8px",
                color: "#856404"
              }}>
                <h4>Povijest iskorištenih popusta</h4>
                <ul>
                  {povijestPopusta.map((popust, index) => (
                    <li key={index}>
                      Kod: <strong>{popust.kod}</strong> | Računi: {Array.isArray(popust.racuni)
                        ? popust.racuni.join(", ")
                        : popust.racuni}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p style={{ color: "red" }}>Niste prijavljeni.</p>
        )}
      </div>
    </>
  );
}
