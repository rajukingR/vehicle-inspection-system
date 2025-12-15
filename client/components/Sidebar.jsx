import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/slices/authSlice";

import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  LogOut,
  ChevronDown,
  Database,
  X,
  Settings,
  Car,
} from "lucide-react";


const roleMenus = {
  Admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Users / Roles", path: "/users" },
    { icon: Car, label: "Vehicle Master", path: "/vehicles" },
    { icon: Users, label: "Assign Inspectors", path: "/assign-inspectors" },
    {
      icon: BarChart3,
      label: "Inspector Availability",
      path: "/inspector-availability",
    },
    { icon: FileText, label: "Inspections", path: "/inspections" },
    // {
    //   icon: FileText,
    //   label: "Invoice Generation",
    //   path: "/invoices",
    // },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    {
      icon: Database,
      label: "Masters",
      subItems: [
        { label: "Vehicle Types", path: "/masters/vehicle-types" },
        { label: "Inspection Types", path: "/masters/inspection-types" },
        { label: "Pricing", path: "/masters/pricing" },
        { label: "Roles", path: "/masters/roles" },
      ],
    },

    // { icon: Settings, label: "Settings", path: "/settings" },
  ],

  Marketing: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Users, label: "Users / Roles", path: "/users" },

    { icon: Users, label: "Create Lead", path: "/leads/create" },
    { icon: FileText, label: "Follow-ups", path: "/followups" },
    { icon: Car, label: "Assign Vehicle", path: "/assign-vehicle" },
    { icon: Users, label: "Customer Management", path: "/customers" },
    {
      icon: BarChart3,
      label: "Marketing Reports",
      path: "/marketing-reports",
    },
  ],

  Inspection: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Car, label: "Assigned Vehicles", path: "/assigned-vehicles" },
    { icon: FileText, label: "Start Inspection", path: "/start-inspection" },
    { icon: FileText, label: "Upload Findings", path: "/upload-findings" },
    {
      icon: BarChart3,
      label: "Inspection History",
      path: "/inspection-history",
    },
  ],
};


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);
  const loginRole = user?.role_name;

  const menuItems = roleMenus[loginRole] || [];

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expandedItems, setExpandedItems] = useState({});
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const toggleExpanded = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isItemActive = (path) =>
    location.pathname === path ||
    (path && location.pathname.startsWith(path));

  const handleLogoutConfirm = () => {
    dispatch(logoutSuccess());
    navigate("/login", { replace: true });
  };

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static z-50 h-screen w-56 bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="font-bold">Vehicle App</span>
          </div>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSub = item.subItems?.length;
            const isActive = isItemActive(item.path);

            return (
              <div key={item.label}>
                {hasSub ? (
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-lg
                    ${
                      expandedItems[item.label]
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedItems[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg
                    ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}

                {hasSub && expandedItems[item.label] && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-green-200 pl-2">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-sm
                        ${
                          isItemActive(sub.path)
                            ? "bg-green-50 text-green-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t mt-auto">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3
            text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-80 p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 border rounded-md"
              >
                No
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
