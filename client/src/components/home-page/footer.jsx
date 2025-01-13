import { motion } from "framer-motion";

export default function Footer() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="text-center py-8 text-[#16404D]"
    >
      <p>&copy; {currentYear} BoxVerse. All rights reserved.</p>
    </motion.footer>
  );
}
