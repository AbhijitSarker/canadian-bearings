"use client";
import TopHeader from "@/components/common/topHeader";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/home/footer";

export default function AuthLayout({ children }) {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <div className="container mx-auto py-12">
        {children}
      </div>
      <Footer />
    </div>
  );
}