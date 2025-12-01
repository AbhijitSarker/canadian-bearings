"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/api/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function PunchoutLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasAttemptedLogin = useRef(false);
  
  const { punchoutLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');

  useEffect(() => {
    // Prevent multiple login attempts
    if (hasAttemptedLogin.current) {
      return;
    }

    const handlePunchoutLogin = async () => {
      // Check if sid parameter exists
      if (!sid) {
        setError("Missing session ID (sid) parameter");
        setIsLoading(false);
        return;
      }

      // Mark that we've attempted login
      hasAttemptedLogin.current = true;

      try {
        setIsLoading(true);
        const result = await punchoutLogin(sid);

        if (result.success) {
          const userData = result.data;
          
          // Handle multi-customer scenario
          if (
            userData &&
            Array.isArray(userData.customers) &&
            userData.customers.length > 1
          ) {
            // Multiple customers: go to select-account
            router.push('/auth/select-account');
          } else if (
            userData &&
            Array.isArray(userData.customers) &&
            userData.customers.length === 1
          ) {
            // Single customer: auto-select and go to account
            router.push('/account');
          } else {
            // No customers or fallback
            router.push('/');
          }
        } else {
          setError(result.error || "Authentication failed. Invalid session ID.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Punchout login error:", error);
        setError("An unexpected error occurred during authentication.");
        setIsLoading(false);
      }
    };

    handlePunchoutLogin();
    // Only depend on sid - punchoutLogin and router are stable enough or we use ref to prevent re-runs
  }, [sid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {isLoading ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Authenticating...
            </h2>
            <p className="text-gray-600">
              Please wait while we log you in.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition"
            >
              Go to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
