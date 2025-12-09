import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, TrendingUp, Wallet, Search, Shield } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const tips = [
  {
    icon: AlertTriangle,
    title: "Fique de Olho nos Juros Altos",
    description: "Taxas acima de 6% ao mês são consideradas muito altas. Compare sempre antes de fechar negócio!",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: TrendingUp,
    title: "Compare com a SELIC",
    description: "A taxa SELIC é uma referência. Se seus juros estão muito acima dela, vale questionar.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Wallet,
    title: "Aposentados e Pensionistas",
    description: "Você tem direito a taxas especiais no consignado. Certifique-se de estar pagando o justo!",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Search,
    title: "Pesquise Antes de Contratar",
    description: "Nunca aceite a primeira oferta. Pesquise em pelo menos 3 instituições diferentes.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Lightbulb,
    title: "Leia o Contrato Completo",
    description: "Verifique todas as taxas: IOF, tarifas administrativas e seguros embutidos.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Guarde seus Comprovantes",
    description: "Mantenha todos os documentos do empréstimo. Eles são essenciais para qualquer contestação.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const Tips = () => {
  return (
    <section id="dicas" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Educação Financeira</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Dicas para <span className="text-gold-gradient">Proteger seu Bolso</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Conhecimento é poder! Confira dicas importantes para não cair em armadilhas
          </p>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${tip.bgColor} flex items-center justify-center mb-4`}>
                    <tip.icon className={`w-6 h-6 ${tip.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;