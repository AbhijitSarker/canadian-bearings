"use client";
import TopHeader from "@/components/common/topHeader";
import Navbar from "@/components/common/navbar";

export default function AuthLayout({ children }) {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}