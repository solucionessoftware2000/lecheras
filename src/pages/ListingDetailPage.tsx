import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Share2,
  Eye,
  MessageSquareText,
  Ruler,
  Phone,
} from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { useListings } from "../hooks/useListings";
import { ImageGallery } from "../components/ImageGallery";
import { Listing } from "../types";

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

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getListing, toggleLike } = useListings();
  const [listing, setListing] = useState<Listing | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = getListing(id);
      setListing(found);
    }
  }, [id, getListing]);

  const primaryLocation = useMemo(() => listing?.locations?.[0] ?? "—", [listing]);

  const handleWhatsApp = () => {
    if (!listing) return;

    const locs = listing.locations?.length
      ? listing.locations.join(", ")
      : "No especificado";

    const text = [
      `Hola, quiero información sobre:`,
      `• Nombre: ${listing.name}`,
      `• Edad: ${listing.age} años`,
      `• Medidas: Cintura ${listing.measurements.waist}cm, Estatura ${listing.measurements.height}cm, Caderas ${listing.measurements.hips}cm, Busto ${listing.measurements.bust}cm`,
      `• Lugares: ${locs}`,
      ``,
      `Link: ${window.location.href}`,
    ].join("\n");

    const waPhone = normalizePhone(listing.contact.whatsapp);
    const wa = buildWhatsAppLink({ phone: waPhone, text });
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  const handleCall = () => {
    if (!listing) return;
    const phone = normalizePhone(listing.contact.phone);
    window.location.href = `tel:+${phone}`;
  };

  const handleTelegram = () => {
    if (!listing) return;
    window.open(listing.contact.telegram, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = listing ? `${listing.name} - Perfil` : "Perfil";
    const text = listing
      ? `Mira este perfil: ${listing.name} (${listing.age} años)`
      : "Mira este perfil";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado ✅");
        return;
      }
      window.prompt("Copia este enlace:", url);
    } catch {
      // ignore
    }
  };

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#171717] text-white">
        <div className="w-8 h-8 border-2 border-red-500 rounded-full animate-spin border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#171717] pb-16 sm:pb-20 pt-6 sm:pt-8"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors sm:mb-8 text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Seleccionar otra lechera
        </Link>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Column: Gallery */}
          <div>
            <ImageGallery
              images={listing.images}
              videos={listing.videos}
              name={listing.name}
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-5 sm:mb-6 md:flex-row md:items-start md:justify-between">
              {/* Left info */}
              <div className="min-w-0">
                <h1 className="mb-2 text-2xl font-bold text-white break-words sm:text-3xl lg:text-4xl">
                  {listing.name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-400">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full sm:text-sm bg-white/10">
                    {listing.age} años
                  </span>

                  <span className="flex items-center min-w-0 gap-1 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{primaryLocation}</span>
                  </span>
                </div>

                {/* ✅ Contactos (ÚNICO LUGAR: arriba) */}
                <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-3">
                  <button
                    onClick={handleCall}
                    className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-sm text-white border rounded-xl border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                  >
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-sm text-white border rounded-xl border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                  >
                    <FaWhatsapp className="w-4 h-4 text-green-400" />
                    WhatsApp
                  </button>

                  <button
                    onClick={handleTelegram}
                    className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-sm text-white border rounded-xl border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                  >
                    <FaTelegramPlane className="w-4 h-4 text-sky-400" />
                    Telegram
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="w-full md:w-auto rounded-xl bg-[#1F1F1F] border border-white/5 p-4 md:min-w-[220px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-black/30 border-white/10">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Eye className="w-4 h-4" />
                      La vieron
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {listing.stats.views.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg bg-black/30 border-white/10">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <MessageSquareText className="w-4 h-4" />
                      Escribieron
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {listing.stats.messages.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-5 sm:mb-6 rounded-xl bg-[#1F1F1F] p-4 sm:p-6 border border-white/5">
              <h2 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
                Descripción
              </h2>
              <p className="text-sm leading-relaxed sm:text-base text-neutral-400">
                {listing.description}
              </p>
            </div>

            {/* Measurements */}
            <div className="mb-5 sm:mb-6 rounded-xl bg-[#1F1F1F] p-4 sm:p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Ruler className="w-5 h-5 text-neutral-300" />
                <h2 className="text-base font-semibold text-white sm:text-lg">
                  Medidas
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Cintura</div>
                  <div className="font-medium text-white">
                    {listing.measurements.waist} cm
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Estatura</div>
                  <div className="font-medium text-white">
                    {listing.measurements.height} cm
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Caderas</div>
                  <div className="font-medium text-white">
                    {listing.measurements.hips} cm
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Busto</div>
                  <div className="font-medium text-white">
                    {listing.measurements.bust} cm
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-6 sm:mb-8 rounded-xl bg-[#1F1F1F] p-4 sm:p-6 border border-white/5">
              <h2 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
                Lugares de atención
              </h2>

              <div className="flex flex-wrap gap-2">
                {listing.locations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1 text-sm border rounded-full border-white/10 bg-black/20 text-neutral-200"
                  >
                    {loc}
                  </span>
                ))}
              </div>

              {listing.locations.length === 0 && (
                <div className="text-sm text-neutral-500">No especificado</div>
              )}
            </div>

            {/* Actions (ÚNICO: Like + Share) */}
            <div className="mt-auto">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 sm:gap-4">
                {/* Like (vaso de leche) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleLike(listing.id)}
                  className={`h-14 w-full sm:w-14 flex items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 ${
                    listing.liked
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-[#1F1F1F] text-neutral-200 hover:bg-white/5"
                  }`}
                  aria-label={listing.liked ? "Quitar like" : "Dar like"}
                  title={listing.liked ? "Quitar like" : "Dar like"}
                >
                  <MilkGlassIcon
                    className={`h-6 w-6 ${listing.liked ? "fill-current" : ""}`}
                    filled={listing.liked}
                  />
                </motion.button>

                {/* Share (full width) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1F1F1F] px-6 py-3 text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                >
                  <Share2 className="w-5 h-5" />
                  Compartir
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
