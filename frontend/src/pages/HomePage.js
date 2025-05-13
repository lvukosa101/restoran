import '../styles/HomePage.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/HomeSection';
import ImageSlideshow from '../components/ImageSlideshow';
import AboutSection from '../components/AboutSection';
import MenuSection from '../components/MenuSection';
import ContactSection from '../components/ContactSection';

function HomePage() {
  return (
    <>
      <Header />
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
