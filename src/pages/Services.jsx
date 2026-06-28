import ServicesSection from "../components/ServicesSection";
import ServicesDetail from "../components/ServicesDetail";

/**
 * Services route — the three-pillar overview followed by detailed
 * capability sections for each division.
 */
export default function Services() {
  return (
    <>
      <ServicesSection />
      <ServicesDetail />
    </>
  );
}
