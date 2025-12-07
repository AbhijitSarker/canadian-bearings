"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getAccountDetails, updateAccount } from '@/lib/api/services/account';
import toast from "react-hot-toast";
import SidebarNav from "@/components/account/SidebarNav";
import AccountPageBanner from "@/components/account/PageBanner";
import MyAccountTab from "@/components/account/MyAccountTab";
import OrderHistoryTab from "@/components/account/OrderHistoryTab";
import PasswordSecurityTab from "@/components/account/PasswordSecurityTab";
import QuoteTab from "@/components/account/QuoteTab";
import KnowledgeCenterTab from "@/components/account/KnowledgeCenterTab";
import UsersTab from "@/components/account/UsersTab";
import GLCodesTab from "@/components/account/GLCodesTab";
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
    email: user?.email || "",
    jobTitle: user?.jobTitle || "",
    department: user?.department || "",
    primaryPhone: user?.primaryPhone || "",
    primaryPhoneExtension: user?.primaryPhoneExtension || "",
    cellPhone: user?.cellPhone || "",
    languageId: user?.languageId || 1,
    lastLoginDate: user?.lastLoginDate || null,
    loginCount: user?.loginCount || 0,
  });

  // Shopping Address State
  const [shoppingAddress, setShoppingAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    phoneExtension: '',
    phoneCountryCode: "",
  });

  // Update personal details when user data changes
  useEffect(() => {
    if (user) {
      setPersonalDetails((prev) => ({
        ...prev,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
      }));
    }
  }, [user]);

  // Fetch account details from backend on mount
  useEffect(() => {
    let mounted = true;
    const fetchAccount = async () => {
      try {
        const res = await getAccountDetails();
        if (!mounted) return;
        if (res.success && res.data) {
          const d = res.data;
          setPersonalDetails((prev) => ({
            ...prev,
            firstName: d.firstName || prev.firstName,
            lastName: d.lastName || prev.lastName,
            jobTitle: d.jobTitle || prev.jobTitle,
            department: d.department || prev.department,
            primaryPhone: d.primaryPhone || prev.primaryPhone,
            primaryPhoneExtension: d.primaryPhoneExtension || prev.primaryPhoneExtension,
            cellPhone: d.cellPhone || prev.cellPhone,
            email: d.email || prev.email,
            languageId: d.languageId || prev.languageId,
            lastLoginDate: d.lastLoginDate || prev.lastLoginDate,
            loginCount: d.loginCount ?? prev.loginCount,
          }));

          setShoppingAddress((prev) => ({
            ...prev,
            address: d.address1 || prev.address,
            street: d.address2 || prev.street,
            city: d.city || prev.city,
            state: d.province ?? prev.state,
            zipCode: d.postalCode || prev.zipCode,
            country: d.country ?? prev.country,
            phoneNumber: d.primaryPhone || prev.phoneNumber,
            phoneExtension: d.primaryPhoneExtension || prev.phoneExtension,
          }));
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccount();
    return () => { mounted = false; };
  }, []);

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
    (async () => {
      try {
        const payload = {
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          jobTitle: personalDetails.jobTitle || '',
          department: personalDetails.department || '',
          primaryPhone: shoppingAddress.phoneNumber || '',
          primaryPhoneExtension: shoppingAddress.phoneExtension || '',
          cellPhone: personalDetails.cellPhone || '',
          address1: shoppingAddress.address || '',
          address2: shoppingAddress.street || '',
          city: shoppingAddress.city || '',
          province: shoppingAddress.state || shoppingAddress.province || '',
          postalCode: shoppingAddress.zipCode || '',
          country: shoppingAddress.country || '',
          languageId: personalDetails.languageId || 1,
        };

        const res = await updateAccount(payload);
        if (res.success) {
          toast.success('Personal details saved successfully!');
        } else {
          toast.error(res.error || 'Failed to save personal details');
        }
      } catch (err) {
        console.error('Save personal details error:', err);
        toast.error('An unexpected error occurred while saving personal details');
      }
    })();
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const payload = {
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          address1: shoppingAddress.address || '',
          address2: shoppingAddress.street || '',
          city: shoppingAddress.city || '',
          province: shoppingAddress.state || shoppingAddress.province || '',
          postalCode: shoppingAddress.zipCode || '',
          country: shoppingAddress.country || '',
          primaryPhone: shoppingAddress.phoneNumber || '',
          primaryPhoneExtension: shoppingAddress.phoneExtension || '',
        };

        const res = await updateAccount(payload);
        if (res.success) {
          toast.success('Shopping address saved successfully!');
        } else {
          toast.error(res.error || 'Failed to save shopping address');
        }
      } catch (err) {
        console.error('Save address error:', err);
        toast.error('An unexpected error occurred while saving address');
      }
    })();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast.success("Export functionality coming soon!");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen container mx-auto">
        {/* Header Banner */}
        {/* <AccountPageBanner 
          title="My Account" 
          onPrint={handlePrint}
        /> */}
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
              <SidebarNav activeTab={activeTab} setActiveTab={handleTabChange} />
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

              {activeTab === "users" && <UsersTab />}

              {activeTab === "gl-codes" && <GLCodesTab />}

              {activeTab === "customer-support" && <CustomerSupportTab />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}