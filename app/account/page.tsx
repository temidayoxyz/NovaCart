'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, User as UserIcon, LogOut, Settings, Heart } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !user) return null;

  const orders = getUserOrders(user.id);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-500">Welcome back, {user.name}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Profile
            </button>
            <Link
              href="/account/wishlist"
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
            
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 rounded-md hover:bg-blue-50 transition-colors mt-4"
              >
                <Settings className="w-4 h-4" /> Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              {orders.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link href="/products" className="text-black font-medium hover:underline">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
                          <p className="font-medium text-sm">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                          <p className="font-medium text-sm">{format(new Date(order.date), 'MMM d, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
                          <p className="font-medium text-sm">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                              'bg-gray-100 text-gray-800'}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{item.product.title}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="bg-gray-50 rounded-lg p-6 max-w-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button className="text-sm font-medium text-black hover:underline">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
