import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/navbar";
import TopHeader from "@/components/common/topHeader";
import Footer from "@/components/home/footer";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import CartUI from "@/components/cart/CartUI";

const urbanist = Urbanist({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  title: "Canadian Bearings",
  description: "Safety, reliability, efficiency, and sustainability to industrial operations worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[urbanist.className, "antialiased", "text-gray-700"].join(" ")} >
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" />
            <TopHeader />
            <Navbar />
            <BreadcrumbBar />
            {children}
            <Footer />
            <CartUI />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}