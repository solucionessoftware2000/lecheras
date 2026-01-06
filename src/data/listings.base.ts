// src/data/listings.base.ts
import { Listing } from "../types";

export type BaseListing = Omit<Listing, "image" | "images" | "videos">;

export const BASE_LISTINGS: BaseListing[] = [
  {
    id: "1",
    name: "Valeria",
    age: 20,
    price: 250,
    description:
      "Perfil verificado. Atención con agenda previa. Trato amable y discreto. Se prioriza higiene y respeto.",
    measurements: { waist: 62, height: 165, hips: 92, bust: 88 },
    stats: { views: 18240, messages: 327 },
    locations: ["Lince"],
    contact: {
      phone: "51936615158",
      whatsapp: "51936615158",
      telegram: "https://t.me/itapp_demo",
    },
    liked: false,
  },
  // ... los demás tal cual (pero SIN image/images/videos)
];
