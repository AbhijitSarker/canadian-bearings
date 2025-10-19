"use client";
import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function RegisterVerifiedPage() {
  return (
  <div className="w-full md:w-1/2 px-6 md:px-16 relative">
    {/* Top Sign In Link */}
        <div className="absolute top-6 right-8 text-sm">
          <p>
            Do you have already account?{" "}
            <Link href="/login" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

  <div className="max-w-lg w-full text-center mx-auto">
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
            href="/auth/reset-password"
            className="text-sm font-medium text-gray-800 hover:underline"
          >
            Didn’t get an email?
          </Link>
        </div>
    </div>
  );
}
