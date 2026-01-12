import React from 'react';
import { Check, User, Truck, CreditCard, FileCheck } from 'lucide-react';

const CheckoutStepper = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'Contact and Order Information', icon: User },
    { number: 2, title: 'Shipping Details', icon: Truck },
    { number: 3, title: 'Payment Method', icon: CreditCard },
    { number: 4, title: 'Review', icon: FileCheck },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isClickable = step.number < currentStep; // Allow going back to previous steps

        return (
          <React.Fragment key={step.number}>
            {/* Step Circle */}
            <button
              onClick={() => isClickable && onStepClick && onStepClick(step.number)}
              disabled={!onStepClick || !isClickable}
              className={`flex flex-col items-center group bg-transparent border-0 p-0 ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted || isActive
                    ? 'bg-green-600 border-green-600'
                    : 'bg-white border-gray-300'
                } ${isClickable ? 'group-hover:border-green-400' : ''}`}
              >
                {isCompleted ? (
                   <Check className="w-5 h-5 text-white" />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    } ${isClickable ? 'group-hover:text-green-500' : ''}`}
                  />
                )}
              </div>
              <p
                className={`mt-2 text-xs text-center max-w-[120px] ${
                  currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-400'
                }`}
              >
                {step.title}
              </p>
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-0.5 mx-4 mb-8 ${
                  currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
