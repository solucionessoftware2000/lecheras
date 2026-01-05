import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  ArrowRight,
  Phone,
  Send,
  MessageCircle,
  Plus,
} from "lucide-react";
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
        {/* “Imagen” fake con el mismo aspect */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-black/30 to-black/10 opacity-90" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="grid transition border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-black/30 text-white/90 group-hover:border-white/20 group-hover:bg-white/5">
                <Plus className="h-7 w-7" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">Anúnciate aquí</div>
                <div className="text-sm text-neutral-400">
                  Toca para escribir por WhatsApp
                </div>
              </div>
            </div>
          </div>

          {/* Tag arriba derecha para que se parezca a Price */}
          <div className="absolute z-20 px-3 py-1 text-sm font-semibold text-white border rounded-full top-4 right-4 bg-black/60 backdrop-blur-md border-white/10">
            + Cupo
          </div>
        </div>

        {/* Footer igual al estilo */}
        <div className="flex flex-col flex-1 p-5">
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

          <div className="pt-4 mt-auto">
            <div className="pt-4 text-xs border-t border-white/5 text-neutral-500">
              Se abrirá WhatsApp para más información.
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

  const contactBtn =
    "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/5 transition";

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
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-transparent opacity-60 z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={listing.image}
          alt={listing.name}
          className="object-cover w-full h-full"
        />

        {/* Price Tag */}
        <div className="absolute z-20 px-3 py-1 text-sm font-semibold text-white border rounded-full top-4 right-4 bg-black/60 backdrop-blur-md border-white/10">
          ${listing.price.toLocaleString()}
        </div>

        {/* Contact Icons (sobre la imagen, abajo-izq) */}
        <div className="absolute z-20 flex items-center gap-2 left-4 bottom-4">
          {/* Tel */}
          <a
            href={`tel:+${phone}`}
            onClick={(e) => e.stopPropagation()}
            className={contactBtn}
            aria-label="Llamar"
            title="Llamar"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={contactBtn}
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Telegram */}
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={contactBtn}
            aria-label="Telegram"
            title="Telegram"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Fila: Nombre + Edad + Lugar  |  Corazón */}
        <div className="flex items-center justify-between gap-3">
          {/* izquierda: texto */}
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
                ? "bg-red-500/10 text-red-500"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
            }`}
            aria-label={listing.liked ? "Quitar like" : "Dar like"}
            title={listing.liked ? "Quitar like" : "Dar like"}
          >
            <Heart className={`h-5 w-5 ${listing.liked ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Abajo: Ver detalles */}
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
