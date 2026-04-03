import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NovaCart | Premium E-Commerce',
  description: 'A modern, high-end e-commerce storefront.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
