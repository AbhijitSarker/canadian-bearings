"use client";

export default function AccountInfoForm({
  personalDetails,
  setPersonalDetails,
  shoppingAddress,
  setShoppingAddress,
  onSavePersonal,
  onSaveAddress,
  onCancel,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePersonal(e);
    onSaveAddress(e);
    onCancel();
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Account Information</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Manage your personal details and shipping address.</p>

      <form onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Personal Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">First Name</label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) =>
                  setPersonalDetails({ ...personalDetails, firstName: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Last Name</label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) =>
                  setPersonalDetails({ ...personalDetails, lastName: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="Last Name"
              />
            </div>
          </div>


          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                value={personalDetails.email}
                onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Job Title</label>
              <input
                type="text"
                value={personalDetails.jobTitle}
                onChange={(e) => setPersonalDetails({ ...personalDetails, jobTitle: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="Job Title"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Department</label>
              <input
                type="text"
                value={personalDetails.department}
                onChange={(e) => setPersonalDetails({ ...personalDetails, department: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="Department"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Cell Phone</label>
              <input
                type="tel"
                value={personalDetails.cellPhone}
                onChange={(e) => setPersonalDetails({ ...personalDetails, cellPhone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="(555) 000-0000"
              />
            </div>
          </div>
        </div>

        {/* Shopping Address Section */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Shopping Address</h3>
          
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Address</label>
            <input
              type="text"
              value={shoppingAddress.address}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, address: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
              placeholder="Address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Street</label>
              <input
                type="text"
                value={shoppingAddress.street}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, street: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="Street"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">City/Town</label>
              <select
                value={shoppingAddress.city}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, city: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
              >
                <option value="Hamilton">Hamilton</option>
                <option value="Toronto">Toronto</option>
                <option value="Ottawa">Ottawa</option>
                <option value="Vancouver">Vancouver</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">State/Province/Region</label>
              <select
                value={shoppingAddress.state}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, state: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
              >
                <option value="Ontario">Ontario</option>
                <option value="Quebec">Quebec</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Alberta">Alberta</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Zip/Postal Code</label>
              <input
                type="text"
                value={shoppingAddress.zipCode}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, zipCode: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                placeholder="L8R 2L2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Country</label>
              <select
                value={shoppingAddress.country}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, country: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
              >
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number</label>
              <div className="flex gap-1 sm:gap-2">
                <select
                  value={shoppingAddress.phoneCountryCode}
                  onChange={(e) => setShoppingAddress({ ...shoppingAddress, phoneCountryCode: e.target.value })}
                  className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-xs sm:text-sm whitespace-nowrap"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  value={shoppingAddress.phoneNumber}
                  onChange={(e) => setShoppingAddress({ ...shoppingAddress, phoneNumber: e.target.value })}
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-sm"
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
}
