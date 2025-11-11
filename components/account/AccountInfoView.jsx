"use client";

export default function AccountInfoView({ personalDetails, shoppingAddress, onEdit }) {
    return (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-6">
                <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">Personal Details</h2>
                    <p className="text-sm sm:text-base font-medium text-gray-500">
                        Your profile is visible to your connected users.
                    </p>
                </div>
                <button
                    onClick={onEdit}
                    className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-3 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition whitespace-nowrap"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 
              0 002-2v-5m-1.414-9.414a2 2 
              0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    Edit
                </button>
            </div>

            {/* Info Section */}
            <div className="space-y-4">
                {/* Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
                    <span className="text-gray-600 font-medium text-sm sm:w-40">Name</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base break-words">
                        {personalDetails?.firstName} {personalDetails?.lastName}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
                    <span className="text-gray-600 font-medium text-sm sm:w-40">Phone</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">
                        {shoppingAddress?.phoneCountryCode} {shoppingAddress?.phoneNumber}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
                    <span className="text-gray-600 font-medium text-sm sm:w-40">Email</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base break-words">
                        {personalDetails?.email}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-2">
                    <span className="text-gray-600 font-medium text-sm sm:w-40 flex-shrink-0">Shopping Address</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base break-words">
                        {shoppingAddress?.address && `${shoppingAddress.address}, `}
                        {shoppingAddress?.street && `${shoppingAddress.street}, `}
                        {shoppingAddress?.city}, {shoppingAddress?.state} {shoppingAddress?.zipCode}
                        {shoppingAddress?.country && `, ${shoppingAddress.country}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
