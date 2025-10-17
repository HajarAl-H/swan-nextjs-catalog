"use client";
import { useMemo, useState } from "react";
import { getAllProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
export default function HomePage() {
  const allProducts = getAllProducts();
  const categories = getCategories();
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(() => active === "All" ? allProducts : allProducts.filter(p => p.category === active), [active, allProducts]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <FilterBar categories={categories} active={active} onChange={setActive} />
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (<ProductCard key={p.id} product={p} />))}
      </div>
    </div>
  );
}
