'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useProductStore } from '@/lib/store/useProductStore';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { toast } from 'sonner';

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { products, deleteProduct } = useProductStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!mounted || !user || user.role !== 'admin') return null;

  // Mock Analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your store, products, and orders.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'products' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4" /> Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Orders
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Orders</h3>
                    <ShoppingCart className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Products</h3>
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Customers</h3>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-blue-600 hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 last:border-0">
                          <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 text-gray-500">{format(new Date(order.date), 'MMM d, yyyy')}</td>
                          <td className="px-6 py-4 text-gray-500">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</td>
                          <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                                'bg-gray-100 text-gray-800'}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-900">Products Catalog</h3>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Inventory</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden relative flex-shrink-0">
                            <Image src={product.images[0]} alt={product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="font-medium text-gray-900 line-clamp-1">{product.title}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`${product.inventory < 20 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                            {product.inventory} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                deleteProduct(product.id);
                                toast.success('Product deleted');
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">All Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-gray-500">{format(new Date(order.date), 'MMM d, yyyy')}</td>
                        <td className="px-6 py-4 text-gray-500">
                          <div>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                          <div className="text-xs text-gray-400">{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                        </td>
                        <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                                'bg-gray-100 text-gray-800'}`}
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm font-medium text-blue-600 hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
