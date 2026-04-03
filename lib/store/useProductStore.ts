import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, SAMPLE_PRODUCTS } from '../sample-data';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: SAMPLE_PRODUCTS,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'novacart-products',
    }
  )
);
