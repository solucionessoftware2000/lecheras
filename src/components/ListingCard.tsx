import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Listing } from '../types';
interface ListingCardProps {
  listing: Listing;
  onToggleLike: (id: string) => void;
}
export function ListingCard({
  listing,
  onToggleLike
}: ListingCardProps) {
  return <Link to={`/listing/${listing.id}`} className="block">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} whileHover={{
      y: -8,
      scale: 1.02
    }} transition={{
      type: 'spring',
      stiffness: 300,
      damping: 20
    }} className="group relative flex flex-col overflow-hidden rounded-xl bg-[#1F1F1F] shadow-lg shadow-black/20 border border-white/5 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-transparent opacity-60 z-10" />
          <motion.img whileHover={{
          scale: 1.1
        }} transition={{
          duration: 0.6
        }} src={listing.image} alt={listing.name} className="h-full w-full object-cover" />

          {/* Price Tag */}
          <div className="absolute top-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-sm font-semibold text-white border border-white/10">
            ${listing.price.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                {listing.name}
              </h3>
              <p className="text-sm text-neutral-400">
                {listing.breed} • {listing.age} years
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5" />
              {listing.seller.location}
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-red-500 transition-colors">
                View Details
                <ArrowRight className="h-4 w-4" />
              </div>

              <motion.button whileTap={{
              scale: 0.8
            }} onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onToggleLike(listing.id);
            }} className={`rounded-full p-2 transition-colors ${listing.liked ? 'bg-red-500/10 text-red-500' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'}`}>
                <Heart className={`h-5 w-5 ${listing.liked ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>;
}