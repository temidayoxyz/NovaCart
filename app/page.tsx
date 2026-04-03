'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useProductStore } from '@/lib/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';

import { useState, useEffect } from 'react';

export default function Home() {
  const products = useProductStore((state) => state.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/hero-nova/1920/1080"
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6"
          >
            Elevate Your <br className="hidden md:block" /> Everyday Essentials.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Discover our curated collection of premium products designed for modern living. Quality meets minimalist aesthetics.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/products?category=Clothing" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              View Lookbook
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Truck className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Free Global Shipping</h3>
              <p className="text-sm text-gray-500">On all orders over $150.</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <RotateCcw className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-sm text-gray-500">No questions asked return policy.</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <ShieldCheck className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Secure Checkout</h3>
              <p className="text-sm text-gray-500">100% protected payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-500">Our most sought-after pieces this season.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 md:hidden flex justify-center">
            <Link href="/products" className="px-6 py-3 border border-gray-200 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Clothing', image: 'https://picsum.photos/seed/cat-clothing/800/800' },
              { name: 'Electronics', image: 'https://picsum.photos/seed/cat-tech/800/800' },
              { name: 'Home', image: 'https://picsum.photos/seed/cat-home/800/800' },
            ].map((category) => (
              <Link key={category.name} href={`/products?category=${category.name}`} className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white tracking-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Join the Nova Club</h2>
          <p className="text-gray-400 text-lg mb-10">
            Sign up today and receive 15% off your first order. Plus, get early access to new drops and exclusive sales.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
