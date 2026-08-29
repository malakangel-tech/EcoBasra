import React from 'react';
import { Leaf, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-denim text-antiqueCream py-10 border-t border-warmTaupe/30">

      {/* Background decorations */}

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sage/20 blur-3xl" />

      <div className="absolute -bottom-16 left-10 w-44 h-44 rounded-full bg-dustyRose/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">

        <div>

          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">

            <Leaf className="w-4 h-4 text-sage" />

            <h3 className="font-bold text-lg tracking-wide text-antiqueCream">
              EcoDrop Basra
            </h3>

          </div>

          <p className="text-sm text-antiqueCream/75">
            Building a cleaner, greener community together.
          </p>

        </div>

        <div className="flex items-center gap-2 text-sm text-antiqueCream/75">

          Made with

          <Heart
            className="w-4 h-4 text-dustyRose fill-dustyRose"
          />

          for a greener Basra · © 2026

        </div>

      </div>
    </footer>
  );
};

export default Footer;