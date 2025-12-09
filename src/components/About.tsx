import { motion } from "framer-motion";
import { BookOpen, Users, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Educação Financeira",
    description: "Informação clara e acessível para todos entenderem seus direitos",
  },
  {
    icon: Users,
    title: "Para Todos",
    description: "Aposentados, pensionistas e qualquer pessoa com empréstimo",
  },
  {
    icon: Heart,
    title: "100% Gratuito",
    description: "Nossa calculadora é totalmente gratuita, sem pegadinhas",
  },
  {
    icon: Sparkles,
    title: "Fácil de Usar",
    description: "Interface simples e intuitiva para qualquer pessoa",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Conhecimento é <span className="text-gold-gradient">Poder</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground">
              <p>
                Muitas pessoas pagam juros altíssimos sem saber. Empréstimos consignados, 
                financiamentos e cartões de crédito podem ter taxas muito diferentes 
                entre as instituições.
              </p>
              <p>
                O problema é que nem sempre é fácil descobrir quanto de juros você 
                realmente está pagando. Os contratos são confusos e as informações 
                nem sempre são claras.
              </p>
              <p className="text-foreground font-medium">
                Por isso criamos essa ferramenta gratuita: para que você possa descobrir 
                sua taxa real de juros e tomar decisões mais inteligentes sobre seu dinheiro.
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
                <Card variant="elevated" className="h-full">
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