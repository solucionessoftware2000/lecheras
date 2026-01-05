
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export function TermsPage() {
  return <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link to="/register" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver al registro
      </Link>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-[#1F1F1F] border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Términos y Condiciones
          </h1>
        </div>

        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Aceptación de los términos
            </h2>
            <p>
              Al acceder y utilizar este sitio web, usted acepta estar sujeto a
              estos términos y condiciones de uso, todas las leyes y
              regulaciones aplicables, y acepta que es responsable del
              cumplimiento de las leyes locales aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Uso del sitio
            </h2>
            <p>
              Este sitio es exclusivamente para mayores de 18 años. Todo el
              contenido es con fines publicitarios y de entretenimiento para
              adultos. Al ingresar, usted declara bajo juramento ser mayor de
              edad en su jurisdicción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Responsabilidad
            </h2>
            <p>
              Lecheras actúa únicamente como un medio publicitario. No somos
              responsables de los acuerdos, conversaciones o encuentros que
              puedan surgir entre los anunciantes y los usuarios. No tenemos
              relación laboral con los anunciantes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido, diseño y código de este sitio está protegido
              por derechos de autor. Está prohibida la copia parcial o total sin
              autorización expresa.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 mt-8">
            <p className="text-sm text-neutral-500">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>;
}