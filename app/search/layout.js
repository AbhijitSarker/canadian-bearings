import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Canadian Bearings",
  description: "E-Commerce with Next.js ",
};

// Nested layouts must NOT render <html> or <body> — only the root layout should.
export default function SearchLayout({ children }) {
  return (
    <div className={`${outfit.className} antialiased text-gray-700`}>
      {children}
    </div>
  );
}
