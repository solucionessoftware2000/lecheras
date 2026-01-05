import { useEffect, useMemo, useState } from "react";
import { Listing, MarketplaceItem } from "../types";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    name: "Valeria",
    age: 23,
    price: 250,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975958225-8d3a4f7f1a2b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975681889-b3b6f1b1d0f7?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
    description:
      "Perfil verificado. Atención con agenda previa. Trato amable y discreto. Se prioriza higiene y respeto.",
    measurements: { waist: 62, height: 168, hips: 92, bust: 88 },
    stats: { views: 18240, messages: 327 },
    locations: ["Miraflores", "San Isidro", "Surco"],
    contact: {
      phone: "51936615158",
      whatsapp: "51936615158",
      telegram: "https://t.me/itapp_demo",
    },
    liked: false,
  },
  // ... (los demás tal cual los tienes)
];

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id: string) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
    );
  };

  const addListing = (newListing: Omit<Listing, "id" | "liked">) => {
    const listing: Listing = {
      ...newListing,
      id: Math.random().toString(36).slice(2, 11),
      liked: false,
    };
    setListings((prev) => [listing, ...prev]);
  };

  const getListing = (id: string) => {
    return listings.find((l) => l.id === id) || MOCK_LISTINGS.find((l) => l.id === id);
  };

  /** ✅ Marketplace con “relleno” de ads */
  const marketplaceItems = useMemo<MarketplaceItem[]>(() => {
    const MIN_CARDS = 6; // <- cambia esto si quieres 9, 12, etc.
    const base: MarketplaceItem[] = listings.map((l) => ({ kind: "listing", listing: l }));

    const missing = Math.max(0, MIN_CARDS - base.length);
    const ads: MarketplaceItem[] = Array.from({ length: missing }, (_, i) => ({
      kind: "ad",
      id: `ad-${i + 1}`,
    }));

    return [...base, ...ads];
  }, [listings]);

  return {
    listings,
    marketplaceItems, // ✅ usa esto en la home para renderizar cards
    loading,
    toggleLike,
    addListing,
    getListing,
  };
}
