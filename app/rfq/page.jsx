"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import QuoteRequestForm from "@/components/account/QuoteRequestForm";
import { useAuth } from "@/contexts/AuthContext";
import { submitRFQ } from "@/lib/api/services/rfq";
import toast from "react-hot-toast";

export default function RFQPage() {
  const { user } = useAuth();
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = async ({ form, lines, formData, resetForm }) => {
    console.log("RFQ submitted from page:", { form, lines });
    
    // Send to C# server
    const result = await submitRFQ(formData);
    
    if (result.success) {
      toast.success("Quote request submitted successfully! Our team will contact you shortly.");
      // Clear the form on success
      if (resetForm) {
        resetForm();
      }
      // Alternative: force re-render by changing key
      setResetKey(prev => prev + 1);
      return true; // Indicate success
    } else {
      toast.error(result.error || "Failed to submit request");
      return false; // Indicate failure
    }
  };

  return (
     <ProtectedRoute>
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteRequestForm 
          key={resetKey}
          initialUser={user}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
    </ProtectedRoute>
  );
}
