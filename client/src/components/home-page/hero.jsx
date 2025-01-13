import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-center py-20"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-5xl font-bold text-[#16404D] mb-4"
      >
        Welcome to BoxVerse
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl text-[#16404D] mb-8"
      >
        Your go-to platform for insightful articles and engaging content
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#16404D] text-white px-6 py-2 rounded-full hover:bg-[#DDA853] transition duration-300"
      >
        <Link to="/login" className="flex items-center justify-center gap-1">
          Login
          <ArrowRight size={16} />
        </Link>
      </motion.button>
    </motion.section>
  );
}
