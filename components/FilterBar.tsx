"use client";
export default function FilterBar({ categories, active, onChange }: { categories: string[]; active: string; onChange: (cat: string) => void; }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["All", ...categories].map((cat) => {
        const selected = active === cat;
        return (
          <button key={cat} onClick={() => onChange(cat)} className={`px-3 py-1 rounded-full border text-sm transition ${selected ? "bg-black text-white" : "hover:bg-gray-50"}`}>
            {cat}
          </button>
        );
      })}
    </div>
  );
}
