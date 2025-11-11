import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/navbar";
import TopHeader from "@/components/common/topHeader";
import Footer from "@/components/home/footer";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import { AuthProvider } from "@/contexts/AuthContext";

const urbanist = Urbanist({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  title: "Canadian Bearings",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[urbanist.className, "antialiased", "text-gray-700"].join(" ")} >
        <AuthProvider>
          <Toaster position="top-right" />
          <TopHeader />
          <Navbar />
          <BreadcrumbBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}