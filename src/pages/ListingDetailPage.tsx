import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Share2, ShieldCheck, Truck, Heart } from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { ImageGallery } from '../components/ImageGallery';
import { Listing } from '../types';
export function ListingDetailPage() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    getListing,
    toggleLike
  } = useListings();
  const [listing, setListing] = useState<Listing | undefined>(undefined);
  useEffect(() => {
    if (id) {
      const found = getListing(id);
      setListing(found);
    }
  }, [id, getListing]);
  if (!listing) {
    return <div className="flex min-h-screen items-center justify-center bg-[#171717] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>;
  }
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="min-h-screen bg-[#171717] pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Gallery */}
          <div>
            <ImageGallery images={listing.images} name={listing.name} />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {listing.name}
                </h1>
                <div className="flex items-center gap-4 text-neutral-400">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
                    {listing.breed}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    {listing.seller.location}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  ${listing.price.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-500">plus shipping</div>
              </div>
            </div>

            <div className="mb-8 rounded-xl bg-[#1F1F1F] p-6 border border-white/5">
              <h2 className="mb-4 text-lg font-semibold text-white">
                About {listing.name}
              </h2>
              <p className="leading-relaxed text-neutral-400 mb-6">
                {listing.description}
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                  <div className="text-sm text-neutral-500">Age</div>
                  <div className="font-medium text-white">
                    {listing.age} years
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Production</div>
                  <div className="font-medium text-white">
                    {listing.milkProduction || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Seller</div>
                  <div className="font-medium text-white">
                    {listing.seller.name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">ID</div>
                  <div className="font-medium text-white">#{listing.id}</div>
                </div>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#1F1F1F] p-4">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <div>
                  <div className="font-medium text-white">Vet Checked</div>
                  <div className="text-xs text-neutral-500">
                    Health certified
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#1F1F1F] p-4">
                <Truck className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-medium text-white">Transport</div>
                  <div className="text-xs text-neutral-500">
                    Available worldwide
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-4">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="flex-1 rounded-xl bg-red-600 py-4 text-center font-bold text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-red-500">
                Contact Seller
              </motion.button>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => toggleLike(listing.id)} className={`flex items-center justify-center rounded-xl border px-6 transition-colors ${listing.liked ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/10 bg-[#1F1F1F] text-white hover:bg-white/5'}`}>
                <Heart className={`h-6 w-6 ${listing.liked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="flex items-center justify-center rounded-xl border border-white/10 bg-[#1F1F1F] px-6 text-white hover:bg-white/5">
                <Share2 className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
}