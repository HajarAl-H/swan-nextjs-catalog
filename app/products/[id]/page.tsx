"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { getProductById } from "@/lib/products";
export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const { dispatch } = useCart();
  if (!product) {
    return (<div className="space-y-4"><p>Product not found.</p><Link href="/" className="underline">Go back</Link></div>);
  }
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        {product.images.map((src, idx) => (
          <div key={idx} className="relative w-full h-72 md:h-80 rounded-xl overflow-hidden border">
            <Image src={src} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Link href="/" className="text-sm text-gray-500 hover:underline">← Back to products</Link>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>
        <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
        <button onClick={() => dispatch({ type: "ADD", payload: { id: product.id, name: product.name, price: product.price, qty: 1 } })} className="rounded-xl bg-black text-white px-6 py-3 hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
