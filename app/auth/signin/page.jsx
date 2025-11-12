"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear previous error
    setErrorMessage("");

    if (!email || !password) {
      const msg = "Please enter both email and password";
      setErrorMessage(msg);
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Login successful!");
        router.push(returnUrl);
      } else {
        const msg = result.error || "Login failed. Please check your credentials.";
        setErrorMessage(msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg = "An unexpected error occurred. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start w-full md:w-1/2 p-6 md:p-16 relative min-h-0">
      <div className="absolute top-4 right-4 text-sm md:top-6 md:right-8">
        <p>
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-green-600 font-medium">
            Register
          </Link>
        </p>
      </div>

      <div className="max-w-lg w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 mt-6 md:mt-0 text-gray-800">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errorMessage}
            </div>
          )}
          {/* Username */}
          <div className="relative">
            <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // clear server error when user starts typing
                if (errorMessage) setErrorMessage("");
              }}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // clear server error when user starts typing
                if (errorMessage) setErrorMessage("");
              }}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-green-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 text-gray-400"
              disabled={isLoading}
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
            disabled={isLoading}
            className="w-full bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
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
          </div>
        </form>
      </div>
    </div>
  );
}