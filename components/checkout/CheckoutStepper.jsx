import React from 'react';
import { Check } from 'lucide-react';

const CheckoutStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Contact and Order Information' },
    { number: 2, title: 'Shipping Details and Payment' },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                currentStep > step.number
                  ? 'bg-green-600 border-green-600'
                  : currentStep === step.number
                  ? 'bg-green-600 border-green-600'
                  : 'bg-white border-gray-300'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span
                  className={`text-sm font-semibold ${
                    currentStep === step.number ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {step.number}
                </span>
              )}
            </div>
            <p
              className={`mt-2 text-xs text-center max-w-[120px] ${
                currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-400'
              }`}
            >
              {step.title}
            </p>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-0.5 mx-4 mb-8 ${
                currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutStepper;
