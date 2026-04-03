'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useProductStore } from '@/lib/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

function ProductsContent() {
  const products = useProductStore((state) => state.products);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCategory = searchParams.get('category') || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['all', 'Clothing', 'Electronics', 'Home', 'Accessories'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Mocking newest by ID for now
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without full reload
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {selectedCategory === 'all' ? 'All Products' : selectedCategory}
        </h1>
        <p className="text-gray-500">
          Showing {filteredAndSortedProducts.length} results
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        {/* Search */}
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-black focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden flex items-center gap-2 text-sm font-medium text-gray-700"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort */}
          <div className="relative flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline-block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent pr-8 py-2 text-sm font-medium text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`text-sm ${
                        selectedCategory === category
                          ? 'font-medium text-black'
                          : 'text-gray-500 hover:text-gray-900'
                      } transition-colors capitalize`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Add more filters here like Price Range, Colors if needed */}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
                className="mt-6 text-black font-medium underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-24 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
