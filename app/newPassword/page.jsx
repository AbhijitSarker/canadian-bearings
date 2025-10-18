"use client";
import { useState } from "react";
import Link from "next/link";
import { LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export default function NewPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password update logic
    console.log("Updating password");
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

      {/* Right Panel */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Add New Password</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Field */}
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>Password Strength: Weak</p>
              <p>Cannot contain your name or email address</p>
              <p>At least 8 characters</p>
              <p>Contains a number or symbol</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}