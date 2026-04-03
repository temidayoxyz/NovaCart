'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useOrderStore, OrderStatus } from '@/lib/store/useOrderStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const router = useRouter();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const subtotal = getCartTotal();
  const shipping = subtotal > 150 ? 0 : 15;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  if (!mounted) return null;

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => router.push('/products')} className="text-black underline underline-offset-4">
          Continue shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: `ord_${uuidv4().substring(0, 8)}`,
        userId: user?.id || 'guest',
        items: [...items],
        total,
        status: 'processing' as OrderStatus,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        date: new Date().toISOString(),
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setStep('success');
      toast.success('Order placed successfully!');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-lg text-gray-600 mb-8">
          We&apos;ve received your order and will send you an email confirmation shortly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push('/products')}
            className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </button>
          {user && (
            <button
              onClick={() => router.push('/account')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-gray-200 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              View Order History
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Forms */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <span className={step === 'shipping' ? 'text-black' : ''}>Shipping</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step === 'payment' ? 'text-black' : ''}>Payment</span>
          </div>

          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State / Province</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                  <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-900 transition-colors mt-8">
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Payment Method</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Lock className="w-4 h-4" /> Secure
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <input type="radio" checked readOnly className="w-4 h-4 text-black focus:ring-black" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <p className="text-sm text-gray-500 ml-7">This is a mock payment. Do not enter real card details.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none font-mono" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Expiration Date</label>
                    <input required type="text" placeholder="MM/YY" name="expDate" value={formData.expDate} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">CVV</label>
                    <input required type="text" placeholder="123" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep('shipping')} className="px-6 py-4 border border-gray-200 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button type="submit" disabled={isProcessing} className="flex-1 bg-black text-white py-4 rounded-md font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-400 flex items-center justify-center">
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-96 order-1 lg:order-2">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.title}</h4>
                    {Object.entries(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.selectedVariants).map(([k, v]) => v).join(' / ')}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
