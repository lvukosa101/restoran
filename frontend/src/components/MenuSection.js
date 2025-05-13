import React from 'react';

function MenuSection() {
  const textStyle = {
    color: '#3b2f2f',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
  };

  return (
    <section
      id="menu"
      style={{
        width: '100vw',
        margin: 0,
        padding: 0,
        backgroundImage: 'url("/menu.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div
  style={{
    backgroundImage: 'url("/papir.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
    backdropFilter: 'brightness(1.1)', 
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '550px',
    width: '90%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    border: '1px solid #d2b48c',
  }}
>

      
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: '2.2rem',
            color: '#5b3924',
            textShadow: '1px 1px 0 #fff',
          }}
        >
          Restoran Delicije
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8' }}>
          <li style={textStyle}><strong>Domaća juha dana</strong> – 5,00 € (mrkva, celer, domaća tjestenina)</li>
          <li style={textStyle}><strong>Ramstek s roštilja</strong> – 16,50 € (govedina, začini, prilozi po izboru)</li>
          <li style={textStyle}><strong>File brancina</strong> – 18,00 € (brancin, maslinovo ulje, blitva, krumpir)</li>
          <li style={textStyle}><strong>Sezonska salata</strong> – 7,00 € (hrskava piletina, zelena salata, rajčica, krastavac, maslinovo ulje)</li>
          <li style={textStyle}><strong>Tjestenina Delicije</strong> – 11,00 € (penne, piletina, vrhnje, šampinjoni)</li>
          <li style={textStyle}><strong>Pileći file u umaku</strong> – 12,00 € (pileći file, umak od gljiva, riža)</li>
          <li style={textStyle}><strong>Rižoto s plodovima mora</strong> – 13,50 € (riža, kozice, lignje, školjke, bijelo vino)</li>
          <li style={textStyle}><strong>Pizza Margherita</strong> – 8,00 € (rajčica, mozzarella, bosiljak)</li>
          <li style={textStyle}><strong>Pizza Capricciosa</strong> – 9,50 € (šunka, gljive, rajčica, sir, masline)</li>
          <li style={textStyle}><strong>Torta od čokolade</strong> – 4,50 € (čokolada, jaja, maslac, brašno)</li>
          <li style={textStyle}><strong>Domaći sladoled</strong> – 3,50 € (mlijeko, vanilija, šećer – okusi variraju)</li>
          <li style={textStyle}><strong>Čaša crnog vina</strong> – 4,00 € (lokalna vinarija, suho crno vino)</li>
          <li style={textStyle}><strong>Bezalkoholni kokteli</strong> – 3,00 € (voćni sok, limeta, menta, soda)</li>
          <li style={textStyle}><strong>Sok od naranče</strong> – 3,50 € (100% prirodni sok od naranče)</li>
          <li style={textStyle}><strong>Sok od jabuke</strong> – 3,00 € (bistri ili mutni sok od domaćih jabuka)</li>
          <li style={textStyle}><strong>Gazirani sokovi</strong> – 2,80 € (Coca-Cola, Fanta, Sprite – po izboru)</li>
          <li style={textStyle}><strong>Mineralna voda</strong> – 2,00 € (gazirana ili negazirana, 0.33L)</li>
        </ul>
      </div>
    </section>
  );
}

export default MenuSection;
