import { useState } from 'react';
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
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-500 rounded-xl bg-red-500/10">
            <Milk className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Accede para una mejor experiencia
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-300">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="block w-full p-3 pl-10 text-white transition-colors border rounded-lg border-white/10 bg-black/50 placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm" placeholder="tu@email.com" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-neutral-300">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="block w-full p-3 pl-10 text-white transition-colors border rounded-lg border-white/10 bg-black/50 placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} type="submit" className="group relative flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1F1F1F] transition-all shadow-lg shadow-red-500/20">
            Entrar
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <div className="text-sm text-center">
            <span className="text-neutral-400">¿No tienes cuenta? </span>
            <Link to="/register" className="font-medium text-red-500 transition-colors hover:text-red-400">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </motion.div>
    </div>;
}