import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Share2,
  Heart,
  Eye,
  MessageSquareText,
  Ruler,
} from "lucide-react";
import { useListings } from "../hooks/useListings";
import { ImageGallery } from "../components/ImageGallery";
import { Listing } from "../types";

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
      className="min-h-screen bg-[#171717] pb-20 pt-8"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Gallery */}
          <div>
            <ImageGallery images={listing.images} videos={listing.videos} name={listing.name} />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold text-white">{listing.name}</h1>

                <div className="flex flex-wrap items-center gap-3 text-neutral-400">
                  <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-white/10">
                    {listing.age} años
                  </span>

                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    {primaryLocation}
                  </span>
                </div>
              </div>

              {/* Stats (reemplaza el bloque de price del diseño original, sin romper la estética) */}
              <div className="rounded-xl bg-[#1F1F1F] border border-white/5 p-4 sm:min-w-[220px]">
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

            {/* About (Nombre / Edad / Descripción ya están, aquí queda la descripción) */}
            <div className="mb-6 rounded-xl bg-[#1F1F1F] p-6 border border-white/5">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Descripción
              </h2>
              <p className="leading-relaxed text-neutral-400">{listing.description}</p>
            </div>

            {/* Measurements */}
            <div className="mb-6 rounded-xl bg-[#1F1F1F] p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-neutral-300" />
                <h2 className="text-lg font-semibold text-white">Medidas</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Cintura</div>
                  <div className="font-medium text-white">{listing.measurements.waist} cm</div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Estatura</div>
                  <div className="font-medium text-white">{listing.measurements.height} cm</div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Caderas</div>
                  <div className="font-medium text-white">{listing.measurements.hips} cm</div>
                </div>

                <div className="p-4 border rounded-lg border-white/10 bg-black/20">
                  <div className="text-sm text-neutral-500">Busto</div>
                  <div className="font-medium text-white">{listing.measurements.bust} cm</div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-8 rounded-xl bg-[#1F1F1F] p-6 border border-white/5">
              <h2 className="mb-4 text-lg font-semibold text-white">Lugares de atención</h2>

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

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 font-bold text-center text-white transition-colors bg-red-600 shadow-lg rounded-xl shadow-red-500/20 hover:bg-red-500"
              >
                Contactar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLike(listing.id)}
                className={`flex items-center justify-center rounded-xl border px-6 transition-colors ${
                  listing.liked
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : "border-white/10 bg-[#1F1F1F] text-white hover:bg-white/5"
                }`}
              >
                <Heart className={`h-6 w-6 ${listing.liked ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-[#1F1F1F] px-6 text-white hover:bg-white/5"
              >
                <Share2 className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
