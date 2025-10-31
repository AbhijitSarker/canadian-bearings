import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function VerifiedEmailPage() {
  return (
    <div className="w-full md:w-1/2 p-6 md:p-16">
      <div className="max-w-lg w-full mx-auto text-center">
          {/* Mail Icon Circle */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MailIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Verified Email
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            An email has been sent to{" "}
            <span className="font-semibold text-gray-800">
              tanjidersaraoa@gmail.com
            </span>
            . If this email address is register to Canadian Bearings, you will receive instructions on how to set a new password.
          </p>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Experiencing issues receiving the email?
            </p>
            <Link 
              href="/auth/reset-password" 
              className="text-sm text-gray-800 font-medium hover:underline"
            >
              Didn't get an email?
            </Link>
          </div>
        </div>
    </div>
  );
}