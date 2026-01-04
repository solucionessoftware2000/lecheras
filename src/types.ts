export interface Listing {
  id: string;
  name: string;
  breed: string;
  age: number;
  price: number;
  image: string;
  images: string[];
  description: string;
  seller: {
    name: string;
    location: string;
  };
  liked: boolean;
  milkProduction?: string; // Liters per day
}
export type SortOption = 'price-asc' | 'price-desc' | 'newest';