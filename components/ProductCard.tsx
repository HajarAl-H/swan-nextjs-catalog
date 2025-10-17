"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <div className="group border rounded-2xl overflow-hidden hover:shadow-lg transition relative">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-56">
          <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </Link>
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500">{product.category}</p>
        <div className="pt-2">
          <button onClick={() => dispatch({ type: "ADD", payload: { id: product.id, name: product.name, price: product.price, qty: 1 } })} className="w-full rounded-lg border py-2 hover:bg-gray-50 transition group-hover:translate-y-[-1px]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
