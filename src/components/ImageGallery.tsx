import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

type Props = {
  name: string;
  images: string[];
  videos?: string[];
};

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export function ImageGallery({ images, videos = [], name }: Props) {
  const hasVideos = videos.length > 0;

  const mediaAll = useMemo<MediaItem[]>(() => {
    const imgs: MediaItem[] = images.map((src) => ({ type: "image", src }));
    const vids: MediaItem[] = videos.map((src) => ({ type: "video", src }));
    return [...imgs, ...vids];
  }, [images, videos]);

  const [tab, setTab] = useState<"photos" | "videos" | "all">(hasVideos ? "all" : "photos");

  const media = useMemo<MediaItem[]>(() => {
    if (tab === "photos") return images.map((src) => ({ type: "image", src }));
    if (tab === "videos") return videos.map((src) => ({ type: "video", src }));
    return mediaAll;
  }, [tab, images, videos, mediaAll]);

  const [active, setActive] = useState(0);
  const activeItem = media[active] ?? media[0];

  // Si cambias tab y el index queda fuera
  React.useEffect(() => {
    setActive(0);
  }, [tab]);

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
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {activeItem?.type === "video" ? (
            <video
              className="object-cover w-full h-full"
              controls
              playsInline
              preload="metadata"
              src={activeItem.src}
            />
          ) : (
            <motion.img
              key={activeItem?.src}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={activeItem?.src}
              alt={name}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {media.map((item, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={`${item.type}-${item.src}-${idx}`}
              onClick={() => setActive(idx)}
              className={`relative overflow-hidden rounded-lg border transition-colors ${
                isActive ? "border-red-500" : "border-white/10 hover:border-white/20"
              } bg-[#1F1F1F]`}
              aria-label={`Seleccionar ${item.type === "video" ? "video" : "foto"} ${idx + 1}`}
            >
              <div className="aspect-[4/3]">
                {item.type === "video" ? (
                  <div className="flex items-center justify-center w-full h-full text-neutral-400">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <Play className="w-4 h-4" />
                      Video
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={`${name} ${idx + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
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
