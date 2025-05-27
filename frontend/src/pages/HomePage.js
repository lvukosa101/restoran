import '../styles/HomePage.css';

import Header from '../components/Header';
import HeaderLoggedIn from '../components/HeaderLoggedIn';
import HeaderModerator from "../components/HeaderModerator";
import Footer from '../components/Footer';
import HomeSection from '../components/HomeSection';
import ImageSlideshow from '../components/ImageSlideshow';
import AboutSection from '../components/AboutSection';
import MenuSection from '../components/MenuSection';
import ContactSection from '../components/ContactSection';

function HomePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      {!user ? (
        <Header />
      ) : user.role === 'moderator' ? (
        <HeaderModerator />
      ) : (
        <HeaderLoggedIn />
      )}
      <main className="home-container">
        <HomeSection />

        <section className="slideshow-wrapper">
          <ImageSlideshow />
        </section>

        <AboutSection />
        <MenuSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
