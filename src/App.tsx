import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { CheckoutModal, type CheckoutData } from "./components/CheckoutModal";
import { GoogleSheetsModal } from "./components/GoogleSheetsModal";
import { Footer } from "./components/Footer";
import type { ProductType } from "./components/ProductCard";
import { initAuth } from "./lib/googleSheets";
import type { User } from "firebase/auth";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => unsubscribe();
  }, []);

  const handleCheckout = (data: CheckoutData) => {
    setSelectedProduct(null);
    setCheckoutData(data);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f7f3ec] overflow-x-hidden text-brodaz-brown">
      {/* Ambient background light orbs for authentic glass widgets blur effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[5%] w-[550px] h-[550px] rounded-full bg-[#ebdcc6]/60 blur-[130px]" />
        <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#dfcbb2]/50 blur-[140px]" />
        <div className="absolute top-[50%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#f1e4d3]/70 blur-[130px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#d7c0a5]/40 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
          isSheetsConnected={!!currentUser}
        />
        
        <main className="flex-1">
          <Hero />
          <Features />
          <ProductGrid onViewDetails={setSelectedProduct} />
        </main>

        <Footer />
      </div>

      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal 
        data={checkoutData}
        onClose={() => setCheckoutData(null)}
      />

      <GoogleSheetsModal 
        isOpen={isGoogleSheetsOpen}
        onClose={() => setIsGoogleSheetsOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />
    </div>
  );
}



@import "tailwindcss";

@theme {
  --color-brodaz-beige: #BFAB8F;
  --color-brodaz-brown: #4e3b2e;
  --color-brodaz-light: #d4c4af;
  --color-brodaz-muted: #a38d6e;
  
  --font-sans: "Montserrat", "Inter", sans-serif;
  --font-serif: "Playfair Display", "Merriweather", serif;
}

@layer base {
  body {
    @apply bg-[#f7f3ec] text-brodaz-brown font-sans antialiased selection:bg-brodaz-brown selection:text-brodaz-beige min-h-screen;
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/// <reference types="vite/client" />
