import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calculator as CalcIcon, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface CalculationResult {
  totalJuros: number;
  totalPagar: number;
  taxaAnual: number;
  selicComparativo: number;
  isAbusivo: boolean;
  percentualAcimaSelic: number;
}

const SELIC_ATUAL = 12.25; // Taxa SELIC atual em % ao ano

// Animated number component
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
      {displayValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
      {suffix}
    </span>
  );
};

const InterestCalculator = () => {
  const [valorEmprestimo, setValorEmprestimo] = useState("");
  const [prazoMeses, setPrazoMeses] = useState("");
  const [taxaMensal, setTaxaMensal] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = parseFloat(numbers) / 100;
    if (isNaN(amount)) return "";
    return amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, "");
    return parseFloat(numbers) / 100 || 0;
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValorEmprestimo(formatted);
    if (errors.valor) setErrors({ ...errors, valor: "" });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!valorEmprestimo || parseCurrency(valorEmprestimo) <= 0) {
      newErrors.valor = "Informe um valor válido";
    }
    if (!prazoMeses || parseInt(prazoMeses) <= 0) {
      newErrors.prazo = "Informe um prazo válido";
    }
    if (!taxaMensal || parseFloat(taxaMensal.replace(",", ".")) <= 0) {
      newErrors.taxa = "Informe uma taxa válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calcular = async () => {
    if (!validate()) return;

    setIsCalculating(true);
    setResult(null);

    // Simulate calculation delay for animation
    await new Promise((resolve) => setTimeout(resolve, 800));

    const valor = parseCurrency(valorEmprestimo);
    const prazo = parseInt(prazoMeses);
    const taxa = parseFloat(taxaMensal.replace(",", ".")) / 100;

    // Cálculo de juros compostos
    const montante = valor * Math.pow(1 + taxa, prazo);
    const totalJuros = montante - valor;
    const taxaAnual = (Math.pow(1 + taxa, 12) - 1) * 100;

    // Comparação com SELIC
    const selicMensal = Math.pow(1 + SELIC_ATUAL / 100, 1 / 12) - 1;
    const montanteSelic = valor * Math.pow(1 + selicMensal, prazo);
    const selicComparativo = montanteSelic - valor;

    // Considera abusivo se a taxa anual for maior que 3x a SELIC
    const isAbusivo = taxaAnual > SELIC_ATUAL * 3;
    const percentualAcimaSelic = ((taxaAnual - SELIC_ATUAL) / SELIC_ATUAL) * 100;

    setResult({
      totalJuros,
      totalPagar: montante,
      taxaAnual,
      selicComparativo,
      isAbusivo,
      percentualAcimaSelic,
    });

    setIsCalculating(false);
  };

  const limpar = () => {
    setValorEmprestimo("");
    setPrazoMeses("");
    setTaxaMensal("");
    setResult(null);
    setErrors({});
  };

  return (
    <section id="calculadora" className="py-20 md:py-32 bg-navy-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <CalcIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Gratuito e sem compromisso</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Calculadora de <span className="text-gold-gradient">Juros</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra em segundos se você está pagando juros abusivos no seu empréstimo ou financiamento
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card variant="premium" className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Simule seus Juros</CardTitle>
              <CardDescription>
                Preencha os dados do seu contrato para calcular
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="valor" className="text-sm font-medium">
                    Valor do Empréstimo (R$)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      id="valor"
                      type="text"
                      placeholder="0,00"
                      value={valorEmprestimo}
                      onChange={handleValorChange}
                      className={`pl-10 ${errors.valor ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.valor && (
                    <p className="text-xs text-destructive">{errors.valor}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prazo" className="text-sm font-medium">
                      Prazo (meses)
                    </Label>
                    <Input
                      id="prazo"
                      type="number"
                      placeholder="12"
                      value={prazoMeses}
                      onChange={(e) => {
                        setPrazoMeses(e.target.value);
                        if (errors.prazo) setErrors({ ...errors, prazo: "" });
                      }}
                      className={errors.prazo ? "border-destructive" : ""}
                    />
                    {errors.prazo && (
                      <p className="text-xs text-destructive">{errors.prazo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxa" className="text-sm font-medium">
                      Taxa de Juros (% a.m.)
                    </Label>
                    <div className="relative">
                      <Input
                        id="taxa"
                        type="text"
                        placeholder="2,5"
                        value={taxaMensal}
                        onChange={(e) => {
                          setTaxaMensal(e.target.value);
                          if (errors.taxa) setErrors({ ...errors, taxa: "" });
                        }}
                        className={`pr-10 ${errors.taxa ? "border-destructive" : ""}`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        %
                      </span>
                    </div>
                    {errors.taxa && (
                      <p className="text-xs text-destructive">{errors.taxa}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={calcular}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <CalcIcon className="w-4 h-4 mr-2" />
                      Calcular
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={limpar}
                  disabled={isCalculating}
                >
                  Limpar
                </Button>
              </div>

              {/* Results */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-border space-y-6">
                      {/* Status Badge */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        {result.isAbusivo ? (
                          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-destructive/10 border border-destructive/30">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                            <span className="font-semibold text-destructive">
                              JUROS POTENCIALMENTE ABUSIVOS
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 border border-success/30">
                            <CheckCircle className="w-5 h-5 text-success" />
                            <span className="font-semibold text-success">
                              TAXA DENTRO DO ACEITÁVEL
                            </span>
                          </div>
                        )}
                      </motion.div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Total de Juros
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedNumber value={result.totalJuros} prefix="R$ " />
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Total a Pagar
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedNumber value={result.totalPagar} prefix="R$ " />
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Taxa Anual (a.a.)
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedNumber value={result.taxaAnual} suffix="%" />
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Acima da SELIC ({SELIC_ATUAL}%)
                          </p>
                          <p className={`text-2xl font-bold ${result.isAbusivo ? "text-destructive" : "text-foreground"}`}>
                            <AnimatedNumber value={result.percentualAcimaSelic} suffix="%" />
                          </p>
                        </motion.div>
                      </div>

                      {/* Comparison */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <p className="text-sm text-muted-foreground mb-2">
                          Comparativo: Se fosse pela SELIC, você pagaria apenas
                        </p>
                        <p className="text-xl font-bold text-primary">
                          R$ {result.selicComparativo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} em juros
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Diferença de{" "}
                          <span className="font-semibold text-foreground">
                            R$ {(result.totalJuros - result.selicComparativo).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </p>
                      </motion.div>

                      {/* CTA */}
                      {result.isAbusivo && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <Button
                            variant="hero"
                            size="lg"
                            className="w-full"
                            onClick={() => document.querySelector("#consultoria")?.scrollIntoView({ behavior: "smooth" })}
                          >
                            Quero uma Análise Profissional
                          </Button>
                        </motion.div>
                      )}
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

export default InterestCalculator;
