import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  title: "Categories | Canadian Bearings",
  description: "Canadian Bearings Categories Page",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={[urbanist.className, "antialiased", "text-gray-700"].join(" ")} >
            {children}
        </body>
      </html>
  );
}
