import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const SplineHero = () => {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <img
        src={heroBg}
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="rounded-2xl bg-white/5 p-6 shadow-2xl flex items-center justify-center"
          initial={{ scale: 0.98, opacity: 0.95 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
    </div>
  );
};

export default SplineHero;
