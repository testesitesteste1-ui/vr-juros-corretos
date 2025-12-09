import { motion } from "framer-motion";
import { Scale, BookOpen, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Scale,
    title: "Direito Bancário",
    description: "Especialização em contratos e operações bancárias",
  },
  {
    icon: BookOpen,
    title: "Código de Defesa",
    description: "Aplicação integral do CDC em favor do consumidor",
  },
  {
    icon: Users,
    title: "Atendimento Humano",
    description: "Acompanhamento personalizado do seu caso",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    description: "Anos de atuação em revisão de contratos",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-navy-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Seus <span className="text-gold-gradient">Direitos</span> em Primeiro Lugar
            </h2>
            <div className="space-y-4 font-body text-muted-foreground">
              <p>
                O Código de Defesa do Consumidor (CDC) protege você contra cobranças
                abusivas e práticas ilegais de instituições financeiras. Muitos
                brasileiros pagam juros muito acima do permitido sem saber.
              </p>
              <p>
                Nossa missão é democratizar o acesso à justiça, oferecendo ferramentas
                gratuitas para identificar abusos e consultoria acessível para quem
                precisa de orientação profissional.
              </p>
              <p className="text-foreground font-medium">
                Não deixe seus direitos passarem despercebidos. Juntos, podemos
                revisar seu contrato e buscar a reparação que você merece.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
