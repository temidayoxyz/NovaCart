import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">About NovaCart</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          Founded in 2026, NovaCart was born out of a simple idea: to elevate everyday essentials with premium materials and mindful design. We believe that the objects we interact with daily should not only be functional but also bring a sense of joy and aesthetic pleasure.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
        <p>
          Our mission is to provide a curated selection of high-quality products that enhance modern living. We carefully source our materials and partner with ethical manufacturers to ensure that every item in our store meets our rigorous standards for durability, sustainability, and design excellence.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Sustainable Practices</h2>
        <p>
          We are committed to reducing our environmental footprint. From eco-friendly packaging to carbon-neutral shipping options, we continuously strive to make choices that are better for our planet. We believe that great design should never come at the expense of the environment.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Join Our Journey</h2>
        <p>
          Whether you are looking for the perfect piece of clothing, the latest electronics, or beautiful home accessories, NovaCart is here to provide an unparalleled shopping experience. Thank you for being a part of our community.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors">
            Explore Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
