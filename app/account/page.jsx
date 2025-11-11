"use client";

import { useState, useEffect, useRef } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  
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

  // Update personal details when user data changes
  useEffect(() => {
    if (user) {
      setPersonalDetails((prev) => ({
        ...prev,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        companyName: user?.company || "",
        email: user?.email || "",
      }));
    }
  }, [user]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        toggleRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [sidebarOpen]);

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
      <div className="min-h-screen container mx-auto">
        {/* Header Banner */}
        <AccountPageBanner 
          title="My Account" 
          subtitle="We have over 430 Service Centers conveniently located across North America. Please use the search form below to find the Canadian Service Center near you." 
          onPrint={handlePrint}
          onExport={handleExport}
        />
        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4 flex gap-2" ref={toggleRef}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {sidebarOpen ? "Hide" : "Show"} Menu
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Sidebar Navigation */}
            <div ref={sidebarRef} className={`lg:col-span-3 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
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