import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import FleetSection from "../components/FleetSection";
import ContactSection from "../components/ContactSection";

/**
 * Home — Hero → Services pillars → Fleet → Partnership Nexus.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <ContactSection />
    </>
  );
}
