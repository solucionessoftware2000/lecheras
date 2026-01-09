// src/data/listings.base.ts
import { Listing } from "../types";

export type BaseListing = Omit<Listing, "image" | "images" | "videos">;

export const BASE_LISTINGS: BaseListing[] = [
  {
    id: "1",
    name: "Elisa",
    age: 20,
    price: 200,
    description:
      "Hola, es un placer conocerte, mi nombre es Elisa soy una escort educada, con bello rostro y cuerpo de sexy que sera tu vicio. Disfrutemos juntos un momento de placer y buena compañia, tengo un derrier bien paradito, cintura estrecha, bonitos pechos, movimientos ardientes y un caracter dulce que te cautivará.",
    measurements: { waist: 60, height: 165, hips: 60, bust: 34 },
    stats: { views: 18240, messages: 327 },
    locations: ["Lince"],
    contact: {
      phone: "51947356451",
      whatsapp: "51947356451",
      telegram: "https://t.me/valeria",
    },
    liked: false,
  },
  // ... los demás tal cual (pero SIN image/images/videos)
];
