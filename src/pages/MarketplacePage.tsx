import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { ListingCard } from '../components/ListingCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SortOption } from '../types';
export function MarketplacePage() {
  const {
    listings,
    loading,
    toggleLike
  } = useListings();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const filteredListings = listings.filter(listing => (selectedBreed === 'All' || listing.breed === selectedBreed) && (listing.name.toLowerCase().includes(searchQuery.toLowerCase()) || listing.breed.toLowerCase().includes(searchQuery.toLowerCase()))).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0; // Mock newest sort
  });
  const breeds = ['All', ...Array.from(new Set(listings.map(l => l.breed)))];
  return <div className="min-h-screen bg-[#171717] pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h1 initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Premium Dairy <span className="text-red-500">Selection</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.1
        }} className="mx-auto max-w-2xl text-lg text-neutral-400">
            Discover elite genetics and high-producing dairy cattle from top
            breeders worldwide.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input type="text" placeholder="Search by name or breed..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all" />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
            <div className="relative">
              <select value={selectedBreed} onChange={e => setSelectedBreed(e.target.value)} className="appearance-none rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-4 pr-10 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                {breeds.map(breed => <option key={breed} value={breed}>
                    {breed}
                  </option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select value={sortOption} onChange={e => setSortOption(e.target.value as SortOption)} className="appearance-none rounded-xl border border-white/10 bg-[#1F1F1F] py-3 pl-4 pr-10 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="newest">Newest Listed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? Array.from({
          length: 6
        }).map((_, i) => <SkeletonCard key={i} />) : filteredListings.length > 0 ? filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} onToggleLike={toggleLike} />) : <div className="col-span-full py-20 text-center">
              <p className="text-xl text-neutral-400">
                No listings found matching your criteria.
              </p>
              <button onClick={() => {
            setSearchQuery('');
            setSelectedBreed('All');
          }} className="mt-4 text-red-500 hover:text-red-400 font-medium">
                Clear filters
              </button>
            </div>}
        </div>
      </div>
    </div>;
}