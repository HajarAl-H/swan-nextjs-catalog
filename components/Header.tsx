"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
export default function Header() {
  const { totalQty, dispatch } = useCart();
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-xl">Swan Shop</Link>
        <button onClick={() => dispatch({ type: "TOGGLE" })} className="relative rounded-full border px-4 py-2 hover:shadow transition" aria-label="Open cart">
          Cart
          {totalQty > 0 && (<span className="absolute -right-2 -top-2 text-xs bg-black text-white rounded-full w-6 h-6 grid place-content-center animate-pulse">{totalQty}</span>)}
        </button>
      </div>
    </header>
  );
}
