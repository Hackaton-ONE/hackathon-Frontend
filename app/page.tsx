import { Navbar } from "@/components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { TechStack } from "@/components/TechStack";
import { WhyChoose } from "../components/WhyChoose";
import { ThreePillars } from "../components/ThreePillars";
import { IntelligenceFlow } from "../components/IntelligenceFlow";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-mood-dark text-white selection:bg-neon-green selection:text-mood-dark overflow-x-hidden">

      <Navbar />
      <HeroSection />
      <TechStack />
      <WhyChoose />
      <ThreePillars />
      <IntelligenceFlow />
      <Footer />
      
    </main>
  );
}