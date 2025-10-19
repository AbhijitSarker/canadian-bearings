import Image from "next/image";
import authLeftBanner from "@/assets/authLeftBanner.svg";

export default function AuthLayout({ children }) {
  return (
    <div className="container mx-auto">
  <div className="flex flex-col md:flex-row my-4 md:my-8 md:min-h-screen bg-white items-start">
        <div className="hidden md:flex w-1/2 h-screen overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={authLeftBanner}
              alt="Welcome to Canadian Bearings"
              className="object-contain rounded-r-[3rem] max-h-[700px]"
              priority
              sizes="(max-width: 768px) 0vw, 50vw"
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}