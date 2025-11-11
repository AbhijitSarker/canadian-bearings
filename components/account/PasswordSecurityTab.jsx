"use client";

import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useState, useMemo } from "react";

export default function PasswordAndSecurity() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  // Password strength calculation
  const calculateStrength = (password) => {
    if (!password) return { strength: "Weak", color: "text-red-600", score: 0 };

    let score = 0;
    const rules = {
      hasLength: password.length >= 8,
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noNameEmail: true, // In a real app, check against user name/email
    };

    if (rules.hasLength) score++;
    if (rules.hasNumber || rules.hasSymbol) score++;
    if (password.length >= 12) score++;
    if ((rules.hasNumber || rules.hasSymbol) && rules.hasLength && password.length >= 12) score++;

    let strength = "Weak";
    let color = "text-red-600";

    if (score >= 2 && score < 3) {
      strength = "Fair";
      color = "text-orange-600";
    } else if (score >= 3) {
      strength = "Strong";
      color = "text-green-600";
    }

    return { strength, color, rules, score };
  };

  const passwordStrength = calculateStrength(passwords.new);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted");
  };

  // Helper to get input classes based on password visibility
  const getInputClasses = (isVisible) => {
    return "w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Password and Security
      </h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              name="old"
              value={passwords.old}
              onChange={handlePasswordChange}
              placeholder="**********"
              className={getInputClasses(showPassword.old)}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, old: !prev.old }))
              }
              className="absolute right-3 top-3 text-gray-400"
              disabled={false}
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
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              placeholder="**********"
              className={getInputClasses(showPassword.new)}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
              className="absolute right-3 top-3 text-gray-400"
              disabled={false}
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
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="**********"
              className={getInputClasses(showPassword.confirm)}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
              className="absolute right-3 top-3 text-gray-400"
              disabled={false}
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
            <span className={`font-medium ${passwordStrength.color}`}>Password Strength:</span>{" "}
            <span className={passwordStrength.color}>{passwordStrength.strength}</span>
          </p>
          <ul className="space-y-0.5">
            <li className={passwordStrength.rules?.noNameEmail ? "text-green-600" : "text-gray-400"}>
              ✓ Cannot contain your name or email address
            </li>
            <li className={passwordStrength.rules?.hasLength ? "text-green-600 font-medium" : "text-gray-400"}>
              ✓ At least 8 characters
            </li>
            <li className={passwordStrength.rules?.hasNumber || passwordStrength.rules?.hasSymbol ? "text-green-600 font-medium" : "text-gray-400"}>
              ✓ Contains a number or symbol
            </li>
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
