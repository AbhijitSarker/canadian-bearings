"use client";
import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function RegisterVerifiedPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side (Gradient Section) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-green-500 text-white flex-col justify-center items-center p-10 rounded-r-[3rem]">
        <h1 className="text-3xl font-bold text-center mb-3">
          Welcome to Canadian Bearings
        </h1>
        <p className="text-center mb-10 text-white/90">
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

      {/* Right Side (Verification Message) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 md:px-16 relative">
        {/* Top Sign In Link */}
        <div className="absolute top-6 right-8 text-sm">
          <p>
            Do you have already account?{" "}
            <Link href="/login" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="max-w-md w-full text-center">
          {/* Circle Mail Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MailIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Main Content */}
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Verified Email
          </h2>
          <p className="text-gray-600 leading-relaxed">
            An email has been sent to{" "}
            <span className="font-semibold text-gray-800">
              tanjidersaraoa@gmail.com
            </span>
            . If this email address is registered to Canadian Bearings, you will
            receive instructions on how to set a new password.
          </p>

          <hr className="my-6 border-gray-200" />

          <p className="text-sm text-gray-500">
            Experiencing issues receiving the email?
          </p>
          <Link
            href="#"
            className="text-sm font-medium text-gray-800 hover:underline"
          >
            Didn’t get an email?
          </Link>
        </div>
      </div>
    </div>
  );
}
