import React from 'react';
import { Link } from 'react-router-dom';
import { Milk, User } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar() {
  return <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors group-hover:bg-red-500/20">
            <Milk className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Lecheras<span className="text-red-500">.</span>
          </span>
        </Link>

        {/* Center content removed as requested */}
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <Link to="/login">
            <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-red-500">
              <User className="h-4 w-4" />
              <span>Anunciarme</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>;
}