import React from 'react';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { FaPaypal, FaCcVisa, FaCcAmex, FaCcMastercard } from "react-icons/fa";


const OrderSummary = ({ subtotal, savings, shipping, taxes, total }) => {
  return (
    <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sub Total (4 item)</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">You Savings</span>
            <span className="font-semibold text-green-600">${savings.toFixed(2)}</span>
            </div>
        </div>

        <div className="relative mb-6">
            <div className="bg-orange-50 rounded-md px-4 py-3 flex items-center justify-between border border-orange-100">
                <span className="text-orange-500 font-medium text-sm">Apply Coupon</span>
                <Ticket className="text-gray-500 w-5 h-5" />
            </div>
        </div>

        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
            <span className="text-base font-semibold text-gray-900">Estimated total</span>
            <span className="text-base font-semibold text-gray-900">${(subtotal - savings).toFixed(2)}</span>
        </div>

        <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping*</span>
            <span className="font-medium text-gray-900">{shipping === 0 ? '----' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Taxes*</span>
            <span className="font-medium text-gray-900">{taxes === 0 ? '-----' : `$${taxes.toFixed(2)}`}</span>
            </div>
        </div>

        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        <Button variant="cta" className="w-full h-12 text-base bg-green-600 hover:bg-green-700">
            Checkout
        </Button>

        <p className="text-xs text-gray-400 mt-4 italic">
            *Shipping and tax will be calculated during Checkout
        </p>
        </div>

        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Accepted Method</h3>
            <div className="flex gap-3">
                <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center">
                    <FaPaypal className="text-[#003087] text-xl" />
                </div>
                <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center">
                    <FaCcVisa className="text-[#1A1F71] text-xl" />
                </div>
                <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center">
                    <FaCcAmex className="text-[#002596] text-xl" />
                </div>
                <div className="w-12 h-8 bg-white border border-gray-100 rounded flex items-center justify-center">
                    <FaCcMastercard className="text-[#EB001B] text-xl" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrderSummary;
