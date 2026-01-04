import React from 'react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="w-full border-t border-white/5 bg-black py-12 px-4 sm:px-6 lg:px-8 text-neutral-500 text-xs leading-relaxed text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <p>
          © {currentYear} ADVERTENCIA todas las modelos son mayores de 18 años
          y con autorizacion de las mismas. el unico objetivo de la presente
          guia es ser solo un medio de publicidad, por lo tanto los acuerdos y
          conversaciones que se realizan entre las personas que aqui publican
          sus fotos y terceras no son de interes ni responsabilidad del autor de
          esta pagina.
        </p>
        <p>
          Lecheras no posee relacion ni vinculacion laboral con las anunciantes.
          solo publicamos fotografias y textos a expresa voluntad de nuestros
          anunciantes. Lecheras es la unica pagina web que no es agencia y
          trabaja de forma independiente. Lecheras no es una agencia de escorts
          o acompañantes. su actividad se limita a la fotografia artistica y a
          la publicidad en la pagina de internet el cual que lleva su nombre.
        </p>
        <p>
          https://lecheras-e4597.web.app/ se aloja en los servidores ubicados en
          Estados Unidos, por lo tanto nos sometemos a las leyes americanas al
          respecto a la publicidad online.
        </p>
        <p className="font-bold text-neutral-400">
          !prohibida la copia parcial o total de la web! todos los derechos
          reservados | copyright | https://lecheras-e4597.web.app/ | propiedad
          intelectual
        </p>
      </div>
    </footer>;
}