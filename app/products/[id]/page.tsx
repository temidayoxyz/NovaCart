'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProductStore } from '@/lib/store/useProductStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { Product } from '@/lib/sample-data';
import { Star, Minus, Plus, Heart, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const getProduct = useProductStore((state) => state.getProduct);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const product = getProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (product && product.variants && Object.keys(selectedVariants).length === 0) {
      const defaults: Record<string, string> = {};
      product.variants.forEach((v) => {
        defaults[v.name] = v.options[0];
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedVariants(defaults);
    }
  }, [product, selectedVariants]);

  if (!mounted) return null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/products" className="text-black underline underline-offset-4">
          Back to products
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    toast.success('Added to cart', {
      description: `${quantity}x ${product.title}`,
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <button onClick={() => router.back()} className="hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span>/</span>
        <Link href="/products" className="hover:text-black">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-black">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <Image src={img} alt={`${product.title} thumbnail ${idx + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="relative flex-1 aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through mb-0.5">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && product.variants.map((variant) => (
            <div key={variant.id} className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900">{variant.name}</span>
                <span className="text-sm text-gray-500">{selectedVariants[variant.name]}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {variant.options.map((option) => {
                  const isSelected = selectedVariants[variant.name] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: option })}
                      className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-8">
            {/* Quantity */}
            <div className="flex items-center border border-gray-200 rounded-md h-14 w-full sm:w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex-1 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className="flex-1 bg-black text-white h-14 rounded-md font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={() => toggleItem(product.id)}
              className={`h-14 w-14 flex items-center justify-center border rounded-md transition-colors ${
                isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Free shipping over $150</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
