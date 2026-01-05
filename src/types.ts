export interface Listing {
  id: string;
  name: string;
  age: number;

  price: number;

  image: string;
  images: string[];
  videos?: string[];

  description: string;

  measurements: {
    waist: number;
    height: number;
    hips: number;
    bust: number;
  };

  stats: {
    views: number;
    messages: number;
  };

  locations: string[];

  // ✅ NUEVO: contactos
  contact: {
    phone: string; // formato: 51936615158 (o con +51, igual lo normalizamos)
    whatsapp: string; // formato: 51936615158
    telegram: string; // URL: https://t.me/usuario  (recomendado)
  };

  liked: boolean;
}

export type SortOption = "price-asc" | "price-desc" | "newest";
