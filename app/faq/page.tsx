export default function FAQPage() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are securely encrypted."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. Please contact our customer support team immediately if you need to make changes."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and will be calculated at checkout."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order directly on our Track Order page using your order ID."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Please visit our Shipping & Returns page for more detailed information."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-12 text-lg">Find answers to common questions about our products, shipping, and returns.</p>
      
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-8 bg-gray-50 rounded-xl text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h2>
        <p className="text-gray-600 mb-6">Our customer support team is here to help.</p>
        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  );
}
