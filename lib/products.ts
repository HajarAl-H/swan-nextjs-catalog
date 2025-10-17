import productsData from "@/data/products.json";

export type Product = { id: string; name: string; price: number; category: string; description: string; images: string[]; };

export function getAllProducts(): Product[] { return productsData as Product[]; }
export function getProductById(id: string): Product | undefined { return getAllProducts().find(p => p.id === id); }
export function getCategories(): string[] { return Array.from(new Set(getAllProducts().map(p => p.category))).sort(); }
