import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg border border-gray-100">
      {/* Product Image */}
      <div className="w-full md:w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
        <div className="relative w-40 h-40">
           <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          
          <div className="space-y-3">
             <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">G L Code/ Cost Center:</label>
                <select className="w-full md:w-64 h-10 px-3 bg-white border border-gray-200 rounded-md text-sm text-gray-500 focus:outline-none focus:border-green-500">
                  <option>Select one</option>
                </select>
             </div>
             <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">Comment</label>
                <input 
                  type="text" 
                  placeholder="Placeholder text.."
                  className="w-full md:w-64 h-10 px-3 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:border-green-500"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="flex flex-col justify-between items-end gap-4 min-w-[140px]">
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-md bg-white">
                <button 
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1.5 hover:bg-gray-50 text-gray-500"
                >
                    <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-gray-50 text-gray-500"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>

        <div className="text-right">
            <div className="text-sm text-gray-900 font-medium">${item.price.toFixed(2)}/each</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">${(item.price * item.quantity).toFixed(2)}<span className="text-sm font-normal text-gray-500 ml-1">/each</span></div>
        </div>

        <Button 
            variant="outline" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 w-full md:w-auto mt-auto"
            onClick={() => onRemove(item.id)}
        >
            <Trash2 size={16} />
            Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
