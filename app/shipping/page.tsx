export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">Shipping & Returns</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Shipping Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            Shipping Information
          </h2>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p>
              We process and ship orders Monday through Friday, excluding public holidays. Orders placed before 12:00 PM EST typically ship the same day.
            </p>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Domestic Shipping (US)</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Standard (3-5 business days):</strong> $5.99 or FREE on orders over $150</li>
              <li><strong>Express (2 business days):</strong> $14.99</li>
              <li><strong>Next Day (1 business day):</strong> $24.99</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">International Shipping</h3>
            <p>
              We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination and package weight. Customers are responsible for any customs duties or taxes.
            </p>
          </div>
        </div>

        {/* Returns Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            Return Policy
          </h2>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p>
              We want you to be completely satisfied with your purchase. If you are not happy with your order, we offer a 30-day return window from the date of delivery.
            </p>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Return Conditions</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unused and in their original condition</li>
              <li>Original tags and packaging must be intact</li>
              <li>Final sale items cannot be returned</li>
              <li>Intimates and swimwear are non-returnable for hygiene reasons</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">How to Return</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log into your account and navigate to your Order History</li>
              <li>Select the item(s) you wish to return and generate a return label</li>
              <li>Pack the items securely and attach the provided label</li>
              <li>Drop off the package at any authorized shipping location</li>
            </ol>
            
            <p className="mt-4 italic">
              Please note: A $5.00 return shipping fee will be deducted from your refund for domestic returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
