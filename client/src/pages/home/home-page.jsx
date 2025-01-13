import { motion } from "framer-motion";

import Hero from "../../components/home-page/hero";
import Features from "../../components/home-page/feature";
import Footer from "../../components/home-page/footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDA853] via-[#A6CDC6] to-[#FBF5DD]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        {/* <Header /> */}
        <Hero />
        <Features />
        <Footer />
      </motion.div>
    </div>
  );
};

export default HomePage;
