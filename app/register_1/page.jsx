"use client";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";

export default function RegisterPage1() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const passwordStrength = password.length >= 8 ? "Weak" : "Very Weak";

  return (
    <div className="flex min-h-screen bg-white">
            <TopHeader/>
      <Navbar/>
      <HeaderSlider />

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

      {/* Right Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-16">
        <div className="flex justify-end text-sm mb-4">
          <p>
            Do you have already account?{" "}
            <Link href="/login" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>

        <form className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Email Fields */}
          <div>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div className="relative mt-3">
              <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Confirm Email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="relative mt-3">
              <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                type="button"
                onClick={toggleConfirm}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Password Rules */}
            <div className="text-sm mt-3 text-gray-600 space-y-1">
              <p>Password Strength: {passwordStrength}</p>
              <p>✓ Cannot contain your name or email address</p>
              <p>✓ At least 8 characters</p>
              <p>✓ Contains a number or symbol</p>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-green-600" />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="#" className="text-green-600 font-medium">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-green-600 font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button className="border border-gray-300 rounded-lg px-8 py-2 hover:bg-gray-100 transition">
              
            </button>
            <button className="border border-gray-300 rounded-lg px-8 py-2 hover:bg-gray-100 transition">
              G
            </button>
            <button className="border border-gray-300 rounded-lg px-8 py-2 hover:bg-gray-100 transition">
              in
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="border border-gray-400 text-gray-700 rounded-lg px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
