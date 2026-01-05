
import { motion } from 'framer-motion';
export function SkeletonCard() {
  return <div className="relative overflow-hidden rounded-xl bg-[#1F1F1F] p-4 shadow-lg border border-white/5">
      {/* Image Skeleton */}
      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-800">
        <motion.div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{
        translateX: ['100%']
      }} transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }} />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 w-1/2 rounded bg-neutral-800" />
          <div className="h-6 w-1/4 rounded bg-neutral-800" />
        </div>
        <div className="h-4 w-1/3 rounded bg-neutral-800" />
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
          <div className="h-4 w-1/4 rounded bg-neutral-800" />
          <div className="h-8 w-8 rounded-full bg-neutral-800" />
        </div>
      </div>
    </div>;
}