import React from 'react';
import { motion } from 'framer-motion';
import {
  Recycle,
  TreePine,
  HeartHandshake,
} from 'lucide-react';

const values = [
  {
    icon: Recycle,
    title: 'Recycle Smarter',
    text: 'Make recycling easier by discovering useful local options and turning everyday waste into a resource.',
  },

  {
    icon: TreePine,
    title: 'Grow Greener',
    text: 'Support greener spaces and encourage small environmental actions that can make a visible difference in Basra.',
  },

  {
    icon: HeartHandshake,
    title: 'Act Together',
    text: 'Create a community where people, local initiatives, and environmental ideas can connect and grow together.',
  },
];

const AboutSection = () => {
  return (
    <section
      id="about-section"
      className="relative overflow-hidden py-24 bg-creamLight px-6 border-t border-warmTaupe/10"
    >

      {/* Background decoration */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
        }}
        className="absolute -right-20 top-10 w-64 h-64 rounded-full bg-sage/10 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-[4%] text-sage/20 pointer-events-none"
      >
        <TreePine className="w-20 h-20" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">

        {/* About Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-4xl mx-auto text-center"
        >

          <span className="inline-block text-sm uppercase tracking-[0.2em] font-semibold text-sage mb-4">
            Our Mission
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-denim mb-6">
            About EcoDrop{' '}

            <span className="text-dustyRose italic">
              Basra
            </span>
          </h2>

          <p className="text-denim/75 leading-relaxed text-lg md:text-xl mb-5">
            EcoDrop Basra is a community-driven initiative
            built to tackle urban waste challenges in Basra.
            We connect residents with local recycling
            opportunities, green initiatives, and practical
            tools that make sustainable choices easier in
            everyday life.
          </p>

          <p className="text-warmTaupe leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
            Our goal is simple: turn awareness into action
            and help create a cleaner, greener city where
            every small contribution matters.
          </p>

        </motion.div>

        {/* Values */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {values.map((value, index) => {

            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group rounded-3xl bg-white/80 border border-warmTaupe/15 p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="w-14 h-14 rounded-2xl bg-sage/15 text-sage flex items-center justify-center mb-5 group-hover:bg-sage group-hover:text-antiqueCream transition-all duration-300"
                >
                  <Icon
                    className="w-7 h-7"
                    strokeWidth={1.7}
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-denim mb-3">
                  {value.title}
                </h3>

                <p className="text-warmTaupe leading-relaxed">
                  {value.text}
                </p>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default AboutSection;