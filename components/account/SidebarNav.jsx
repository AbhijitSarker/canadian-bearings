"use client";

export default function SidebarNav({ activeTab, setActiveTab }) {
  const items = [
    { id: "my-account", label: "My Account" },
    { id: "password-security", label: "Password and Security" },
    { id: "order-history", label: "Order History" },
    { id: "quote", label: "Quote" },
    { id: "knowledge-center", label: "Knowledge Center" },
    { id: "customer-support", label: "Customer Support" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <nav className="p-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition ${
              activeTab === item.id
              ? "bg-[#EDF5ED] text-[#171717] font-semibold"
              : "text-[#464646] hover:bg-[#EDF5ED] font-medium"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
