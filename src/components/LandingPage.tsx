import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Menu, X, Calculator, ChevronLeft, ChevronRight, TrendingDown, Wallet,
  Eye, Lightbulb, AlertTriangle, CheckCircle, Loader2, AlertCircle,
  TrendingUp, Search, Shield, BookOpen, Users, Heart, Sparkles,
  Instagram, Mail, Crown, Check
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import happyCouple from "@/assets/happy-couple.jpg";

// ============================================
// HEADER
// ============================================
const navLinks = [
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#planos", label: "Planos" },
  { href: "#dicas", label: "Dicas" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-foreground">Verifica</span>
              <span className="font-display text-xl font-bold text-gold-gradient">Juros</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="hero" size="sm" onClick={() => scrollToSection("#calculadora")}>
              Calcular Agora
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-4 py-4 border-t border-border/50">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button variant="hero" size="default" onClick={() => scrollToSection("#calculadora")} className="mt-2">
              Calcular Agora
            </Button>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

// ============================================
// TIPS CAROUSEL
// ============================================
const carouselTips = [
  { emoji: "💡", text: "Você sabia? Juros acima de 8% ao mês podem ser abusivos!" },
  { emoji: "⚠️", text: "Cuidado com empréstimos consignados com taxas altas!" },
  { emoji: "✅", text: "Compare sempre a taxa antes de contratar!" },
  { emoji: "📊", text: "Aposentados têm direito a taxas mais baixas!" },
  { emoji: "🔍", text: "Descubra se você está pagando muito!" },
];

const TipsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselTips.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative h-[150px] md:h-[200px] flex items-center justify-center">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselTips.length) % carouselTips.length)}
            className="absolute left-2 md:left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Dica anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="text-center px-12 md:px-20 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-4xl md:text-5xl">{carouselTips[currentIndex].emoji}</span>
                <p className="font-display text-lg md:text-2xl lg:text-3xl font-semibold leading-tight">
                  {carouselTips[currentIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselTips.length)}
            className="absolute right-2 md:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Próxima dica"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ir para dica ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HERO
// ============================================
const Hero = () => {
  const scrollToCalculator = () => {
    document.querySelector("#calculadora")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <Wallet className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Educação Financeira para Você</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
            >
              Entenda seus <span className="text-gold-gradient">Juros</span>
              <br />
              Proteja seu Bolso
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Descubra de forma simples e gratuita qual a taxa de juros do seu empréstimo.
              Conhecimento é poder — saiba se você está pagando demais!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button variant="hero" size="xl" onClick={scrollToCalculator} className="w-full sm:w-auto">
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 md:gap-8 max-w-lg mx-auto lg:mx-0 mt-12"
            >
              {[
                { value: "+50 mil", label: "Cálculos realizados" },
                { value: "100%", label: "Gratuito" },
                { value: "Fácil", label: "De usar" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <img src={happyCouple} alt="Casal de aposentados sorrindo" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

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

// ============================================
// HOW IT WORKS
// ============================================
const steps = [
  { icon: Calculator, title: "Informe os Dados", description: "Digite quanto você pegou emprestado, o número de parcelas e quanto paga por mês. Simples assim!" },
  { icon: Eye, title: "Descubra sua Taxa", description: "Nossa calculadora mostra qual é a taxa de juros real do seu empréstimo ou financiamento." },
  { icon: Lightbulb, title: "Tome Decisões Melhores", description: "Com essa informação, você pode comparar com outras opções e fazer escolhas mais inteligentes." },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-primary/5">
      <div className="container px-4 md:px-6">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <Card variant="elevated" className="h-full group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                    {index + 1}
                  </div>
                  <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <step.icon className="relative w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// INTEREST CALCULATOR
// ============================================
interface CalculationResult {
  taxaMensal: number;
  taxaAnual: number;
  totalJuros: number;
  totalPago: number;
  status: "verde" | "amarelo" | "vermelho";
}

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      {suffix}
    </span>
  );
};

const calcularTaxaMensal = (valorContratado: number, numParcelas: number, valorParcela: number): number => {
  let taxa = 0.03;
  const tolerancia = 0.0000001;
  const maxIteracoes = 100;

  for (let i = 0; i < maxIteracoes; i++) {
    const potencia = Math.pow(1 + taxa, -numParcelas);
    const pv = valorParcela * ((1 - potencia) / taxa);
    const diferenca = pv - valorContratado;

    if (Math.abs(diferenca) < tolerancia) return taxa;

    const derivada = valorParcela * ((numParcelas * potencia * (1 + taxa)) / (taxa * (1 + taxa)) - (1 - potencia) / (taxa * taxa));
    if (derivada === 0) break;

    taxa = taxa - diferenca / derivada;
    if (taxa <= 0) taxa = 0.001;
    if (taxa > 1) taxa = 0.5;
  }
  return taxa;
};

const InterestCalculator = () => {
  const [valorContratado, setValorContratado] = useState("");
  const [numParcelas, setNumParcelas] = useState("");
  const [valorParcela, setValorParcela] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = parseFloat(numbers) / 100;
    if (isNaN(amount)) return "";
    return amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, "");
    return parseFloat(numbers) / 100 || 0;
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const valor = parseCurrency(valorContratado);
    const parcelas = parseInt(numParcelas);
    const parcela = parseCurrency(valorParcela);

    if (!valorContratado || valor <= 0) newErrors.valorContratado = "Informe um valor válido";
    if (!numParcelas || parcelas <= 0) newErrors.numParcelas = "Informe a quantidade de parcelas";
    if (!valorParcela || parcela <= 0) newErrors.valorParcela = "Informe o valor da parcela";
    if (valor > 0 && parcelas > 0 && parcela > 0 && parcela * parcelas <= valor) {
      newErrors.valorParcela = "Valor total deve ser maior que o contratado";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calcular = async () => {
    if (!validate()) return;
    setIsCalculating(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const valor = parseCurrency(valorContratado);
    const parcelas = parseInt(numParcelas);
    const parcela = parseCurrency(valorParcela);

    const taxaMensal = calcularTaxaMensal(valor, parcelas, parcela) * 100;
    const taxaAnual = (Math.pow(1 + taxaMensal / 100, 12) - 1) * 100;
    const totalPago = parcela * parcelas;
    const totalJuros = totalPago - valor;

    let status: "verde" | "amarelo" | "vermelho" = taxaMensal <= 3 ? "verde" : taxaMensal <= 6 ? "amarelo" : "vermelho";

    setResult({ taxaMensal, taxaAnual, totalJuros, totalPago, status });
    setIsCalculating(false);
  };

  const limpar = () => {
    setValorContratado("");
    setNumParcelas("");
    setValorParcela("");
    setResult(null);
    setErrors({});
  };

  const getStatusConfig = (status: "verde" | "amarelo" | "vermelho") => {
    const configs = {
      verde: { icon: CheckCircle, label: "TAXA DENTRO DO ESPERADO", description: "Sua taxa está abaixo de 3% ao mês.", bgClass: "bg-success/10 border-success/30", textClass: "text-success" },
      amarelo: { icon: AlertCircle, label: "ATENÇÃO COM SUA TAXA", description: "Sua taxa está entre 3% e 6% ao mês.", bgClass: "bg-warning/10 border-warning/30", textClass: "text-warning" },
      vermelho: { icon: AlertTriangle, label: "TAXA MUITO ALTA!", description: "Sua taxa está acima de 6% ao mês.", bgClass: "bg-destructive/10 border-destructive/30", textClass: "text-destructive" },
    };
    return configs[status];
  };

  return (
    <section id="calculadora" className="py-20 md:py-32 bg-accent/5 relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Calculator className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">100% Gratuito</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Descubra sua <span className="text-gold-gradient">Taxa de Juros</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Informe os dados do seu empréstimo e descubra qual é a taxa de juros que você está pagando
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card variant="premium" className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Calculadora de Taxa</CardTitle>
              <CardDescription>Preencha com os dados do seu contrato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="valorContratado">Valor que você pegou emprestado (R$)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input
                      id="valorContratado"
                      placeholder="Ex: 10.000,00"
                      value={valorContratado}
                      onChange={(e) => { setValorContratado(formatCurrency(e.target.value)); if (errors.valorContratado) setErrors({ ...errors, valorContratado: "" }); }}
                      className={`pl-10 ${errors.valorContratado ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.valorContratado && <p className="text-xs text-destructive">{errors.valorContratado}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numParcelas">Quantas parcelas?</Label>
                    <Input
                      id="numParcelas"
                      type="number"
                      placeholder="Ex: 24"
                      value={numParcelas}
                      onChange={(e) => { setNumParcelas(e.target.value); if (errors.numParcelas) setErrors({ ...errors, numParcelas: "" }); }}
                      className={errors.numParcelas ? "border-destructive" : ""}
                    />
                    {errors.numParcelas && <p className="text-xs text-destructive">{errors.numParcelas}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valorParcela">Valor de cada parcela</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                      <Input
                        id="valorParcela"
                        placeholder="Ex: 500,00"
                        value={valorParcela}
                        onChange={(e) => { setValorParcela(formatCurrency(e.target.value)); if (errors.valorParcela) setErrors({ ...errors, valorParcela: "" }); }}
                        className={`pl-10 ${errors.valorParcela ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.valorParcela && <p className="text-xs text-destructive">{errors.valorParcela}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="hero" size="lg" className="flex-1" onClick={calcular} disabled={isCalculating}>
                  {isCalculating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Calculando...</> : <><Calculator className="w-4 h-4 mr-2" />Descobrir Taxa</>}
                </Button>
                <Button variant="outline" size="lg" onClick={limpar} disabled={isCalculating}>Limpar</Button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="pt-6 border-t border-border space-y-6">
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center">
                        {(() => {
                          const config = getStatusConfig(result.status);
                          const Icon = config.icon;
                          return (
                            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${config.bgClass}`}>
                              <Icon className={`w-5 h-5 ${config.textClass}`} />
                              <span className={`font-semibold ${config.textClass}`}>{config.label}</span>
                            </div>
                          );
                        })()}
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`p-6 rounded-xl text-center border ${getStatusConfig(result.status).bgClass}`}>
                        <p className="text-sm text-muted-foreground mb-2">Sua Taxa de Juros Mensal</p>
                        <p className={`text-5xl font-bold font-display ${getStatusConfig(result.status).textClass}`}>
                          <AnimatedNumber value={result.taxaMensal} suffix="%" />
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">ao mês</p>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Taxa Anual</p>
                          <p className="text-2xl font-bold text-foreground"><AnimatedNumber value={result.taxaAnual} suffix="%" /></p>
                          <p className="text-xs text-muted-foreground">ao ano</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground mb-1">Total de Juros</p>
                          <p className="text-2xl font-bold text-foreground"><AnimatedNumber value={result.totalJuros} prefix="R$ " /></p>
                        </motion.div>
                      </div>

                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm text-muted-foreground text-center">
                        {getStatusConfig(result.status).description}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MEMBERSHIP PLANS
// ============================================
const plans = [
  {
    id: "monthly",
    name: "Mensal",
    price: "9,90",
    period: "/mês",
    description: "Acesso completo mês a mês",
    features: ["Calculadora ilimitada", "Dicas exclusivas por email", "Suporte prioritário", "Análises personalizadas"],
    popular: false,
  },
  {
    id: "yearly",
    name: "Anual",
    price: "99",
    period: "/ano",
    originalPrice: "118,80",
    description: "Economize 17% no plano anual",
    features: ["Tudo do plano mensal", "2 meses grátis", "Conteúdo exclusivo", "Consultoria mensal", "Acesso vitalício a atualizações"],
    popular: true,
  },
];

const MembershipPlans = () => {
  return (
    <section id="planos" className="py-20 md:py-32 bg-primary/10 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Seja um Membro</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Escolha seu <span className="text-gold-gradient">Plano</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Tenha acesso a recursos exclusivos e acompanhamento personalizado para suas finanças
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gold-gradient text-white text-xs font-bold px-4 py-1 rounded-full shadow-gold">
                    MAIS POPULAR
                  </span>
                </div>
              )}
              <Card variant={plan.popular ? "gold" : "elevated"} className={`h-full ${plan.popular ? "border-2 border-accent" : ""}`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="font-display text-5xl font-bold text-gold-gradient">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="line-through">R$ {plan.originalPrice}</span>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.popular ? "hero" : "outline"} size="lg" className="w-full">
                    Assinar Agora
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TIPS SECTION
// ============================================
const tipsData = [
  { icon: AlertTriangle, title: "Fique de Olho nos Juros Altos", description: "Taxas acima de 6% ao mês são consideradas muito altas. Compare sempre antes de fechar negócio!", color: "text-destructive", bgColor: "bg-destructive/10" },
  { icon: TrendingUp, title: "Compare com a SELIC", description: "A taxa SELIC é uma referência. Se seus juros estão muito acima dela, vale questionar.", color: "text-accent", bgColor: "bg-accent/10" },
  { icon: Wallet, title: "Aposentados e Pensionistas", description: "Você tem direito a taxas especiais no consignado. Certifique-se de estar pagando o justo!", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Search, title: "Pesquise Antes de Contratar", description: "Nunca aceite a primeira oferta. Pesquise em pelo menos 3 instituições diferentes.", color: "text-success", bgColor: "bg-success/10" },
  { icon: Lightbulb, title: "Leia o Contrato Completo", description: "Verifique todas as taxas: IOF, tarifas administrativas e seguros embutidos.", color: "text-warning", bgColor: "bg-warning/10" },
  { icon: Shield, title: "Guarde seus Comprovantes", description: "Mantenha todos os documentos do empréstimo. Eles são essenciais para qualquer contestação.", color: "text-accent", bgColor: "bg-accent/10" },
];

const Tips = () => {
  return (
    <section id="dicas" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsData.map((tip, index) => (
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
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// ABOUT
// ============================================
const features = [
  { icon: BookOpen, title: "Educação Financeira", description: "Informação clara e acessível para todos" },
  { icon: Users, title: "Para Todos", description: "Aposentados, pensionistas e qualquer pessoa" },
  { icon: Heart, title: "100% Gratuito", description: "Nossa calculadora é totalmente gratuita" },
  { icon: Sparkles, title: "Fácil de Usar", description: "Interface simples e intuitiva" },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-muted/50 relative overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Conhecimento é <span className="text-gold-gradient">Poder</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground">
              <p>Muitas pessoas pagam juros altíssimos sem saber. Empréstimos consignados, financiamentos e cartões de crédito podem ter taxas muito diferentes entre as instituições.</p>
              <p>O problema é que nem sempre é fácil descobrir quanto de juros você realmente está pagando. Os contratos são confusos e as informações nem sempre são claras.</p>
              <p className="text-foreground font-medium">Por isso criamos essa ferramenta gratuita: para que você possa descobrir sua taxa real de juros e tomar decisões mais inteligentes.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1 }}>
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">Verifica</span>
                <span className="font-display text-xl font-bold text-accent">Juros</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Ferramenta gratuita de educação financeira para ajudar você a entender os juros do seu empréstimo.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:contato@verificajuros.com.br" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {["#como-funciona", "#calculadora", "#planos", "#dicas"].map((href) => (
                <li key={href}>
                  <button onClick={() => scrollToSection(href)} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {href.replace("#", "").replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Contato</h3>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-accent mt-0.5" />
              <span className="text-sm text-primary-foreground/70">contato@verificajuros.com.br</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/60">© {currentYear} VerificaJuros. Todos os direitos reservados.</p>
            <p className="text-xs text-primary-foreground/60 text-center md:text-right max-w-md">
              Esta é uma ferramenta educativa. Os cálculos são aproximados e servem apenas para fins informativos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN LANDING PAGE COMPONENT
// ============================================
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <TipsCarousel />
        <Hero />
        <HowItWorks />
        <InterestCalculator />
        <MembershipPlans />
        <Tips />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
