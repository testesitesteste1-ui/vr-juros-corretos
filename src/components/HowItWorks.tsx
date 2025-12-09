import { motion } from "framer-motion";
import { Calculator, Eye, Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const steps = [
  {
    icon: Calculator,
    title: "Informe os Dados",
    description:
      "Digite quanto você pegou emprestado, o número de parcelas e quanto paga por mês. Simples assim!",
  },
  {
    icon: Eye,
    title: "Descubra sua Taxa",
    description:
      "Nossa calculadora mostra qual é a taxa de juros real do seu empréstimo ou financiamento.",
  },
  {
    icon: Lightbulb,
    title: "Tome Decisões Melhores",
    description:
      "Com essa informação, você pode comparar com outras opções e fazer escolhas mais inteligentes.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-card">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Como <span className="text-gold-gradient">Funciona</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Três passos simples para você entender os juros do seu empréstimo
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={itemVariants}>
              <Card
                variant="elevated"
                className="h-full group cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <step.icon className="relative w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;