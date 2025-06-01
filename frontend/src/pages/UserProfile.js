import React, { useState, useEffect, useCallback } from "react";
import axios from "../api/axios"; 
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import HeaderModerator from "../components/HeaderModerator";
import "../styles/UserProfile.css";

export default function UserProfile() {
  const [racuni, setRacuni] = useState(["", "", "", "", ""]);
  const [popustGeneriran, setPopustGeneriran] = useState(false);
  const [sifra, setSifra] = useState("");
  const [spremljeniRacuni, setSpremljeniRacuni] = useState([]);
  const [povijestPopusta, setPovijestPopusta] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [formData, setFormData] = useState({
    ime: user.ime || "",
    prezime: user.prezime || "",
    email: user.email || "",
    broj_tel: user.broj_tel || "",
    lozinka: "",
    staraLozinka: ""
  });

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

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/users/update", {
        ...formData,
        korisnik_id: user.korisnik_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (formData.lozinka && formData.staraLozinka) {
        try {
          await axios.put("http://localhost:5000/api/users/update-password", {
            korisnik_id: user.korisnik_id,
            staraLozinka: formData.staraLozinka,
            novaLozinka: formData.lozinka
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setSuccessMsg("✅ Podaci i lozinka su uspješno ažurirani!");
        } catch (err) {
          console.error("Greška pri ažuriranju lozinke:", err);
          alert("Stara lozinka nije točna ili je došlo do greške.");
          return;
        }
      } else {
        setSuccessMsg("✅ Podaci su uspješno ažurirani!");
      }

      const updatedUser = { ...user, ...formData };
      delete updatedUser.lozinka;
      delete updatedUser.staraLozinka;
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setModalOpen(false);
      setFormData((prev) => ({
        ...prev,
        lozinka: "",
        staraLozinka: ""
      }));

    } catch (err) {
      console.error("Greška prilikom ažuriranja podataka:", err);
      alert("Došlo je do pogreške pri spremanju.");
    }
  };

  return (
    <>
      {user?.role === 'moderator' ? (
        <HeaderModerator />
      ) : (
        <HeaderLoggedIn />
      )}
      <div className="user-profile-container">
        <h2>Osobni profil</h2>

        {successMsg && (
          <div className="success-message">
            {successMsg}
          </div>
        )}

        {user?.email ? (
          <div className="profile-layout">
            <div className="left-column">
              <div className="profile-card">
                <p><strong>Ime:</strong> {user.ime}</p>
                <p><strong>Prezime:</strong> {user.prezime}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Broj telefona:</strong> {user.broj_tel || "Nije unesen"}</p>

                <button className="profile-button" onClick={() => setModalOpen(true)}>
                  Promijeni podatke
                </button>
              </div>
            </div>

            <div className="right-column">
              {!popustGeneriran && (
                <>
                  <h4>Upiši brojeve računa:</h4>
                  {racuni.map((r, i) => (
                    <input
                      key={i}
                      type="text"
                      value={r}
                      onChange={(e) => handleInput(i, e.target.value)}
                      placeholder={`Račun ${i + 1}`}
                      className="input-field"
                    />
                  ))}

                  <button className="profile-button" onClick={handleSpremi}>
                    Spremi račune
                  </button>

                  <button className="profile-button secondary" onClick={() => setRacuni(["", "", "", "", ""])}>
                    Očisti račune
                  </button>
                </>
              )}

              {popustGeneriran && (
                <div className="success-box">
                  🎉 Imate aktivan popust!<br />
                  Vaši računi: {spremljeniRacuni.join(", ")}<br />
                  Vaš kod za popust je: <strong>{sifra}</strong><br />
                  <button
                    className="profile-button"
                    style={{ backgroundColor: "#dc3545", marginTop: "15px" }}
                    onClick={handleIskoristiPopust}
                  >
                    Iskoristi popust
                  </button>
                </div>
              )}

              {povijestPopusta.length > 0 && (
                <div className="warning-box">
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
          </div>
        ) : (
          <p style={{ color: "red" }}>Niste prijavljeni.</p>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Uredi podatke</h3>
            <label>Ime</label>
            <input value={formData.ime} onChange={e => setFormData({ ...formData, ime: e.target.value })} />
            <label>Prezime</label>
            <input value={formData.prezime} onChange={e => setFormData({ ...formData, prezime: e.target.value })} />
            <label>Email</label>
            <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <label>Broj telefona</label>
            <input value={formData.broj_tel} onChange={e => setFormData({ ...formData, broj_tel: e.target.value })} />
            <label>Stara lozinka</label>
            <input type="password" value={formData.staraLozinka} onChange={e => setFormData({ ...formData, staraLozinka: e.target.value })} />
            <label>Nova lozinka</label>
            <input type="password" value={formData.lozinka} onChange={e => setFormData({ ...formData, lozinka: e.target.value })} />
            <button className="profile-button" onClick={handleUpdate}>Spremi</button>
            <button className="profile-button secondary" onClick={() => setModalOpen(false)}>Odustani</button>
          </div>
        </div>
      )}
    </>
  );
}
