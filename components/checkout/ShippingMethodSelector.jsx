'use client';

import React from 'react';

const ShippingMethodSelector = ({ methods = [], selectedMethod, onSelectMethod }) => {
  const defaultMethods = [
    {
      id: 'ups-ground',
      name: 'UPS Ground Service',
      description: 'Canadian Bearing will advise on delivery',
      price: 'TBD',
    },
    {
      id: 'ups-2day',
      name: 'UPS 2-Day PM Service',
      description: 'Canadian Bearing help will advise on delivery',
      price: 'TBD',
    },
    {
      id: 'ups-nextday',
      name: 'UPS Next Day Air Service',
      description: 'Canadian Bearing help will advise on delivery',
      price: 'TBD',
    },
  ];

  const shippingMethods = methods.length > 0 ? methods : defaultMethods;

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Shipping Method</h2>
      <p className="text-sm text-gray-500 mb-6">
        Prices will be determined at the time of shipment and added to your order.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedMethod?.id === method.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Radio Button */}
            <div className="flex items-center gap-2 mb-3">
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
            <div>
              <p className="font-semibold text-gray-900 mb-2">{method.name}</p>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <p className="text-lg font-bold text-gray-900">{method.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethodSelector;
