import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tips = [
  {
    emoji: "💡",
    text: "Você sabia? Juros acima de 8% ao mês podem ser abusivos!",
  },
  {
    emoji: "⚠️",
    text: "Cuidado com empréstimos consignados com taxas altas!",
  },
  {
    emoji: "✅",
    text: "Compare sempre a taxa antes de contratar!",
  },
  {
    emoji: "📊",
    text: "Aposentados têm direito a taxas mais baixas!",
  },
  {
    emoji: "🔍",
    text: "Descubra se você está pagando muito!",
  },
];

const TipsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="bg-carousel-gradient text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative h-[150px] md:h-[200px] flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Dica anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Content */}
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
                <span className="text-4xl md:text-5xl">{tips[currentIndex].emoji}</span>
                <p className="font-display text-lg md:text-2xl lg:text-3xl font-semibold leading-tight">
                  {tips[currentIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Próxima dica"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
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

export default TipsCarousel;