"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

import HeaderBanner from "@/components/account/HeaderBanner";
import SidebarNav from "@/components/account/SidebarNav";
import PersonalDetails from "@/components/account/PersonalDetails";
import ShoppingAddress from "@/components/account/ShoppingAddress";
import AccountPageBanner from "@/components/account/PageBanner";

export default function MyAccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("my-account");
  
  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    companyName: user?.company || "",
    email: user?.email || "",
  });

  // Shopping Address State
  const [shoppingAddress, setShoppingAddress] = useState({
    address: "",
    street: "201 James St N",
    city: "Hamilton",
    state: "Ontario",
    zipCode: "L8R 2L2",
    country: "Canada",
    phoneNumber: "(555) 000-0000",
    phoneCountryCode: "+1",
  });

  const handlePersonalDetailsSave = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save personal details
    toast.success("Personal details saved successfully!");
    console.log("Saving personal details:", personalDetails);
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save address
    toast.success("Shopping address saved successfully!");
    console.log("Saving address:", shoppingAddress);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast.success("Export functionality coming soon!");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header Banner */}
        <AccountPageBanner 
          title="My Account" 
          subtitle="We have over 430 Service Centers conveniently located across North America. Please use the search form below to find the Canadian Service Center near you." 
          onPrint={handlePrint}
          onExport={handleExport}
        />
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {activeTab === "my-account" && (
                <div className="space-y-6">
                  <PersonalDetails
                    personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}
                    onSave={handlePersonalDetailsSave}
                  />

                  <ShoppingAddress
                    shoppingAddress={shoppingAddress}
                    setShoppingAddress={setShoppingAddress}
                    onSave={handleAddressSave}
                  />
                </div>
              )}

              {activeTab === "order-history" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Order History</h2>
                  <p className="text-gray-600">Your order history will appear here.</p>
                </div>
              )}

              {activeTab === "password-security" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Password and Security</h2>
                  <p className="text-gray-600">Update your password and security settings.</p>
                </div>
              )}

              {activeTab === "quote" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Quote</h2>
                  <p className="text-gray-600">Request and manage your quotes here.</p>
                </div>
              )}

              {activeTab === "knowledge-center" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Knowledge Center</h2>
                  <p className="text-gray-600">Browse our knowledge base and resources.</p>
                </div>
              )}

              {activeTab === "customer-support" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Customer Support</h2>
                  <p className="text-gray-600">Get help and support for your account.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}