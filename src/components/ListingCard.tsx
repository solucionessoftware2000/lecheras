import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Phone, Plus, BadgeCheck } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MarketplaceItem } from "../types";

interface ListingCardProps {
  item: MarketplaceItem;
  onToggleLike: (id: string) => void;
}

const WHATSAPP_FLOAT_URL =
  "https://api.whatsapp.com/send/?phone=51936615158&text=Hola%2C+quiero+informaci%C3%B3n+sobre+tu+web+&type=phone_number&app_absent=0";

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function buildWhatsAppLink(params: { phone: string; text: string }) {
  const base = "https://api.whatsapp.com/send/";
  const url = new URL(base);
  url.searchParams.set("phone", params.phone);
  url.searchParams.set("text", params.text);
  url.searchParams.set("type", "phone_number");
  url.searchParams.set("app_absent", "0");
  return url.toString();
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 ${className}`} aria-hidden="true" />
  );
}

/** ✅ Icono vaso de leche (custom). Con fill-current se "llena" cuando liked=true */
function MilkGlassIcon({
  className,
  filled,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 3h10l-1.2 17.2A2 2 0 0 1 13.81 22h-3.62a2 2 0 0 1-1.99-1.8L7 3z" />
      <path d="M7.2 6.5h9.6" />
      {!filled && <path d="M8 10.5h8" opacity="0.75" />}
    </svg>
  );
}

export function ListingCard({ item, onToggleLike }: ListingCardProps) {
  const navigate = useNavigate();

  // ✅ Card “Anúnciate aquí”
  if (item.kind === "ad") {
    return (
      <motion.a
        href={WHATSAPP_FLOAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col overflow-hidden rounded-xl bg-[#1F1F1F] shadow-lg shadow-black/20 border border-white/5 cursor-pointer"
      >
        {/* Top */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-black/30 to-black/10 opacity-90" />

          {/* ✅ CENTRADO PERFECTO (con offset leve hacia abajo) */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-full px-6 text-center translate-y-2">
              <div className="grid mx-auto transition border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-black/30 text-white/90 group-hover:border-white/20 group-hover:bg-white/5">
                <Plus className="h-7 w-7" />
              </div>

              <div className="mt-3">
                <div className="text-lg font-bold text-white">Anúnciate aquí</div>
                <div className="mt-1 text-sm text-neutral-400">
                  Toca para escribir por WhatsApp
                </div>
              </div>
            </div>
          </div>

          <div className="absolute z-20 px-3 py-1 text-sm font-semibold text-white border rounded-full top-4 right-4 bg-black/60 backdrop-blur-md border-white/10">
            + Cupo
          </div>
        </div>

        {/* ✅ Bottom: pegado abajo */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mt-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-[18px] font-bold text-white group-hover:text-red-500 transition-colors">
                  Publica tu perfil
                </h3>
                <p className="text-sm text-neutral-400">Promoción destacada</p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium transition-colors text-white/90 group-hover:text-red-500">
                Ir
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-4 mt-4">
              <div className="pt-4 text-xs border-t border-white/5 text-neutral-500">
                Se abrirá WhatsApp para más información.
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    );
  }

  // ✅ Listing normal
  const listing = item.listing;
  const location = listing.locations?.[0] ?? "—";

  const phone = normalizePhone(listing.contact.phone);
  const waPhone = normalizePhone(listing.contact.whatsapp);

  const waText = `Hola, quiero información sobre ${listing.name} (${listing.age} años).`;
  const waUrl = buildWhatsAppLink({ phone: waPhone, text: waText });

  const tgUrl = listing.contact.telegram;

  // ✅ Skeleton + error control
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ✅ Aspect ratio dinámico (toma el real de la foto)
  const [ratio, setRatio] = useState<string>("4 / 3");

  // ✅ botones fuera de la imagen
  const contactBtn =
    "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 transition";

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/listing/${listing.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/listing/${listing.id}`);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-[#1F1F1F] shadow-lg shadow-black/20 border border-white/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
    >
      <div className="relative w-full overflow-hidden bg-black/30" style={{ aspectRatio: ratio }}>
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 z-0">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <style>
              {`
                @keyframes shimmer { 100% { transform: translateX(100%); } }
              `}
            </style>
          </div>
        )}

        <motion.img
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          src={listing.image}
          alt={listing.name}
          className={`w-full h-full object-contain ${
            imgLoaded && !imgError ? "opacity-100" : "opacity-0"
          } transition-opacity`}
          loading="lazy"
          draggable={false}
          onLoad={(e) => {
            const img = e.currentTarget;
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            if (w > 0 && h > 0) setRatio(`${w} / ${h}`);
            setImgLoaded(true);
          }}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
        />

        {imgError && (
          <div className="absolute inset-0 grid place-items-center text-neutral-500">
            <div className="text-xs">Imagen no disponible</div>
          </div>
        )}

        <div className="absolute z-20 px-3 py-1 text-sm font-semibold text-white border rounded-full top-2 right-2 sm:top-3 sm:right-3 bg-black/70 backdrop-blur-md border-white/10">
          ${listing.price.toLocaleString()}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/5">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            <BadgeCheck className="w-4 h-4 text-emerald-300" />
            <span className="truncate">VERIFICADA</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:+${phone}`}
            onClick={(e) => e.stopPropagation()}
            className={contactBtn}
            aria-label="Llamar"
            title="Llamar"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`${contactBtn} text-green-400 hover:text-green-300`}
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>

          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`${contactBtn} text-sky-400 hover:text-sky-300`}
            aria-label="Telegram"
            title="Telegram"
          >
            <FaTelegramPlane className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center flex-1 min-w-0 gap-3">
            <h3 className="min-w-0 truncate text-[18px] font-bold text-white transition-colors group-hover:text-red-500">
              {listing.name}
            </h3>

            <span className="text-sm shrink-0 text-neutral-400">
              {listing.age} años
            </span>

            <span className="min-w-0 flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleLike(listing.id);
            }}
            className={`shrink-0 rounded-full p-2 transition-colors ${
              listing.liked
                ? "bg-white/10 text-white"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
            }`}
            aria-label={listing.liked ? "Quitar like" : "Dar like"}
            title={listing.liked ? "Quitar like" : "Dar like"}
          >
            <MilkGlassIcon
              className={`h-5 w-5 ${listing.liked ? "fill-current" : ""}`}
              filled={listing.liked}
            />
          </motion.button>
        </div>

        <div className="pt-4 mt-auto">
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-red-500">
              Ver Detalles
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
