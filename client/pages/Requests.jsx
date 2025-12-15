import { useState } from "react";
import { Plus, Search, Filter, CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const requests = [
    {
      id: 1,
      orderId: "123456789",
      orderDate: "01-05-2022",
      userId: "WD#345346",
      orderNo: "WD#345346",
      status: [true, true, true],
      description: "Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text Lorem ipsum Lorem Ipsum is a dummy text",
    },
    {
      id: 2,
      orderId: "123456790",
      orderDate: "01-06-2022",
      userId: "WD#345346",
      orderNo: "WD#345346",
      status: [true, true, true],
      description: "Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text Lorem ipsum Lorem Ipsum is a dummy text",
    },
    {
      id: 3,
      orderId: "123456791",
      orderDate: "01-07-2022",
      userId: "WD#345346",
      orderNo: "WD#345346",
      status: [true, true, true],
      description: "Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text Lorem ipsum Lorem Ipsum is a dummy text",
    },
  ];

  const tabs = [
    { id: "view", label: "Requests", icon: null },
    { id: "edit", label: "Edit Request", icon: Edit2 },
    { id: "delete", label: "Delete Request", icon: Trash2 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Requests</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your requests and orders</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all">
          <Plus size={20} />
          ADD REQUEST
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon size={18} />}
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "view" && (
        <>
          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 flex items-center gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {requests.map((request, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Order ID</p>
                    <p className="text-sm font-semibold text-gray-900">{request.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Order Date</p>
                    <p className="text-sm font-semibold text-gray-900">{request.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Invoice Number</p>
                    <p className="text-sm font-semibold text-gray-900">{request.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">How Should Bills</p>
                    <p className="text-sm font-semibold text-gray-900">{request.orderNo}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    {request.status.map((isActive, i) => (
                      <button key={i} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                        {isActive ? (
                          <CheckCircle size={20} className="text-green-500" />
                        ) : (
                          <XCircle size={20} className="text-red-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{request.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "edit" && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Request</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Order ID</label>
                <input
                  type="text"
                  placeholder="Enter order ID"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Order Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Invoice Number</label>
                <input
                  type="text"
                  placeholder="Enter invoice number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">How Should Bills</label>
                <input
                  type="text"
                  placeholder="Enter billing info"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                placeholder="Enter description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
                Save Changes
              </button>
              <button className="border border-gray-200 hover:bg-gray-50 text-gray-900 px-6 py-2 rounded-lg font-medium transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "delete" && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Delete Request</h3>
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 font-medium">⚠️ Warning: This action cannot be undone</p>
              <p className="text-red-700 text-sm mt-2">Deleting a request will permanently remove it from the system.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Select Request to Delete</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">-- Select a request --</option>
                {requests.map((req) => (
                  <option key={req.id} value={req.id}>
                    Order {req.orderId} - {req.orderDate}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
                Delete Request
              </button>
              <button className="border border-gray-200 hover:bg-gray-50 text-gray-900 px-6 py-2 rounded-lg font-medium transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
