import { motion } from "framer-motion";
import { Scale } from "lucide-react";

const Logo = () => {
  return (
    <motion.a
      href="#"
      className="flex items-center gap-3 group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background circle with gold gradient */}
        <div className="absolute inset-0 rounded-lg bg-gold-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
        
        {/* VR Letters */}
        <span className="relative font-display font-bold text-xl text-gold-gradient tracking-tighter">
          VR
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg text-foreground leading-tight">
          VR <span className="text-gold-gradient">Juros</span>
        </span>
        <span className="text-xs text-muted-foreground font-body tracking-wide">
          Advocacia Bancária
        </span>
      </div>
    </motion.a>
  );
};

export default Logo;
