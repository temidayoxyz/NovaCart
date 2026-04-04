export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and NovaCart (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the NovaCart website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>
          <p className="mt-4">
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Representations</h2>
          <p>By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You are not a minor in the jurisdiction in which you reside.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Products and Pricing</h2>
          <p>
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
          </p>
          <p className="mt-4">
            All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of the State of New York. NovaCart and yourself irrevocably consent that the courts of New York shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </section>
      </div>
    </div>
  );
}
