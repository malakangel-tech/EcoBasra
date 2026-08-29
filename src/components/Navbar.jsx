import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Eco Market', path: '/market' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-antiqueCream/90 backdrop-blur-md border-b border-warmTaupe/20 px-6 md:px-8 py-4 flex justify-between items-center shadow-sm">

      <Link to="/" className="flex items-center gap-2 group">

        <motion.div
          whileHover={{
            rotate: 12,
            scale: 1.1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
          }}
          className="p-2 bg-sage rounded-full text-antiqueCream shadow-md"
        >
          <Leaf className="w-5 h-5" />
        </motion.div>

        <div className="flex flex-col">
          <span className="font-bold text-xl text-denim tracking-tight leading-none">
            EcoDrop
          </span>

          <span className="text-xs font-semibold text-sage tracking-widest uppercase">
            Basra
          </span>
        </div>

      </Link>

      <ul className="hidden md:flex items-center gap-5 lg:gap-8">

        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <li key={link.path}>

              <Link
                to={link.path}
                className={`relative font-medium transition-all duration-300 hover:text-dustyRose ${
                  isActive
                    ? 'text-dustyRose font-bold'
                    : 'text-denim'
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-dustyRose transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>

            </li>
          );
        })}

        <li>
          <Link
            to="/calculator"
            className="flex items-center gap-1.5 bg-sage text-antiqueCream px-4 py-2 rounded-full font-medium text-sm hover:bg-forest hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
          >
            <span>Eco Calculator</span>

            <span className="text-xs bg-antiqueCream text-sage px-1.5 py-0.5 rounded-full font-bold">
              +
            </span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;