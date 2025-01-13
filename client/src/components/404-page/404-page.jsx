/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const ErrorPage404 = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-[#DDA853] via-[#A6CDC6] to-[#FBF5DD]"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-9xl font-bold text-[#16404D] mb-4"
        >
          404
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl font-bold text-[#16404D] mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl text-[#16404D] mb-8 max-w-md"
        >
          Oops! The page you're looking for seems to have wandered off. Let's
          get you back on track.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#16404D] text-white px-8 py-3 rounded-full hover:bg-[#DDA853] transition duration-300 text-lg"
        >
          <Link to="/" className="flex">
            Back to Home
          </Link>
        </motion.button>
      </motion.section>
    </>
  );
};

export default ErrorPage404;
