import { motion } from "framer-motion";

const features = [
  {
    title: "Easy to Use",
    description: "Intuitive interface for seamless blogging",
  },
  {
    title: "Customizable",
    description: "Personalize your blog to match your style",
  },
  {
    title: "SEO Optimized",
    description: "Boost your visibility with built-in SEO tools",
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center text-[#16404D] mb-12">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-[#16404D] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#16404D]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
