"use client";
import { useState } from "react";
import Link from "next/link";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
// left banner is provided by the auth layout

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook into your authentication API
    console.log("Sign In submitted");
  };

  return (
  <div className="flex flex-col justify-start w-full md:w-1/2 p-6 md:p-16 relative min-h-0">
      {/* top register link */}
  <div className="absolute top-4 right-4 text-sm md:top-6 md:right-8">
        <p>
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-green-600 font-medium">
            Register
          </Link>
        </p>
      </div>

  <div className="max-w-lg w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 mt-6 md:mt-0 text-gray-800">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end text-sm">
              <Link
              href="/auth/reset-password"
                className="text-gray-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition"
            >
              Sign In
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex-1 h-px bg-gray-200" />
              <span>OR</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Sign-In */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="border border-gray-200 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-50"
              >
                <FaApple className="w-4 h-4 mr-2" /> Apple
              </button>
              <button
                type="button"
                className="border border-gray-200 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-50"
              >
                <FcGoogle className="w-4 h-4 mr-2" /> Google
              </button>
              <button
                type="button"
                className="border border-gray-200 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-50"
              >
                <GrLinkedin className="w-4 h-4 mr-2" /> LinkedIn
              </button>
            </div>

            {/* Back + Sign In bottom buttons */}
            <div className="flex items-center justify-between mt-6">
              <Link
                href="/"
                className="border border-green-600 text-green-600 rounded-lg px-6 py-2 hover:bg-green-50 transition"
              >
                ← Back
              </Link>
              <button
                type="submit"
                className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
