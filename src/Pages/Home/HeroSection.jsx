import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Sprout,
  Flower2,
  Trees,
  Leaf,
  Sparkles,
} from 'lucide-react';

const floatingItems = [
  {
    icon: Trees,
    className: 'top-10 left-[3%] md:left-[7%] text-sage/55',
    size: 'w-24 h-24 md:w-32 md:h-32',
    animation: {
      y: [0, -20, 0],
      rotate: [0, 7, -2, 0],
    },
    duration: 7,
  },

  {
    icon: Leaf,
    className: 'top-[30%] left-[8%] text-forest/45',
    size: 'w-12 h-12 md:w-16 md:h-16',
    animation: {
      x: [0, 18, -8, 0],
      y: [0, -10, 0],
      rotate: [-10, 8, -10],
    },
    duration: 6,
  },

  {
    icon: Sprout,
    className: 'bottom-[17%] left-[20%] text-sage/50',
    size: 'w-14 h-14 md:w-20 md:h-20',
    animation: {
      y: [0, -18, 0],
      scale: [1, 1.08, 1],
    },
    duration: 5,
  },

  {
    icon: Flower2,
    className: 'top-20 right-[7%] text-dustyRose/60',
    size: 'w-14 h-14 md:w-20 md:h-20',
    animation: {
      y: [0, 15, 0],
      rotate: [0, 10, -5, 0],
    },
    duration: 5.5,
  },

  {
    icon: Leaf,
    className: 'top-[42%] right-[10%] text-sage/45',
    size: 'w-10 h-10 md:w-14 md:h-14',
    animation: {
      x: [0, -18, 0],
      y: [0, 12, 0],
      rotate: [5, -12, 5],
    },
    duration: 6.5,
  },

  {
    icon: Flower2,
    className: 'bottom-[12%] right-[20%] text-softRose/60',
    size: 'w-12 h-12 md:w-16 md:h-16',
    animation: {
      scale: [1, 1.15, 1],
      y: [0, -12, 0],
    },
    duration: 4.8,
  },

  {
    icon: Sparkles,
    className: 'top-[18%] right-[32%] text-warmTaupe/45',
    size: 'w-8 h-8 md:w-10 md:h-10',
    animation: {
      opacity: [0.25, 0.9, 0.25],
      scale: [0.9, 1.15, 0.9],
    },
    duration: 3.8,
  },
];

const HeroSection = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-[88vh] bg-gradient-to-b from-antiqueCream via-sage/15 to-creamLight flex items-center justify-center overflow-hidden px-6">

      {/* Background decoration */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-dustyRose/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-sage/25 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[35%] right-[25%] w-20 h-20 rounded-full bg-pinkCream/60 blur-2xl"
      />

      {/* Floating environmental elements */}

      {floatingItems.map((item, index) => {

        const Icon = item.icon;

        return (
          <motion.div
            key={`${item.className}-${index}`}
            animate={item.animation}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.35,
            }}
            className={`absolute pointer-events-none ${item.className}`}
          >
            <Icon
              className={item.size}
              strokeWidth={1.35}
            />
          </motion.div>
        );
      })}

      {/* Central Content */}

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">

        <motion.span
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-sage/15 text-denim rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-sage/30 shadow-sm"
        >
          <Leaf className="w-4 h-4 text-sage" />

          <span>
            Sustainable Future for Basra
          </span>
        </motion.span>

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-denim tracking-tight mb-5 leading-tight"
        >
          EcoDrop{' '}

          <span className="text-sage italic">
            Basra
          </span>
        </motion.h1>

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: '96px',
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.55,
          }}
          className="h-1 rounded-full bg-dustyRose mb-7"
        />

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="text-lg md:text-xl text-denim/80 font-normal max-w-2xl mb-5 leading-relaxed"
        >
          Small choices can create a greener Basra.
          EcoDrop connects people with smart recycling,
          local green spaces, eco-friendly exchange,
          and meaningful environmental action.
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.65,
          }}
          className="text-sm md:text-base text-warmTaupe italic mb-9"
        >
          Recycle more. Waste less. Grow together.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.8,
          }}
          className="flex flex-wrap gap-4 justify-center"
        >

          <motion.button
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              scrollToSection('about-section')
            }
            className="flex items-center gap-2 bg-sage text-antiqueCream px-8 py-3.5 rounded-full font-semibold shadow-lg hover:bg-forest transition-all duration-300 cursor-pointer"
          >
            <span>
              About Us
            </span>

            <ArrowDown className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              scrollToSection('contact-section')
            }
            className="flex items-center gap-2 border-2 border-dustyRose text-dustyRose px-8 py-3.5 rounded-full font-semibold hover:bg-dustyRose hover:text-antiqueCream transition-all duration-300 cursor-pointer"
          >
            <span>
              Contact Us
            </span>
          </motion.button>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;