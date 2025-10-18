"use client";
import { useState } from "react";
import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log("Reset password for:", email);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
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

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-md w-full mx-auto">
          {/* Sign In Link */}
          <div className="flex justify-end mb-8">
            <p className="text-sm">
              Do you have already account?{" "}
              <Link href="/signIn" className="text-green-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Reset Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 11-9-9M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Form Content */}
          <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            
            <p className="text-sm text-gray-500">
              ⓘ Enter the email with which you've registered
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/signIn"
                className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
              >
                ← Back
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}