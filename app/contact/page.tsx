'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!', {
        description: "We'll get back to you as soon as possible.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Have a question, feedback, or need assistance? We're here to help. Reach out to our team using the form below or our contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white"
              >
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Returns & Exchanges</option>
                <option>Product Information</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-10 lg:pl-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our customer service team is available Monday through Friday, 9am to 6pm EST. We aim to respond to all inquiries within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">support@novacart.com</p>
                <p className="text-sm text-gray-500 mt-1">For general inquiries and support</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600">+1 (800) 123-4567</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Office</h3>
                <p className="text-gray-600">123 Commerce Street<br />Suite 400<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
