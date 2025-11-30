'use client';

import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingCartButton() {
  const { itemCount, openCart } = useCart();
  const [bounce, setBounce] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  // Trigger bounce animation when item count increases
  useEffect(() => {
    if (itemCount > prevCount && prevCount !== 0) {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  return (
    <button
      onClick={openCart}
      className={`fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 ${
        bounce ? 'animate-bounce' : ''
      }`}
      aria-label="Open cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
