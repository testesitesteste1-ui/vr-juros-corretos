import Header from "@/components/Header";
import TipsCarousel from "@/components/TipsCarousel";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InterestCalculator from "@/components/InterestCalculator";
import Tips from "@/components/Tips";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <TipsCarousel />
        <Hero />
        <HowItWorks />
        <InterestCalculator />
        <Tips />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;