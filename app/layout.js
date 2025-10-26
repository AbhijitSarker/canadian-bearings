import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/navbar";
import TopHeader from "@/components/common/topHeader";
import Footer from "@/components/home/footer";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Canadian Bearings",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <TopHeader/>
          <Navbar/>
          <BreadcrumbBar />
            {children}
        <Footer />

        </body>
      </html>
  );
}
