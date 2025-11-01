"use client";

export default function PersonalDetails({ personalDetails, setPersonalDetails, onSave }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Personal Details</h2>
      <p className="text-sm text-gray-600 mb-6">Your profile is visible to your connected users.</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={personalDetails.firstName}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, firstName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={personalDetails.lastName}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, lastName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={personalDetails.companyName}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, companyName: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
            placeholder="Company Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              value={personalDetails.email}
              onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Back</button>
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Save</button>
        </div>
      </form>
    </div>
  );
}
