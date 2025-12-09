import { motion } from "framer-motion";
import { Calculator, TrendingDown, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import happyCouple from "@/assets/happy-couple.jpg";

const Hero = () => {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculadora");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-hero-gradient">
      {/* Background decorative elements */}
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
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
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

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <Wallet className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Educação Financeira para Você
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
            >
              Entenda seus{" "}
              <span className="text-gold-gradient">Juros</span>
              <br />
              Proteja seu Bolso
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Descubra de forma simples e gratuita qual a taxa de juros do seu empréstimo. 
              Conhecimento é poder — saiba se você está pagando demais!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToCalculator}
                className="w-full sm:w-auto"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Descobrir Minha Taxa
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => document.querySelector("#como-funciona")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto border-accent/30 text-accent hover:bg-accent/5"
              >
                Como Funciona
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 md:gap-8 max-w-lg mx-auto lg:mx-0 mt-12"
            >
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                  +50 mil
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  Cálculos realizados
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                  100%
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  Gratuito
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                  Fácil
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  De usar
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src={happyCouple}
                alt="Casal de aposentados sorrindo e felizes"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-card border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Economize</p>
                  <p className="text-xs text-muted-foreground">Conhecendo sua taxa</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;