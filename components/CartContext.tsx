"use client";
import { createContext, useContext, useReducer, ReactNode, useMemo } from "react";

type CartItem = { id: string; name: string; price: number; qty: number };
type State = { items: CartItem[]; isOpen: boolean };
type Action =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "TOGGLE" } | { type: "OPEN" } | { type: "CLOSE" } | { type: "CLEAR" };

const CartContext = createContext<{ state: State; dispatch: React.Dispatch<Action>; totalQty: number; subtotal: number } | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + action.payload.qty } : i) : [...state.items, action.payload];
      return { ...state, items, isOpen: true };
    }
    case "REMOVE": return { ...state, items: state.items.filter(i => i.id != action.payload.id) };
    case "TOGGLE": return { ...state, isOpen: !state.isOpen };
    case "OPEN": return { ...state, isOpen: true };
    case "CLOSE": return { ...state, isOpen: false };
    case "CLEAR": return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });
  const totalQty = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.qty * i.price, 0), [state.items]);
  const value = useMemo(() => ({ state, dispatch, totalQty, subtotal }), [state, dispatch, totalQty, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const ctx = useContext(CartContext); if (!ctx) throw new Error("useCart must be used within CartProvider"); return ctx; }
