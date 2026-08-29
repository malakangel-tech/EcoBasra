import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Leaf,
  Flower2,
} from 'lucide-react';

const ContactSection = () => {
  return (
    <section
      id="contact-section"
      className="relative overflow-hidden py-24 bg-antiqueCream/70 px-6 border-t border-warmTaupe/10"
    >

      {/* Floating decorations */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-[5%] text-sage/30 pointer-events-none"
      >
        <Leaf className="w-20 h-20" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
        className="absolute bottom-8 right-[7%] text-dustyRose/35 pointer-events-none"
      >
        <Leaf className="w-16 h-16" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-[30%] right-[12%] text-sage/20 pointer-events-none"
      >
        <Flower2 className="w-14 h-14" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
        >

          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-semibold text-sage mb-4">
            <Mail className="w-4 h-4" />
            Let's Connect
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-denim mb-4">
            Get In{' '}

            <span className="text-dustyRose italic">
              Touch
            </span>
          </h2>

          <p className="text-warmTaupe text-lg mb-10">
            Have a question, an idea, or want to collaborate
            with EcoDrop Basra? We would love to hear from you.
          </p>

        </motion.div>

        {/* Contact Form */}

        <motion.form
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="flex flex-col gap-4 text-left max-w-xl mx-auto bg-white/70 backdrop-blur-sm border border-warmTaupe/15 rounded-3xl p-6 md:p-8 shadow-lg"
        >

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-5 py-3.5 rounded-2xl border border-warmTaupe/25 bg-creamLight/80 text-denim placeholder:text-warmTaupe/70 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/15 transition-all"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-3.5 rounded-2xl border border-warmTaupe/25 bg-creamLight/80 text-denim placeholder:text-warmTaupe/70 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/15 transition-all"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-5 py-3.5 rounded-2xl border border-warmTaupe/25 bg-creamLight/80 text-denim placeholder:text-warmTaupe/70 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/15 transition-all resize-none"
          />

          <motion.button
            type="button"
            whileHover={{
              y: -3,
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="flex items-center justify-center gap-2 bg-sage text-antiqueCream font-semibold py-3.5 rounded-2xl hover:bg-forest transition-all duration-300 shadow-md"
          >
            <Send className="w-4 h-4" />

            Send Message
          </motion.button>

        </motion.form>

      </div>
    </section>
  );
};

export default ContactSection;