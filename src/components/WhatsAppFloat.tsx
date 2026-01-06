import React from "react";
import { FaWhatsapp } from "react-icons/fa";

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
        fixed z-50
        right-3 sm:right-5
        bottom-[calc(env(safe-area-inset-bottom,0px)+12px)] sm:bottom-5
        group select-none
        flex items-center
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
      <div className="flex items-center gap-2 sm:gap-3 px-2.5 py-2.5 sm:px-3.5 sm:py-3">
        {/* Icono */}
        <div
          className="grid transition-colors duration-200 border rounded-full place-items-center w-11 h-11 sm:w-10 sm:h-10 sm:rounded-xl bg-black/30 border-white/10 group-hover:border-white/20 shrink-0"
        >
          <span
            className="
              grid place-items-center
              h-8 w-8 sm:h-7 sm:w-7
              rounded-full sm:rounded-lg
              bg-green-500/10 text-green-400
              transition-transform duration-200
              group-hover:scale-[1.04]
            "
          >
            {/* ✅ Logo real WhatsApp */}
            <FaWhatsapp className="h-5 w-5 sm:h-[18px] sm:w-[18px]" />
          </span>
        </div>

        {/* Texto: SIEMPRE visible */}
        <div className="flex flex-col justify-center min-w-0 pr-1 leading-tight">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[12px] md:text-[13px] font-semibold text-white/90 tracking-wide">
              ¿QUIERES
            </span>
            <span className="text-[12px] md:text-[13px] font-semibold text-red-500 tracking-wide">
              ANUNCIARTE?
            </span>
          </div>

          <div
            className="
              mt-0.5
              text-[16px] md:text-[18px] lg:text-[20px]
              font-extrabold tracking-wide text-white
              transition-transform duration-200
              group-hover:translate-x-[1px]
              whitespace-nowrap
            "
            style={{ textShadow: "0 0 14px rgba(239,68,68,0.28)" }}
          >
            {phoneDisplay}
          </div>
        </div>
      </div>

      {/* Glow sutil */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-200 opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 0 1px rgba(239,68,68,0.16), 0 0 26px rgba(239,68,68,0.09)",
        }}
      />
    </a>
  );
}
