
import { Link } from 'react-router-dom';
import { Milk, User } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar() {
  return <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 text-red-500 transition-colors rounded-lg bg-red-500/10 group-hover:bg-red-500/20">
            <Milk className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Lecheras<span className="text-red-500"> Lima</span>
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
          }} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-red-600 rounded-lg shadow-lg shadow-red-500/20 hover:bg-red-500">
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>;
}