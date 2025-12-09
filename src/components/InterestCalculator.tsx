import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calculator as CalcIcon, AlertTriangle, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface CalculationResult {
  taxaMensal: number;
  taxaAnual: number;
  totalJuros: number;
  totalPago: number;
  status: "verde" | "amarelo" | "vermelho";
}

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

// Newton-Raphson method to calculate internal rate of return (IRR)
const calcularTaxaMensal = (valorContratado: number, numParcelas: number, valorParcela: number): number => {
  // Initial guess
  let taxa = 0.03;
  const tolerancia = 0.0000001;
  const maxIteracoes = 100;

  for (let i = 0; i < maxIteracoes; i++) {
    // Present value of annuity formula: PV = PMT * ((1 - (1 + r)^-n) / r)
    // We want: valorContratado = valorParcela * ((1 - (1 + taxa)^-numParcelas) / taxa)
    const potencia = Math.pow(1 + taxa, -numParcelas);
    const pv = valorParcela * ((1 - potencia) / taxa);
    const diferenca = pv - valorContratado;

    if (Math.abs(diferenca) < tolerancia) {
      return taxa;
    }

    // Derivative of PV with respect to taxa
    const derivada = valorParcela * (
      (numParcelas * potencia * (1 + taxa)) / (taxa * (1 + taxa)) -
      (1 - potencia) / (taxa * taxa)
    );

    if (derivada === 0) break;

    taxa = taxa - diferenca / derivada;

    // Ensure taxa stays positive
    if (taxa <= 0) taxa = 0.001;
    if (taxa > 1) taxa = 0.5; // Cap at 50% monthly
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
    return amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, "");
    return parseFloat(numbers) / 100 || 0;
  };

  const handleValorContratadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValorContratado(formatted);
    if (errors.valorContratado) setErrors({ ...errors, valorContratado: "" });
  };

  const handleValorParcelaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValorParcela(formatted);
    if (errors.valorParcela) setErrors({ ...errors, valorParcela: "" });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const valor = parseCurrency(valorContratado);
    const parcelas = parseInt(numParcelas);
    const parcela = parseCurrency(valorParcela);

    if (!valorContratado || valor <= 0) {
      newErrors.valorContratado = "Informe um valor válido";
    }
    if (!numParcelas || parcelas <= 0) {
      newErrors.numParcelas = "Informe a quantidade de parcelas";
    }
    if (!valorParcela || parcela <= 0) {
      newErrors.valorParcela = "Informe o valor da parcela";
    }

    // Validate that total payments exceed principal (otherwise negative interest)
    if (valor > 0 && parcelas > 0 && parcela > 0) {
      if (parcela * parcelas <= valor) {
        newErrors.valorParcela = "Valor total das parcelas deve ser maior que o valor contratado";
      }
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

    const valor = parseCurrency(valorContratado);
    const parcelas = parseInt(numParcelas);
    const parcela = parseCurrency(valorParcela);

    const taxaMensal = calcularTaxaMensal(valor, parcelas, parcela) * 100;
    const taxaAnual = (Math.pow(1 + taxaMensal / 100, 12) - 1) * 100;
    const totalPago = parcela * parcelas;
    const totalJuros = totalPago - valor;

    // Determine status based on monthly rate
    let status: "verde" | "amarelo" | "vermelho";
    if (taxaMensal <= 3) {
      status = "verde";
    } else if (taxaMensal <= 6) {
      status = "amarelo";
    } else {
      status = "vermelho";
    }

    setResult({
      taxaMensal,
      taxaAnual,
      totalJuros,
      totalPago,
      status,
    });

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
    switch (status) {
      case "verde":
        return {
          icon: CheckCircle,
          label: "TAXA DENTRO DO ESPERADO",
          description: "Sua taxa está abaixo de 3% ao mês, o que é considerado razoável para a maioria dos empréstimos.",
          bgClass: "bg-success/10 border-success/30",
          textClass: "text-success",
        };
      case "amarelo":
        return {
          icon: AlertCircle,
          label: "ATENÇÃO COM SUA TAXA",
          description: "Sua taxa está entre 3% e 6% ao mês. Vale pesquisar outras opções no mercado.",
          bgClass: "bg-warning/10 border-warning/30",
          textClass: "text-warning",
        };
      case "vermelho":
        return {
          icon: AlertTriangle,
          label: "TAXA MUITO ALTA!",
          description: "Sua taxa está acima de 6% ao mês. Isso pode indicar juros muito elevados para o mercado atual.",
          bgClass: "bg-destructive/10 border-destructive/30",
          textClass: "text-destructive",
        };
    }
  };

  return (
    <section id="calculadora" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
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
            <span className="text-sm font-medium text-primary">100% Gratuito</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Descubra sua <span className="text-gold-gradient">Taxa de Juros</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Informe os dados do seu empréstimo e descubra qual é a taxa de juros que você está pagando
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
              <CardTitle className="text-2xl text-foreground">Calculadora de Taxa</CardTitle>
              <CardDescription>
                Preencha com os dados do seu contrato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="valorContratado" className="text-sm font-medium">
                    Valor que você pegou emprestado (R$)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      id="valorContratado"
                      type="text"
                      placeholder="Ex: 10.000,00"
                      value={valorContratado}
                      onChange={handleValorContratadoChange}
                      className={`pl-10 ${errors.valorContratado ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.valorContratado && (
                    <p className="text-xs text-destructive">{errors.valorContratado}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numParcelas" className="text-sm font-medium">
                      Quantas parcelas?
                    </Label>
                    <Input
                      id="numParcelas"
                      type="number"
                      placeholder="Ex: 24"
                      value={numParcelas}
                      onChange={(e) => {
                        setNumParcelas(e.target.value);
                        if (errors.numParcelas) setErrors({ ...errors, numParcelas: "" });
                      }}
                      className={errors.numParcelas ? "border-destructive" : ""}
                    />
                    {errors.numParcelas && (
                      <p className="text-xs text-destructive">{errors.numParcelas}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valorParcela" className="text-sm font-medium">
                      Valor de cada parcela
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        id="valorParcela"
                        type="text"
                        placeholder="Ex: 500,00"
                        value={valorParcela}
                        onChange={handleValorParcelaChange}
                        className={`pl-10 ${errors.valorParcela ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.valorParcela && (
                      <p className="text-xs text-destructive">{errors.valorParcela}</p>
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
                      Descobrir Taxa
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
                        {(() => {
                          const config = getStatusConfig(result.status);
                          const Icon = config.icon;
                          return (
                            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${config.bgClass}`}>
                              <Icon className={`w-5 h-5 ${config.textClass}`} />
                              <span className={`font-semibold ${config.textClass}`}>
                                {config.label}
                              </span>
                            </div>
                          );
                        })()}
                      </motion.div>

                      {/* Main Result - Monthly Rate */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`p-6 rounded-xl text-center border ${getStatusConfig(result.status).bgClass}`}
                      >
                        <p className="text-sm text-muted-foreground mb-2">
                          Sua Taxa de Juros Mensal
                        </p>
                        <p className={`text-5xl font-bold font-display ${getStatusConfig(result.status).textClass}`}>
                          <AnimatedNumber value={result.taxaMensal} suffix="%" />
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          ao mês
                        </p>
                      </motion.div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Taxa Anual
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedNumber value={result.taxaAnual} suffix="%" />
                          </p>
                          <p className="text-xs text-muted-foreground">ao ano</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="p-4 rounded-lg bg-muted/50"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            Total de Juros
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedNumber value={result.totalJuros} prefix="R$ " />
                          </p>
                        </motion.div>
                      </div>

                      {/* Explanation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-4 rounded-lg bg-accent/5 border border-accent/20"
                      >
                        <p className="text-sm text-muted-foreground">
                          {getStatusConfig(result.status).description}
                        </p>
                      </motion.div>

                      {/* Info tip */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs text-center text-muted-foreground"
                      >
                        💡 Dica: Compare sempre com outras instituições antes de contratar um empréstimo!
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

export default InterestCalculator;