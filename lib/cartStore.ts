import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // unique key e.g. "b1-pack6"
  productId: string;
  name: string;
  packSize: string; // "Pack of 6" | "Pack of 16" | "Tin"
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      setCartOpen: (open) => set({ isCartOpen: open }),

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.findIndex((i) => i.id === newItem.id);
          if (existing > -1) {
            const updated = [...state.items];
            updated[existing].quantity += 1;
            return { items: updated };
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, delta) =>
        set((state) => {
          const updated = state.items
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
            .filter((i) => i.quantity > 0);
          return { items: updated };
        }),

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "frovora-cart-v2",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
