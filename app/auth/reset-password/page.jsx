"use client";
import { useState } from "react";
import Link from "next/link";
import { MailIcon } from "lucide-react";
// left banner provided by auth layout

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log("Reset password for:", email);
  };

  return (
    <div className="w-full md:w-1/2 p-6 md:p-16 relative min-h-0">
      <div className="max-w-lg w-full mx-auto">
          {/* Sign In Link */}
        <div className="absolute top-4 right-4 text-sm md:top-6 md:right-8">
          <p>
            Do you have already account?{" "}
            <Link href="/auth/signin" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

          {/* Reset Icon */}
        <div className="flex mb-6 mt-6 md:mt-0">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 11-9-9M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
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
              <Link
              href="/auth/email-verification"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Reset
              </Link>
            </div>
          </form>
        </div>
    </div>
  );
}