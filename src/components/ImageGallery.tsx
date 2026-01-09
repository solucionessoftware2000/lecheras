import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, Video as VideoIcon, X } from "lucide-react";

type Props = {
  name: string;
  images: string[];
  videos?: string[];
};

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

function Skeleton({
  className = "",
  rounded = "rounded-lg",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`${rounded} ${className} animate-pulse bg-white/10`}
      aria-hidden="true"
    />
  );
}

export function ImageGallery({ images, videos = [], name }: Props) {
  const hasVideos = videos.length > 0;

  const mediaAll = useMemo<MediaItem[]>(() => {
    const imgs: MediaItem[] = images.map((src) => ({ type: "image", src }));
    const vids: MediaItem[] = videos.map((src) => ({ type: "video", src }));
    return [...imgs, ...vids];
  }, [images, videos]);

  const [tab, setTab] = useState<"photos" | "videos" | "all">(
    hasVideos ? "all" : "photos"
  );

  const media = useMemo<MediaItem[]>(() => {
    if (tab === "photos") return images.map((src) => ({ type: "image", src }));
    if (tab === "videos") return videos.map((src) => ({ type: "video", src }));
    return mediaAll;
  }, [tab, images, videos, mediaAll]);

  const [active, setActive] = useState(0);
  const activeItem = media[active] ?? media[0];

  // 🔥 loading states
  const [mainLoaded, setMainLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState<Record<string, boolean>>({});

  // ✅ Modal state (solo para imagenes)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Si cambias tab y el index queda fuera
  React.useEffect(() => {
    setActive(0);
  }, [tab]);

  // ✅ cada vez que cambia el item principal, mostramos skeleton hasta que cargue
  React.useEffect(() => {
    setMainLoaded(false);
  }, [activeItem?.src, activeItem?.type, tab]);

  // ✅ cerrar con ESC
  React.useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  // ✅ bloquear scroll cuando modal está abierto
  React.useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  const mainSrcKey = `${activeItem?.type ?? "none"}:${activeItem?.src ?? "none"}`;

  const openModalIfImage = () => {
    if (activeItem?.type === "image" && activeItem?.src) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("photos")}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            tab === "photos"
              ? "border-red-500 bg-red-500/10 text-red-500"
              : "border-white/10 bg-[#1F1F1F] text-white hover:bg-white/5"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Fotos
          <span className="text-xs text-neutral-400">({images.length})</span>
        </button>

        {hasVideos && (
          <button
            onClick={() => setTab("videos")}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              tab === "videos"
                ? "border-red-500 bg-red-500/10 text-red-500"
                : "border-white/10 bg-[#1F1F1F] text-white hover:bg-white/5"
            }`}
          >
            <VideoIcon className="w-4 h-4" />
            Videos
            <span className="text-xs text-neutral-400">({videos.length})</span>
          </button>
        )}

        {hasVideos && (
          <button
            onClick={() => setTab("all")}
            className={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              tab === "all"
                ? "border-red-500 bg-red-500/10 text-red-500"
                : "border-white/10 bg-[#1F1F1F] text-white hover:bg-white/5"
            }`}
          >
            Todo
            <span className="text-xs text-neutral-400">({mediaAll.length})</span>
          </button>
        )}
      </div>

      {/* Main */}
      <div className="relative overflow-hidden rounded-xl bg-[#1F1F1F] border border-white/5">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30">
          {/* overlay suave */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* ✅ Skeleton main */}
          {!mainLoaded && (
            <div className="absolute inset-0 z-20 p-4">
              <Skeleton className="w-full h-full" rounded="rounded-none" />
              {/* shimmer bar sutil */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <style>
                {`
                  @keyframes shimmer {
                    100% { transform: translateX(100%); }
                  }
                `}
              </style>
            </div>
          )}

          {activeItem?.type === "video" ? (
            <video
              key={mainSrcKey}
              className={`object-contain w-full h-full ${
                mainLoaded ? "opacity-100" : "opacity-0"
              }`}
              controls
              playsInline
              preload="metadata"
              src={activeItem.src}
              onLoadedData={() => setMainLoaded(true)}
              onCanPlay={() => setMainLoaded(true)}
            />
          ) : (
            <motion.img
              key={mainSrcKey}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: mainLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={activeItem?.src}
              alt={name}
              className={`object-contain w-full h-full select-none ${
                activeItem?.src ? "cursor-zoom-in" : ""
              }`}
              draggable={false}
              onLoad={() => setMainLoaded(true)}
              onError={() => setMainLoaded(true)} // evita skeleton infinito si falla
              onClick={openModalIfImage}
            />
          )}
        </div>
      </div>

      {/* ✅ Modal fullscreen para imagen */}
      <AnimatePresence>
        {isModalOpen && activeItem?.type === "image" && activeItem?.src && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            {/* Contenido */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute z-10 grid w-10 h-10 transition border rounded-full -top-2 -right-2 sm:top-2 sm:right-2 place-items-center border-white/10 bg-black/60 text-white/90 hover:bg-black/80 hover:text-white"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Imagen grande */}
              <div className="overflow-hidden border rounded-2xl border-white/10 bg-black/40">
                <img
                  src={activeItem.src}
                  alt={name}
                  className="w-full max-h-[85vh] object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* Hint */}
              <div className="mt-3 text-xs text-center text-white/70">
                Presiona <span className="font-semibold">ESC</span> para cerrar
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {media.map((item, idx) => {
          const isActive = idx === active;
          const key = `${item.type}:${item.src}`;

          return (
            <button
              key={`${item.type}-${item.src}-${idx}`}
              onClick={() => setActive(idx)}
              className={`relative overflow-hidden rounded-lg border transition-colors ${
                isActive ? "border-red-500" : "border-white/10 hover:border-white/20"
              } bg-[#1F1F1F]`}
              aria-label={`Seleccionar ${item.type === "video" ? "video" : "foto"} ${idx + 1}`}
            >
              <div className="relative aspect-[4/3]">
                {item.type === "video" ? (
                  <div className="flex items-center justify-center w-full h-full text-neutral-400">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <Play className="w-4 h-4" />
                      Video
                    </span>
                  </div>
                ) : (
                  <>
                    {!thumbLoaded[key] && (
                      <div className="absolute inset-0">
                        <Skeleton className="w-full h-full" rounded="rounded-none" />
                      </div>
                    )}
                    <img
                      src={item.src}
                      alt={`${name} ${idx + 1}`}
                      className={`object-cover w-full h-full ${
                        thumbLoaded[key] ? "opacity-100" : "opacity-0"
                      } transition-opacity`}
                      loading="lazy"
                      onLoad={() => setThumbLoaded((prev) => ({ ...prev, [key]: true }))}
                      onError={() => setThumbLoaded((prev) => ({ ...prev, [key]: true }))}
                    />
                  </>
                )}
              </div>

              {isActive && (
                <div className="absolute inset-0 pointer-events-none ring-2 ring-red-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
