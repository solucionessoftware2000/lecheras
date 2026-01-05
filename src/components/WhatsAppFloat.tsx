import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=51936615158&text=Hola%2C+quiero+informaci%C3%B3n+sobre+tu+web+&type=phone_number&app_absent=0";

function formatPhonePE(phone: string) {
  const raw = phone.replace(/\D/g, "");
  if (raw.startsWith("51") && raw.length === 11) {
    const n = raw.slice(2);
    return `+51 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
  }
  return phone;
}

export function WhatsAppFloat() {
  const phoneDisplay = formatPhonePE("51936615158");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        group
        flex items-center
        select-none
        rounded-2xl
        bg-[#1F1F1F]
        border border-white/10
        shadow-lg shadow-black/30
        transition-all duration-200
        hover:-translate-y-1 hover:border-white/20
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40
        active:translate-y-0
      "
    >
      {/* Wrapper para centrar y dar buen padding */}
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Icono */}
        <div
          className="grid w-12 h-12 transition-colors duration-200 border  place-items-center rounded-2xl bg-black/30 border-white/10 group-hover:border-white/20"
        >
          <span
            className="
              grid h-9 w-9 place-items-center
              rounded-xl
              bg-green-500/10 text-green-400
              transition-transform duration-200
              group-hover:scale-[1.03]
            "
          >
            <MessageCircle className="w-5 h-5" />
          </span>
        </div>

        {/* Texto (centrado y consistente) */}
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-[15px] sm:text-[16px] font-semibold text-white/90 tracking-wide">
              ¿QUIERES
            </span>
            <span className="text-[15px] sm:text-[16px] font-semibold text-red-500 tracking-wide">
              ANUNCIARTE?
            </span>
          </div>

          <div
            className="
              mt-1
              text-[26px] sm:text-[30px]
              font-extrabold
              tracking-wide
              text-white
              transition-transform duration-200
              group-hover:translate-x-[1px]
            "
            style={{
              textShadow: "0 0 18px rgba(239,68,68,0.35)",
            }}
          >
            {phoneDisplay}
          </div>
        </div>
      </div>

      {/* Glow sutil en hover (sin cambiar colores base) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-200 opacity-0 pointer-events-none  rounded-2xl group-hover:opacity-100"
        style={{
          boxShadow: "0 0 0 1px rgba(239,68,68,0.18), 0 0 30px rgba(239,68,68,0.10)",
        }}
      />
    </a>
  );
}
