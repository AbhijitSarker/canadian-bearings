import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Search | Canadian Bearings",
  description: "Canadian Bearings Product Search Page",
};

// Nested layouts must NOT render <html> or <body> — only the root layout should.
export default function SearchLayout({ children }) {
  return (
    <div className={`${outfit.className} antialiased text-gray-700`}>
      {children}
    </div>
  );
}
