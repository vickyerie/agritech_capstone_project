// Curated high-resolution agricultural crop imagery for modern Agri-Tech UI

export const CROP_IMAGES = {
  wheat: "https://plus.unsplash.com/premium_photo-1661963447711-27f892ffe292?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  rice: "https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  maize: "https://images.unsplash.com/photo-1723645013435-c3c8948faf59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  corn: "https://images.unsplash.com/photo-1723645013435-c3c8948faf59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D0",
  soybean: "https://plus.unsplash.com/premium_photo-1661815122098-ba94514e46e7?q=80&w=1131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  sugarcane: "https://img.magnific.com/free-photo/path-cornfield-countryside_181624-47949.jpg?semt=ais_hybrid&w=740&q=80",
  potato: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  default: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
};

export const getCropImage = (cropIdOrName) => {
  if (!cropIdOrName) return CROP_IMAGES.default;
  const key = String(cropIdOrName).toLowerCase().trim();
  if (CROP_IMAGES[key]) return CROP_IMAGES[key];
  for (const [k, url] of Object.entries(CROP_IMAGES)) {
    if (key.includes(k)) return url;
  }
  return CROP_IMAGES.default;
};
