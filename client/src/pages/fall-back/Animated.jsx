import { motion } from "framer-motion";

const AnimatedSVG = () => {
  return (
    <div className="h-screen w-screen  overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        {/* Background with gradient */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#DDA853" }} />
            <stop offset="50%" style={{ stopColor: "#A6CDC6" }} />
            <stop offset="100%" style={{ stopColor: "#FBF5DD" }} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#bg-gradient)" />

        {/* Main Box Structure */}
        <g transform="translate(150, 100)">
          {/* Front face */}
          <motion.path
            d="M 0,0 l 100,0 l 0,100 l -100,0 Z"
            fill="#16404D"
            opacity="0.9"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          />

          {/* Top face */}
          <motion.path
            d="M 0,0 l 100,-50 l 100,0 l -100,50 Z"
            fill="#16404D"
            opacity="0.7"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          />

          {/* Side face */}
          <motion.path
            d="M 100,0 l 100,-50 l 0,100 l -100,50 Z"
            fill="#16404D"
            opacity="0.8"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          />

          {/* Inner Box Details */}
          <motion.path
            d="M 20,20 l 60,0 l 0,60 l -60,0 Z"
            fill="#DDA853"
            opacity="0.9"
          />

          {/* Decorative Elements */}
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            fill="#A6CDC6"
            opacity="0.8"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Abstract Lines */}
          <line
            x1="0"
            y1="0"
            x2="20"
            y2="20"
            stroke="#FBF5DD"
            strokeWidth="2"
          />
          <line
            x1="100"
            y1="0"
            x2="80"
            y2="20"
            stroke="#FBF5DD"
            strokeWidth="2"
          />
        </g>

        {/* Text Elements */}
        <text
          x="200"
          y="240"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="#16404D"
        >
          BoxVerse
        </text>

        {/* Loading Indicator Dots */}
        <g transform="translate(180, 260)">
          {[0, 20, 40].map((cx, index) => (
            <motion.circle
              key={index}
              cx={cx}
              cy={0}
              r={4}
              fill="#16404D"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedSVG;
