// src/data/media.local.ts
export type ListingMedia = {
  cover: string; // archivo dentro de la carpeta del id
  images: string[];
  videos?: string[];
};

export async function loadListingMediaLocal(id: string): Promise<{
  image: string;
  images: string[];
  videos?: string[];
}> {
  // Intenta leer /public/listings/<id>/media.json
  const res = await fetch(`/listings/${id}/media.json`, { cache: "no-store" });

  // Si no existe media.json, fallback para no romper
  if (!res.ok) {
    return {
      image: `/listings/${id}/cover.jpg`,
      images: [],
      videos: [],
    };
  }

  const json = (await res.json()) as ListingMedia;

  return {
    image: `/listings/${id}/${json.cover}`,
    images: (json.images ?? []).map((f) => `/listings/${id}/${f}`),
    videos: (json.videos ?? []).map((f) => `/listings/${id}/${f}`),
  };
}
