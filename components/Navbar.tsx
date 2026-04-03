'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const cartCount = useCartStore((state) => state.getCartCount());
  const setIsCartOpen = useCartStore((state) => state.setIsOpen);
  const { isAuthenticated, user } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/products?category=all' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900">
            NovaCart.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/account/wishlist" className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href={mounted && isAuthenticated ? '/account' : '/login'}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 p-6 shadow-xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-bold tracking-tighter">NovaCart.</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-gray-900">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-900"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/account/wishlist" className="text-lg font-medium text-gray-900 flex items-center">
                  Wishlist
                </Link>
              </nav>

              <div className="mt-auto pt-6 border-t border-gray-100">
                {mounted && isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <Link href="/account" className="text-xs text-gray-500 hover:text-black">View Account</Link>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="block w-full py-3 px-4 bg-black text-white text-center rounded-md font-medium">
                    Log In / Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
