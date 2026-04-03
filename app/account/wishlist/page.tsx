'use client';

import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useProductStore } from '@/lib/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const { products } = useProductStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistedProducts = products.filter((p) => items.includes(p.id));

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <button onClick={() => router.back()} className="hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="mb-12 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-2xl">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist to review them later.</p>
          <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-900 transition-colors">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
