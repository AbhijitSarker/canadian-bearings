'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import ContactInformationForm from '@/components/checkout/ContactInformationForm';
import ShippingAddressSelector from '@/components/checkout/ShippingAddressSelector';
import ShippingMethodSelector from '@/components/checkout/ShippingMethodSelector';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [contactInfo, setContactInfo] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([
    {
      id: 1,
      fullName: 'Tanjider Sarao',
      street: '362 Ridgewood Dr',
      city: 'Soldotna',
      state: 'Alaska',
      country: 'AK',
      zipCode: '99669',
      phone: '(555) 000-0000',
      isDefault: true,
    },
  ]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(shippingAddresses[0]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState({
    id: 'ups-2day',
    name: 'UPS 2-Day PM Service',
    description: 'Canadian Bearing help will advise on delivery',
    price: 'TBD',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: 'visa-card',
    name: 'Visa Card',
    type: 'card',
  });

  // Calculate totals
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => {
    const price = item.unitPrice || item.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  const savings = 49.2; // Mock savings
  const shipping = 30;
  const taxes = subtotal * 0.15; // 15% tax
  const total = subtotal - savings + shipping + taxes;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Handlers
  const handleSaveContactInfo = (data) => {
    setContactInfo(data);
    setCurrentStep(2);
  };

  const handleAddShippingAddress = (address) => {
    const newAddress = {
      ...address,
      id: shippingAddresses.length + 1,
      isDefault: false,
    };
    setShippingAddresses([...shippingAddresses, newAddress]);
    setSelectedShippingAddress(newAddress);
  };

  const handleAddPaymentMethod = (method) => {
    // In a real app, this would save to backend
    console.log('New payment method:', method);
  };

  const handleBackToShopping = () => {
    router.push('/products');
  };

  const handleNext = () => {
    if (currentStep === 2) {
      // Move to payment step
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Final checkout - would submit order to backend
      console.log('Checkout complete!', {
        contactInfo,
        shippingAddress: selectedShippingAddress,
        shippingMethod: selectedShippingMethod,
        paymentMethod: selectedPaymentMethod,
      });
      // router.push('/order-confirmation');
    }
  };

  const handleCheckout = () => {
    if (currentStep === 1) {
      // Move to step 2 if contact info is saved
      if (contactInfo) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      // Move to step 3 for payment
      setCurrentStep(3);
    } else {
      handleNext();
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Stepper */}
          <CheckoutStepper currentStep={currentStep} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {currentStep === 1 && (
                <>
                  <ContactInformationForm
                    initialData={contactInfo}
                    onSave={handleSaveContactInfo}
                    isEditMode={!!contactInfo}
                  />
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={handleBackToShopping}
                      variant="outline"
                      className="flex items-center gap-2 px-6 h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Shopping
                    </Button>
                    <Button
                      onClick={() => contactInfo && setCurrentStep(2)}
                      disabled={!contactInfo}
                      className="flex items-center gap-2 px-8 h-11 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Contact Info Summary (Read-only) */}
                  {contactInfo && (
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Name:</span> {contactInfo.firstName} {contactInfo.lastName}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Email:</span> {contactInfo.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Phone:</span> ({contactInfo.countryCode}) {contactInfo.phone}
                        </p>
                      </div>

                      {contactInfo.description && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order information</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Comment:</span> {contactInfo.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shipping Address */}
                  <ShippingAddressSelector
                    addresses={shippingAddresses}
                    selectedAddress={selectedShippingAddress}
                    onSelectAddress={setSelectedShippingAddress}
                    onAddAddress={handleAddShippingAddress}
                  />

                  {/* Shipping Method */}
                  <ShippingMethodSelector
                    selectedMethod={selectedShippingMethod}
                    onSelectMethod={setSelectedShippingMethod}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={handleBackToShopping}
                      variant="outline"
                      className="flex items-center gap-2 px-6 h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Shopping
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 h-11 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Contact Info Summary (Read-only) */}
                  {contactInfo && (
                    <div className="bg-white rounded-lg border border-gray-100 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Name:</span> {contactInfo.firstName} {contactInfo.lastName}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Email:</span> {contactInfo.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-900">Phone:</span> ({contactInfo.countryCode}) {contactInfo.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shipping Summary (Read-only) */}
                  <div className="bg-white rounded-lg border border-gray-100 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Shipping Details</h2>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Address</p>
                        <p className="text-sm text-gray-600">{selectedShippingAddress.fullName}</p>
                        <p className="text-sm text-gray-600">{selectedShippingAddress.street}</p>
                        <p className="text-sm text-gray-600">
                          {selectedShippingAddress.city}, {selectedShippingAddress.state} {selectedShippingAddress.zipCode}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900 mb-1">Shipping Method</p>
                        <p className="text-sm text-gray-600">{selectedShippingMethod.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onSelectMethod={setSelectedPaymentMethod}
                    onAddMethod={handleAddPaymentMethod}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="flex items-center gap-2 px-6 h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 h-11 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[380px] shrink-0">
              <CheckoutOrderSummary
                subtotal={subtotal}
                savings={savings}
                shipping={shipping}
                taxes={taxes}
                total={total}
                itemCount={itemCount}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
