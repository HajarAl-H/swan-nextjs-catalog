"use client";
import { useCart } from "./CartContext";
export default function CartSidebar() {
  const { state, dispatch, subtotal } = useCart();
  return (
    <aside className={`fixed top-0 right-0 h-full w-80 bg-white border-l shadow-2xl transform transition-transform duration-300 z-30 ${state.isOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!state.isOpen} aria-label="Shopping cart">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={() => dispatch({ type: "CLOSE" })} className="p-2 rounded hover:bg-gray-100" aria-label="Close cart">✕</button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
        {state.items.length === 0 ? (<p className="text-sm text-gray-600">Your cart is empty.</p>) : (
          state.items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border grid place-content-center text-xs text-gray-500">Item</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Qty {item.qty}</p>
              </div>
              <div className="text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</div>
              <button onClick={() => dispatch({ type: "REMOVE", payload: { id: item.id } })} className="text-xs text-red-600 hover:underline">Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <button className="mt-3 w-full rounded-lg bg-black text-white py-2 hover:opacity-90 transition">Checkout</button>
      </div>
    </aside>
  );
}
