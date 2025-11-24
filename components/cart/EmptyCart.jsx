import React from 'react';

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
      <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            {/* Simple geometric decoration mimicking the screenshot */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400 fill-current">
                <circle cx="50" cy="50" r="40" />
            </svg>
        </div>
        <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-400 relative z-10"
        >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Your shopping cart is empty</h2>
      <p className="text-gray-400">Please doing your shopping</p>
    </div>
  );
};

export default EmptyCart;
