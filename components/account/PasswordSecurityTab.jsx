"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PasswordSecurityTab() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rules, setRules] = useState({
    length: false,
    containsName: false,
    numberOrSymbol: false,
  });

  useEffect(() => {
    setRules({
      length: password.length >= 8,
      containsName: !(password.toLowerCase().includes("admin") || password.toLowerCase().includes("example")),
      numberOrSymbol: /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
    });
  }, [password]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!password || password !== confirm) {
      toast.error("Passwords must match and not be empty.");
      return;
    }
    if (!rules.length || !rules.numberOrSymbol) {
      toast.error("Password does not meet the requirements.");
      return;
    }
    toast.success("Password updated successfully");
    setOldPassword("");
    setPassword("");
    setConfirm("");
  };

  return (
    <form className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" onSubmit={handleSave}>
      <h2 className="text-2xl font-medium text-gray-900 mb-4">Password and Security</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-700">Old Password <span className="text-green-500 float-right text-xs">Forget Password?</span></label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-700">
        <ul className="space-y-2">
          <li className={`${rules.length ? 'text-green-600' : 'text-gray-400'}`}>✓ At least 8 characters</li>
          <li className={`${rules.containsName ? 'text-green-600' : 'text-gray-400'}`}>✓ Cannot contain your name or email address</li>
          <li className={`${rules.numberOrSymbol ? 'text-green-600' : 'text-gray-400'}`}>✓ Contains a number or symbol</li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="px-6 py-2 rounded-md border border-gray-200">Back</button>
        <button type="submit" className="ml-auto bg-green-600 text-white px-6 py-2 rounded-md">Save</button>
      </div>
    </form>
  );
}
