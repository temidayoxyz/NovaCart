'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900">
              NovaCart.
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Elevating everyday essentials with premium materials and mindful design. 
              A modern approach to e-commerce.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Clothing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Clothing</Link></li>
              <li><Link href="/products?category=Electronics" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=Home" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home & Living</Link></li>
              <li><Link href="/products?category=Accessories" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Stay in the loop</h4>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border border-gray-200 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} NovaCart. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
