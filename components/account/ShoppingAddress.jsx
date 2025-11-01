"use client";

export default function ShoppingAddress({ shoppingAddress, setShoppingAddress, onSave }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Shopping Address</h2>
      <p className="text-sm text-gray-600 mb-6">Your profile is visible to your connected users.</p>

      <form onSubmit={onSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={shoppingAddress.address}
            onChange={(e) => setShoppingAddress({ ...shoppingAddress, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
            placeholder="Address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
            <input
              type="text"
              value={shoppingAddress.street}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, street: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              placeholder="Street"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City/Town</label>
            <select
              value={shoppingAddress.city}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">State/Province/Region</label>
            <select
              value={shoppingAddress.state}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, state: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
            >
              <option value="Ontario">Ontario</option>
              <option value="Quebec">Quebec</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Alberta">Alberta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip/Postal Code</label>
            <input
              type="text"
              value={shoppingAddress.zipCode}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, zipCode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              placeholder="L8R 2L2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={shoppingAddress.country}
              onChange={(e) => setShoppingAddress({ ...shoppingAddress, country: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
            >
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex gap-2">
              <select
                value={shoppingAddress.phoneCountryCode}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, phoneCountryCode: e.target.value })}
                className="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                value={shoppingAddress.phoneNumber}
                onChange={(e) => setShoppingAddress({ ...shoppingAddress, phoneNumber: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                placeholder="(555) 000-0000"
              />
            </div>
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
