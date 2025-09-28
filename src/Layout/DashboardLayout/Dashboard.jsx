import React from "react";
import { Calendar, Settings, BarChart3, Bell, LogOut } from "lucide-react";
import { FaRegStar } from "react-icons/fa";

import { Outlet, NavLink } from "react-router-dom";

const Dashboard = () => {
  const sidebarItems = [
    {
      path: "/provider/provider_home",
      icon: BarChart3,
      label: "Dashboard",
    },
    {
      path: "/provider/consultation",
      icon: Calendar,
      label: "Consultation",
    },
    {
      path: "/provider/review",
      icon: FaRegStar,
      label: "Review",
    },
    {
      path: "/provider/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-68 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <img src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png" alt="" />
          <div className="mt-5">
            <img src="https://i.ibb.co.com/k6Bb2sMP/Line-26.png" alt="" />
          </div>
        </div>

        <nav className="flex-1 px-3 py-5">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3  px-4  py-3  text-left transition-colors ${
                      isActive
                        ? "bg-orange-100 text-orange-600 border-l-4 border-orange-500 rounded-r-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <IconComponent size={20} />
                  <span className="text-lg font-semibold">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600">
                    DS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - This is where your outlet will render */}
        <main className="flex-1 overflow-auto bg-gray-50 p-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
