import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../sample-data';

export interface CartItem {
  id: string; // unique id for the cart item (product id + variants)
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity: number, selectedVariants: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity, selectedVariants) => {
        const variantKey = Object.entries(selectedVariants)
          .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .map(([key, value]) => `${key}:${value}`)
          .join('|');
        
        const cartItemId = `${product.id}-${variantKey}`;

        set((state) => {
          const existingItem = state.items.find((item) => item.id === cartItemId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { id: cartItemId, product, quantity, selectedVariants }],
            isOpen: true,
          };
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'novacart-cart',
    }
  )
);
