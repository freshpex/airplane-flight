import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BookingForm from '@/components/BookingForm';
import ServicesSection from '@/components/ServicesSection';
import DestinationsSection from '@/components/DestinationsSection';
import Footer from '@/components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div id="book">
          <BookingForm />
        </div>
        <div id="experience">
          <ServicesSection />
        </div>
        <div id="destinations">
          <DestinationsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
