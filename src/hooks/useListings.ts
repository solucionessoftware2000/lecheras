import { useEffect, useState } from "react";
import { Listing } from "../types";

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
    liked: false,
  },
  {
    id: "2",
    name: "Camila",
    age: 25,
    price: 300,
    image:
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975732131-14f1e6b8a5b2?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: [],
    description:
      "Atención solo adultos. Agenda previa. No llamadas ocultas. Experiencia premium y puntualidad.",
    measurements: { waist: 64, height: 170, hips: 94, bust: 90 },
    stats: { views: 9801, messages: 214 },
    locations: ["Barranco", "Miraflores"],
    liked: true,
  },
  {
    id: "4",
    name: "Sofía",
    age: 24,
    price: 280,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: [],
    description:
      "Atención con reserva. Puntualidad y discreción. Solo mayores de edad.",
    measurements: { waist: 63, height: 167, hips: 93, bust: 89 },
    stats: { views: 20110, messages: 401 },
    locations: ["San Borja", "Surco"],
    liked: false,
  },
  {
    id: "8",
    name: "Martina",
    age: 23,
    price: 240,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: [],
    description:
      "Atención con coordinación. Ambiente cómodo. Solo mayores de edad.",
    measurements: { waist: 61, height: 166, hips: 91, bust: 87 },
    stats: { views: 11220, messages: 198 },
    locations: ["La Molina", "Surco"],
    liked: true,
  },
  {
    id: "9",
    name: "Paula",
    age: 28,
    price: 380,
    image:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
    description:
      "Experiencia exclusiva. Atención solo con reserva. Discreción total.",
    measurements: { waist: 67, height: 173, hips: 98, bust: 94 },
    stats: { views: 23045, messages: 522 },
    locations: ["San Isidro", "Surquillo", "Miraflores"],
    liked: false,
  },
  {
    id: "10",
    name: "Isabella",
    age: 22,
    price: 210,
    image:
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975681889-b3b6f1b1d0f7?q=80&w=1600&auto=format&fit=crop",
    ],
    videos: [],
    description:
      "Atención tranquila y discreta. Coordinación previa. Zonas seguras.",
    measurements: { waist: 60, height: 163, hips: 90, bust: 86 },
    stats: { views: 7604, messages: 102 },
    locations: ["Breña", "Cercado de Lima"],
    liked: false,
  }
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

  return {
    listings,
    loading,
    toggleLike,
    addListing,
    getListing,
  };
}
