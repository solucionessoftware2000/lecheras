export interface Listing {
  id: string;
  name: string;
  age: number;

  // Mantengo price porque tu UI actual lo muestra en el card (tag arriba a la derecha)
  price: number;

  // Para el card (cover)
  image: string;

  // Galería
  images: string[];
  videos?: string[]; // URLs mp4/webm, etc.

  description: string;

  // Nuevas secciones
  measurements: {
    waist: number; // cintura
    height: number; // estatura
    hips: number; // caderas
    bust: number; // busto
  };

  stats: {
    views: number; // la vieron
    messages: number; // escribieron
  };

  locations: string[]; // lugares de atención

  liked: boolean;
}

export type SortOption = "price-asc" | "price-desc" | "newest";
