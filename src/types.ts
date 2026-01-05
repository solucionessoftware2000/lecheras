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

  contact: {
    phone: string;
    whatsapp: string;
    telegram: string; // URL: https://t.me/usuario
  };

  liked: boolean;
}

export type SortOption = "price-asc" | "price-desc" | "newest";

/** ✅ Nuevo: items para el marketplace (listings + cards de anuncio) */
export type MarketplaceItem =
  | { kind: "listing"; listing: Listing }
  | { kind: "ad"; id: string };
