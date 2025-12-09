import { motion } from "framer-motion";
import { ArrowDown, Shield, Calculator, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculadora");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-hero-pattern" />
      
      {/* Animated gold orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6 pt-20 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-gold/20 mb-8"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Advocacia Especializada em Direito Bancário
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Defenda-se dos{" "}
            <span className="text-gold-gradient">Juros Abusivos</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Advocacia especializada em revisão de contratos bancários. 
            Calcule seus juros gratuitamente e descubra quanto você pode estar pagando a mais.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToCalculator}
              className="w-full sm:w-auto"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcule seus juros agora
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto"
            >
              Saiba mais
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 md:gap-8 max-w-xl mx-auto"
          >
            <div className="text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-gold-gradient">
                +500
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                Clientes atendidos
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-gold-gradient">
                R$ 2M+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                Recuperados
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-gold-gradient">
                98%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                Taxa de sucesso
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
