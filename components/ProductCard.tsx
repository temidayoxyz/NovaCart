import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/sample-data';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useState, useEffect } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted ? isInWishlist(product.id) : false;

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.title} alternate view`}
              fill
              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.compareAtPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
              Sale
            </span>
          )}
          {product.inventory < 20 && product.inventory > 0 && (
            <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product.id);
          }}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1">
            {product.title}
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="mt-auto flex items-center gap-2">
          <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
