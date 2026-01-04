import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface ImageGalleryProps {
  images: string[];
  name: string;
}
export function ImageGallery({
  images,
  name
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#1F1F1F] border border-white/5">
        <AnimatePresence mode="wait">
          <motion.img key={selectedIndex} src={images[selectedIndex]} alt={`${name} view ${selectedIndex + 1}`} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="h-full w-full object-cover" />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => <button key={index} onClick={() => setSelectedIndex(index)} className={`relative aspect-square overflow-hidden rounded-lg transition-all ${selectedIndex === index ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#171717]' : 'opacity-60 hover:opacity-100'}`}>
            <img src={image} alt={`${name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
          </button>)}
      </div>
    </div>;
}