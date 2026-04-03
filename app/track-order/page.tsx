'use client';

import { useState } from 'react';
import { Package, Search, ArrowRight } from 'lucide-react';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { format } from 'date-fns';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [error, setError] = useState('');

  const { orders } = useOrderStore();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setSearchResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      // Basic mock search logic
      const foundOrder = orders.find(o => o.id === orderId && o.userId); // In a real app, verify email too
      
      if (foundOrder) {
        setSearchResult(foundOrder);
      } else {
        // Just mock a result if it's a demo format like ORD-123
        if (orderId.startsWith('ORD-')) {
          setSearchResult({
            id: orderId,
            status: 'processing',
            date: new Date().toISOString(),
            total: 129.99,
            items: [
              {
                product: { title: 'Mock Product' },
                quantity: 1
              }
            ]
          });
        } else {
          setError('Order not found. Please check your Order ID and try again.');
        }
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[70vh]">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8 text-gray-900" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-lg text-gray-500">
          Enter your order ID and email address to see the current status of your shipment.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <form onSubmit={handleTrack} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="e.g. ORD-123456"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Email used for purchase"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching || !orderId || !email}
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSearching ? 'Searching...' : (
              <>
                Track Order <Search className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      {searchResult && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8 pb-8 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{searchResult.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="font-medium text-gray-900">{format(new Date(searchResult.date), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize
                ${searchResult.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  searchResult.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                  searchResult.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                  'bg-gray-100 text-gray-800'}`}
              >
                {searchResult.status}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
            <div className="space-y-8 relative">
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${['processing', 'shipped', 'delivered'].includes(searchResult.status) ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Order Confirmed</h4>
                  <p className="text-sm text-gray-500">We have received your order.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${['shipped', 'delivered'].includes(searchResult.status) ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Shipped</h4>
                  <p className="text-sm text-gray-500">Your order is on the way.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${searchResult.status === 'delivered' ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Delivered</h4>
                  <p className="text-sm text-gray-500">Your order has been delivered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
