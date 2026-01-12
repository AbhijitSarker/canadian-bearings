'use client';

import React, { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import ShippingAddressForm from './ShippingAddressForm';

const ShippingAddressSelector = ({ addresses = [], selectedAddress, onSelectAddress, onAddAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaveAddress = (addressData) => {
    onAddAddress(addressData);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <ShippingAddressForm
        onSave={handleSaveAddress}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Saved Addresses */}
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => onSelectAddress(address)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedAddress?.id === address.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} ({address.country}), {address.zipCode}
                </p>
                <p className="text-sm text-gray-600 mt-1">{address.country}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {address.isDefault && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                    Default
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                  className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-green-600"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New Address</span>
      </button>
    </div>
  );
};

export default ShippingAddressSelector;
