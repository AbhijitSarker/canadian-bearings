"use client";
import { useState } from "react";
import Link from "next/link";
import { LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
// left banner provided by auth layout

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
    <div className="w-full md:w-1/2 p-6 md:p-16 min-h-0">
      <div className="max-w-lg w-full mx-auto">
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
  );
}