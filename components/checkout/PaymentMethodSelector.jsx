'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentMethodForm from './PaymentMethodForm';

const PaymentMethodSelector = ({ methods = [], selectedMethod, onSelectMethod, onAddMethod }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const defaultMethods = [
    {
      id: 'cash-on',
      name: 'Cash On',
      type: 'cash',
      description: 'You can choice Cash on delivery',
    },
    {
      id: 'visa-card',
      name: 'Visa Card',
      type: 'card',
      cardHolder: 'Tanjider Sarao',
      cardNumber: '123***********98',
    },
  ];

  const paymentMethods = methods.length > 0 ? methods : defaultMethods;

  const handleSaveMethod = (methodData) => {
    onAddMethod(methodData);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <PaymentMethodForm
        onSave={handleSaveMethod}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Methods */}
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedMethod?.id === method.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Radio Button */}
              <div className="mt-1">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod?.id === method.id
                      ? 'border-green-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod?.id === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                  )}
                </div>
              </div>

              {/* Method Details */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{method.name}</p>
                {method.type === 'card' && method.cardHolder && (
                  <>
                    <p className="text-sm text-gray-900 mb-1">{method.cardHolder}</p>
                    <p className="text-sm text-gray-600">{method.cardNumber}</p>
                  </>
                )}
                {method.type === 'cash' && method.description && (
                  <p className="text-sm text-gray-600">{method.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Payment Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-green-600"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Payment Method</span>
      </button>
    </div>
  );
};

export default PaymentMethodSelector;
