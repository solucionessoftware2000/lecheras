// src/hooks/useListings.ts
import { useEffect, useMemo, useState } from "react";
import { Listing, MarketplaceItem } from "../types";
import { BASE_LISTINGS } from "../data/listings.base";
import { loadListingMediaLocal } from "../data/media.local";

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);

      // Simula “latencia” como tu timeout
      await new Promise((r) => setTimeout(r, 900));

      const withMedia: Listing[] = await Promise.all(
        BASE_LISTINGS.map(async (l) => {
          const media = await loadListingMediaLocal(l.id);

          return {
            ...l,
            image: media.image,
            images: media.images,
            videos: media.videos ?? [],
          };
        })
      );

      if (alive) {
        setListings(withMedia);
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
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
    return (
      listings.find((l) => l.id === id) ||
      // fallback por si recargas y aún está loading:
      (() => {
        const base = BASE_LISTINGS.find((l) => l.id === id);
        if (!base) return undefined;

        // fallback “mínimo” sin esperar fetch
        return {
          ...base,
          image: `/listings/${id}/cover.jpg`,
          images: [],
          videos: [],
        } as Listing;
      })()
    );
  };

  /** ✅ Marketplace con “relleno” de ads */
  const marketplaceItems = useMemo<MarketplaceItem[]>(() => {
    const MIN_CARDS = 6;
    const base: MarketplaceItem[] = listings.map((l) => ({
      kind: "listing",
      listing: l,
    }));

    const missing = Math.max(0, MIN_CARDS - base.length);
    const ads: MarketplaceItem[] = Array.from({ length: missing }, (_, i) => ({
      kind: "ad",
      id: `ad-${i + 1}`,
    }));

    return [...base, ...ads];
  }, [listings]);

  return {
    listings,
    marketplaceItems,
    loading,
    toggleLike,
    addListing,
    getListing,
  };
}
