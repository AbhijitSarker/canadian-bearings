import PageBanner from "@/components/search/PageBanner";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Categories | Canadian Bearings",
  description: "Canadian Bearings Categories Page",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
            {children}
        </body>
      </html>
  );
}
