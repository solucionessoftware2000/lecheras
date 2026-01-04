import { useState, useEffect } from 'react';
import { Listing } from '../types';
const MOCK_LISTINGS: Listing[] = [{
  id: '1',
  name: 'Bella',
  breed: 'Holstein',
  age: 3,
  price: 2500,
  image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?q=80&w=1921&auto=format&fit=crop', 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop'],
  description: 'Bella is a high-producing Holstein with an excellent pedigree. She is calm, easy to handle, and produces an average of 35 liters per day. Perfect for small to medium dairy operations looking for reliable production.',
  seller: {
    name: 'Green Pastures Farm',
    location: 'Wisconsin, USA'
  },
  liked: false,
  milkProduction: '35L/day'
}, {
  id: '2',
  name: 'Luna',
  breed: 'Jersey',
  age: 2,
  price: 1800,
  image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop', 'https://images.unsplash.com/photo-1545468860-71b95149235e?q=80&w=2069&auto=format&fit=crop'],
  description: 'Luna is a beautiful Jersey heifer with high butterfat content milk. She is young, energetic, and comes from a lineage of award-winning Jerseys. Ideal for artisanal cheese makers.',
  seller: {
    name: 'Valley View Dairy',
    location: 'Vermont, USA'
  },
  liked: true,
  milkProduction: '22L/day'
}, {
  id: '3',
  name: 'Daisy',
  breed: 'Guernsey',
  age: 4,
  price: 2100,
  image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop', 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop'],
  description: 'Daisy produces the famous Golden Guernsey milk. She is a hardy cow, adaptable to various climates, and has a very docile temperament. Recently vetted and in perfect health.',
  seller: {
    name: 'Golden Milk Co.',
    location: 'Ohio, USA'
  },
  liked: false,
  milkProduction: '28L/day'
}, {
  id: '4',
  name: 'Rosie',
  breed: 'Ayrshire',
  age: 3,
  price: 2300,
  image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?q=80&w=1921&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?q=80&w=1921&auto=format&fit=crop', 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop'],
  description: 'Rosie is a robust Ayrshire known for longevity and health. She grazes well and converts grass efficiently. A great addition to any pasture-based dairy system.',
  seller: {
    name: 'Highland Farms',
    location: 'Scotland, UK'
  },
  liked: false,
  milkProduction: '30L/day'
}, {
  id: '5',
  name: 'Molly',
  breed: 'Brown Swiss',
  age: 5,
  price: 2800,
  image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop'],
  description: 'Molly is a powerhouse Brown Swiss with exceptional protein-to-fat ratio. She is large, strong, and has excellent feet and legs. Proven producer with 3 successful lactations.',
  seller: {
    name: 'Alpine Dairy',
    location: 'Switzerland'
  },
  liked: true,
  milkProduction: '32L/day'
}, {
  id: '6',
  name: 'Bessie',
  breed: 'Holstein',
  age: 2,
  price: 2600,
  image: 'https://images.unsplash.com/photo-1545468860-71b95149235e?q=80&w=2069&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1545468860-71b95149235e?q=80&w=2069&auto=format&fit=crop', 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop'],
  description: 'Bessie is a promising young Holstein heifer ready for her first calf. She shows great potential for high volume production and has a very friendly disposition.',
  seller: {
    name: 'Midwest Dairy',
    location: 'Iowa, USA'
  },
  liked: false,
  milkProduction: 'Pending'
}];
export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const toggleLike = (id: string) => {
    setListings(prev => prev.map(item => item.id === id ? {
      ...item,
      liked: !item.liked
    } : item));
  };
  const addListing = (newListing: Omit<Listing, 'id' | 'liked'>) => {
    const listing: Listing = {
      ...newListing,
      id: Math.random().toString(36).substr(2, 9),
      liked: false
    };
    setListings(prev => [listing, ...prev]);
  };
  const getListing = (id: string) => {
    return listings.find(l => l.id === id) || MOCK_LISTINGS.find(l => l.id === id);
  };
  return {
    listings,
    loading,
    toggleLike,
    addListing,
    getListing
  };
}