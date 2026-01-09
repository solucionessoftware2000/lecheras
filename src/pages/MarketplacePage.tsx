import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useListings } from "../hooks/useListings";
import { ListingCard } from "../components/ListingCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { SortOption, MarketplaceItem } from "../types";

export function MarketplacePage() {
  const { marketplaceItems, loading, toggleLike } = useListings();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // ✅ Unificamos: "Todo" como default real
  const [selectedBreed, setSelectedBreed] = useState<string>("Todo");

  // 1) Solo listings reales (para filtros/sort)
  const listingItems = useMemo(
    () => marketplaceItems.filter((it) => it.kind === "listing") as Extract<
      MarketplaceItem,
      { kind: "listing" }
    >[],
    [marketplaceItems]
  );

  // 2) Breeds (si tu listing tiene breed)
  const breeds = useMemo(() => {
    // Si tu Listing NO tiene breed, comenta todo este bloque y el select.
    const allBreeds = listingItems
      .map((x) => (x.listing as any).breed)
      .filter(Boolean) as string[];

    return ["Todo", ...Array.from(new Set(allBreeds))];
  }, [listingItems]);

  // 3) Filter + sort SOLO sobre listings
  const filteredListingItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return listingItems
      .filter(({ listing }) => {
        const breed = ((listing as any).breed ?? "").toString();

        const matchBreed =
          selectedBreed === "Todo" || breed === selectedBreed;

        const matchQuery =
          listing.name.toLowerCase().includes(q) ||
          breed.toLowerCase().includes(q);

        return matchBreed && matchQuery;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.listing.price - b.listing.price;
        if (sortOption === "price-desc") return b.listing.price - a.listing.price;
        return 0; // newest mock
      });
  }, [listingItems, searchQuery, selectedBreed, sortOption]);

  // 4) Convertimos a MarketplaceItem y rellenamos con Ads (para completar el grid)
  const finalItems: MarketplaceItem[] = useMemo(() => {
    const MIN_CARDS = 6;

    const base: MarketplaceItem[] = filteredListingItems.map((x) => ({
      kind: "listing",
      listing: x.listing,
    }));

    const missing = Math.max(0, MIN_CARDS - base.length);
    const ads: MarketplaceItem[] = Array.from({ length: missing }, (_, i) => ({
      kind: "ad",
      id: `ad-${i + 1}`,
    }));

    return [...base, ...ads];
  }, [filteredListingItems]);

  return (
    <div className="min-h-screen bg-[#171717] pb-20 pt-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            Escorts y <span className="text-red-500">Kinesiologas</span> vips de lima
          </motion.h1>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Busca por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          <div className="flex gap-4 pb-2 overflow-x-auto md:pb-0">
            {/* ✅ Breed filter (si tu Listing tiene breed) */}
            <div className="relative">
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="appearance-none rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-4 pr-10 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-neutral-500" />
            </div>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-4 pr-10 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="newest">Nuevo Listado</option>
                <option value="price-asc">Precio: Bajo a Alto</option>
                <option value="price-desc">Precio: Alto a Bajo</option>
              </select>
              <Filter className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-neutral-500" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : finalItems.length > 0 ? (
            finalItems.map((item) => (
              <ListingCard
                key={item.kind === "listing" ? item.listing.id : item.id}
                item={item}
                onToggleLike={toggleLike}
              />
            ))
          ) : (
            <div className="py-20 text-center col-span-full">
              <p className="text-xl text-neutral-400">
                No listings found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBreed("Todo");
                }}
                className="mt-4 font-medium text-red-500 hover:text-red-400"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
