'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email && password) {
      // Check if it's the mock admin
      const role = email === 'admin@novacart.com' ? 'admin' : 'user';
      
      login({
        id: `usr_${Math.random().toString(36).substr(2, 9)}`,
        name: email.split('@')[0],
        email,
        role,
      });
      
      toast.success('Logged in successfully');
      router.push('/account');
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500">Enter your details to access your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-gray-500 hover:text-black">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-900 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-500 text-center">
          <p>Mock Admin Login: <strong>admin@novacart.com</strong></p>
          <p>Any password works.</p>
        </div>
      </div>
    </div>
  );
}
