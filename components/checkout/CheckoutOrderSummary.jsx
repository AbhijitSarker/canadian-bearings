import React from 'react';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';

const CheckoutOrderSummary = ({ 
  subtotal, 
  savings, 
  shipping, 
  taxes, 
  total, 
  itemCount,
  onCheckout,
  currentStep = 1
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sub Total ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">You Savings</span>
          <span className="font-semibold text-green-600">${savings.toFixed(2)}</span>
        </div>
      </div>

      <div className="relative mb-6">
        <button className="w-full bg-orange-50 rounded-md px-4 py-3 flex items-center justify-between border border-orange-100 hover:bg-orange-100 transition-colors">
          <span className="text-orange-500 font-medium text-sm">Apply Coupon</span>
          <Ticket className="text-gray-500 w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
        <span className="text-base font-semibold text-gray-900">Estimated total</span>
        <span className="text-base font-semibold text-gray-900">${(subtotal - savings).toFixed(2)}</span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Taxes (15%)</span>
          <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>

      <Button 
        onClick={onCheckout}
        disabled={currentStep !== 4}
        className="w-full h-12 text-base bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Place Order
      </Button>

      <p className="text-xs text-gray-400 mt-4 italic">
        *Shipping and tax will be calculated during Checkout
      </p>
    </div>
  );
};

export default CheckoutOrderSummary;
