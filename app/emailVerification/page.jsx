"use client";
import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function VerifiedEmailPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Gradient Background */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-green-500 text-white flex-col justify-center items-center p-10 rounded-r-[3rem]">
        <h1 className="text-3xl font-bold text-center mb-3">
          Welcome to Canadian Bearings
        </h1>
        <p className="text-center mb-10">
          Products, Safety, Reliability, Efficiency, Sustainability
          <br />
          For your Industry
        </p>

        <div className="bg-white/10 p-6 rounded-2xl max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-3">Benefits of Registering</h2>
          <ul className="space-y-2 text-sm">
            <li>✔ Faster and easier ordering and checkout</li>
            <li>✔ View order history</li>
            <li>✔ Saved lists and quick ordering</li>
            <li>✔ Manage payment option</li>
            <li>✔ Request & review Quotes</li>
          </ul>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-md w-full mx-auto">
          {/* Mail Icon Circle */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MailIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Verified Email
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            An email has been sent to{" "}
            <span className="font-semibold text-gray-800">
              tanjidersaraoa@gmail.com
            </span>
            . If this email address is register to Canadian Bearings, you will receive instructions on how to set a new password.
          </p>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Experiencing issues receiving the email?
            </p>
            <Link 
              href="#" 
              className="text-sm text-gray-800 font-medium hover:underline"
            >
              Didn't get an email?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}