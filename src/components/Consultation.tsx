import { motion } from "framer-motion";
import { Check, Zap, Clock, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

const benefits = [
  { icon: FileText, text: "Análise detalhada do seu contrato" },
  { icon: Clock, text: "Resposta em até 24 horas úteis" },
  { icon: Shield, text: "Orientação jurídica personalizada" },
  { icon: Zap, text: "Identificação de cláusulas abusivas" },
];

const Consultation = () => {
  const handleConsulta = () => {
    // Scroll to contact or open WhatsApp
    const whatsappNumber = "5511999999999"; // Replace with real number
    const message = encodeURIComponent(
      "Olá! Gostaria de solicitar uma consultoria jurídica para análise do meu contrato bancário."
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="consultoria" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Precisa de Ajuda{" "}
            <span className="text-gold-gradient">Especializada?</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Nossa equipe de advogados especializados pode analisar seu caso e
            orientá-lo sobre os melhores caminhos para defender seus direitos.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <Card variant="gold" className="overflow-hidden relative">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
              MAIS POPULAR
            </div>

            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className="text-2xl">Consultoria Jurídica Personalizada</CardTitle>
              <CardDescription className="text-base mt-2">
                Análise completa do seu contrato por advogado especialista
              </CardDescription>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-muted-foreground text-lg">R$</span>
                  <span className="font-display text-5xl font-bold text-foreground">
                    19
                  </span>
                  <span className="font-display text-3xl font-bold text-foreground">
                    ,90
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Pagamento único • Sem mensalidades
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Benefits */}
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleConsulta}
              >
                Solicitar Consultoria
              </Button>

              {/* Guarantee */}
              <p className="text-xs text-center text-muted-foreground">
                <Shield className="w-3 h-3 inline-block mr-1" />
                Pagamento seguro • Satisfação garantida ou devolvemos seu dinheiro
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {["OAB Registrado", "Sigilo Absoluto", "Atendimento Humanizado"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="w-4 h-4 text-primary" />
                <span>{item}</span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Consultation;
