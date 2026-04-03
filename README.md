# NovaCart - Premium E-Commerce

NovaCart is a modern, high-end e-commerce storefront built with Next.js, React, and Tailwind CSS. It features a clean, minimalist design with a focus on user experience and performance.

## Features

- **Product Catalog:** Browse products with filtering (by category), sorting (price, newest, featured), and search capabilities.
- **Product Details:** Detailed product views with image galleries, variant selection, and add-to-cart functionality.
- **Shopping Cart:** A slide-out drawer to manage cart items, update quantities, and proceed to checkout.
- **Checkout Flow:** A simulated multi-step checkout process covering shipping information and payment.
- **User Authentication:** A simulated login/signup system.
- **User Dashboard:** A dedicated account area for users to view their order history and profile information.
- **Admin Dashboard:** A simulated admin panel to manage products, view orders, and update order statuses.
- **Wishlist:** Save favorite products for later viewing.
- **Order Tracking:** A dedicated page to track the status of placed orders.
- **Static Pages:** Includes About, FAQ, Shipping & Returns, Contact Us, Privacy Policy, and Terms of Service.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with `localStorage` persistence)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://motion.dev/)
- **Date Formatting:** [date-fns](https://date-fns.org/)
- **Toast Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mock Data & Authentication

This application uses a simulated backend. All data (products, users, orders, cart, wishlist) is managed via Zustand stores and persisted in the browser's `localStorage`.

### Admin Access
To access the Admin Dashboard, log in with the following credentials:
- **Email:** `admin@novacart.com`
- **Password:** *(any password will work)*

Once logged in as an admin, an "Admin Dashboard" link will appear in your account sidebar.

## Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable React components (Navbar, Footer, ProductCard, CartDrawer, etc.).
- `/lib/store`: Zustand store definitions for state management.
- `/lib/sample-data.ts`: Initial mock data for products.
