import React from 'react';

function AboutSection() {
  return (
    <section id="about" style={{ padding: '4rem 1rem', backgroundColor: '#f0f0f0' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
        <h2
            style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: '2.5rem',
            color: '#5b3924',
            textAlign: 'left',
            textShadow: '1px 1px 0 #fff',
            marginBottom: '1rem',
            marginTop: 0,
         }}
            >
             O nama
        </h2>

          <p>
            Restoran Delicije mjesto je gdje tradicija susreće suvremenost. Naš tim vrhunskih kuhara koristi svježe,
            lokalne namirnice kako bi stvorio nezaboravne gastronomske doživljaje.
          </p>
          <p>
            Od samih početaka, cilj nam je bio pružiti gostima ne samo vrhunsku hranu, već i toplo, ugodno okruženje u
            kojem se osjećaju kao kod kuće. Naš interijer pažljivo je dizajniran kako bi spojio eleganciju s
            udobnošću.
          </p>
          <p>
            Svako jelo priča svoju priču – bilo da je inspirirano tradicijom ili modernim kulinarskim pristupom.
            Sezonska ponuda i domaći dobavljači čine naš meni autentičnim i svježim.
          </p>

          
          <img
            src="/restoran.jpg"
            alt="Interijer restorana"
            style={{
              width: '100%',
              marginTop: '1.5rem',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        
        <div style={{ flex: '1 1 400px', minWidth: '280px' }}>
          <img
            src="/ljudi.jpg"
            alt="Gosti restorana"
            style={{
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
