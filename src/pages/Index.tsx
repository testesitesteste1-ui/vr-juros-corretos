import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InterestCalculator from "@/components/InterestCalculator";
import Consultation from "@/components/Consultation";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <InterestCalculator />
        <Consultation />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
