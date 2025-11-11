"use client";

import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useState } from "react";
// import { EyeIcon, EyeOffIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function PasswordAndSecurity() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Password and Security
      </h2>

      {/* Form */}
      <form className="space-y-6">
        {/* Old Password */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">Old Password</label>
            <button
              type="button"
              className="text-sm text-green-600 hover:underline font-medium"
            >
              Forget Password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword.old ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, old: !prev.old }))
              }
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword.old ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword.new ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword.confirm ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Password rules */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="text-gray-800 font-medium">Password Strength:</span>{" "}
            Weak
          </p>
          <ul className="space-y-0.5">
            <li>✓ Cannot contain your name or email address</li>
            <li>✓ At least 8 characters</li>
            <li>✓ Contains a number or symbol</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
