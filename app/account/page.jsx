"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import SidebarNav from "@/components/account/SidebarNav";
import AccountPageBanner from "@/components/account/PageBanner";
import MyAccountTab from "@/components/account/MyAccountTab";
import OrderHistoryTab from "@/components/account/OrderHistoryTab";
import PasswordSecurityTab from "@/components/account/PasswordSecurityTab";
import QuoteTab from "@/components/account/QuoteTab";
import KnowledgeCenterTab from "@/components/account/KnowledgeCenterTab";
import CustomerSupportTab from "@/components/account/CustomerSupportTab";

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
                <MyAccountTab
                  personalDetails={personalDetails}
                  setPersonalDetails={setPersonalDetails}
                  onSavePersonal={handlePersonalDetailsSave}
                  shoppingAddress={shoppingAddress}
                  setShoppingAddress={setShoppingAddress}
                  onSaveAddress={handleAddressSave}
                />
              )}

              {activeTab === "order-history" && <OrderHistoryTab />}

              {activeTab === "password-security" && <PasswordSecurityTab />}

              {activeTab === "quote" && <QuoteTab />}

              {activeTab === "knowledge-center" && <KnowledgeCenterTab />}

              {activeTab === "customer-support" && <CustomerSupportTab />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}