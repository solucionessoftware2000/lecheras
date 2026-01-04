import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Milk, ArrowRight, Lock, Mail } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app this would call an API
    console.log('Login:', {
      email,
      password
    });
    navigate('/admin');
  };
  return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="w-full max-w-md space-y-8 bg-[#1F1F1F] p-8 rounded-2xl border border-white/5 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-4">
            <Milk className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Accede a tu panel de administración
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded-lg border border-white/10 bg-black/50 pl-10 p-3 text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm transition-colors" placeholder="tu@email.com" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="block w-full rounded-lg border border-white/10 bg-black/50 pl-10 p-3 text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm transition-colors" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} type="submit" className="group relative flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1F1F1F] transition-all shadow-lg shadow-red-500/20">
            Entrar
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <div className="text-center text-sm">
            <span className="text-neutral-400">¿No tienes cuenta? </span>
            <Link to="/register" className="font-medium text-red-500 hover:text-red-400 transition-colors">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </motion.div>
    </div>;
}