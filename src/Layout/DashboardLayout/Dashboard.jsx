// import React from "react";
// import { Calendar, Settings, Bell, LogOut } from "lucide-react";
// import { FaRegStar } from "react-icons/fa";
// import { Outlet, NavLink, Link, useNavigate } from "react-router";
// import { BiCategory } from "react-icons/bi";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { baseApi, useGetUserProfileQuery } from "@/redux/features/baseApi";
// import { useDispatch } from "react-redux";

// const Dashboard = () => {
//   const sidebarItems = [
//     {
//       path: "/provider/provider_home",
//       activePaths: ["/provider/provider_home"],
//       icon: BiCategory,
//       label: "Dashboard",
//     },
//     {
//       path: "/provider/consultation",
//       activePaths: [
//         "/provider/consultation",
//         "/provider/consultation_details/:id",
//       ],
//       icon: Calendar,
//       label: "Consultation",
//     },
//     {
//       path: "/provider/review",
//       icon: FaRegStar,
//       label: "Review",
//     },
//     {
//       path: "/provider/settings",
//       icon: Settings,
//       label: "Settings",
//     },
//   ];

//   const { data: userInfo } = useGetUserProfileQuery();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogOut = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.clear();
//     dispatch(baseApi.util.resetApiState());
//     navigate("/sign_in", { replace: true });
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-68 bg-white shadow-sm border-r border-gray-200 flex flex-col sticky top-0 h-screen">
//         <div className="p-6">
//           <Link to="/">
//             <img src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png" alt="Logo" />
//           </Link>
//           <div className="mt-5">
//             <img
//               src="https://i.ibb.co.com/k6Bb2sMP/Line-26.png"
//               alt="Divider"
//             />
//           </div>
//         </div>

//         <nav className="flex-1 px-3 py-5">
//           <div className="space-y-2">
//             {sidebarItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   end={item.path === "/dashboard"}
//                   className={({ isActive }) =>
//                     `w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
//                       isActive ||
//                       item.activePaths?.some((path) =>
//                         window.location.pathname.match(
//                           path.replace(":id", "[0-9]+")
//                         )
//                       )
//                         ? "bg-orange-100 text-orange-600 border-l-4 border-orange-500 rounded-r-sm"
//                         : "text-gray-600 hover:bg-gray-50"
//                     }`
//                   }
//                 >
//                   <IconComponent size={20} />
//                   <span className="text-lg font-semibold">{item.label}</span>
//                 </NavLink>
//               );
//             })}
//           </div>
//         </nav>

//         <div className="p-4 border-t border-gray-200">
//           <button
//             onClick={handleLogOut}
//             className="flex items-center justify-center gap-3 px-4 py-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
//           >
//             <LogOut className="w-4 h-4" />
//             <span className="text-base font-semibold">Log Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar - Sticky */}
//         <header className="bg-white border-b border-gray-200 px-11 py-4 sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 text-[#1A1A1A] font-bold text-2xl">
//               Welcome back,{" "}
//               <span className="text-tagline font-bold">
//                 {userInfo?.profile?.full_name}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className=" rounded-full flex items-center justify-center cursor-pointer">
//                   <Avatar className="!w-12 !h-12">
//                     <AvatarImage
//                       src={
//                         userInfo?.profile?.profile_image ||
//                         "https://github.com/shadcn.png"
//                       }
//                       alt="User"
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content Area - Scrollable */}
//         <main className="flex-1 p-10 bg-white overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { Calendar, Settings, Bell, LogOut, Menu, X } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { BiCategory } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { baseApi, useGetUserProfileQuery } from "@/redux/features/baseApi";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = [
    {
      path: "/provider/provider_home",
      activePaths: ["/provider/provider_home"],
      icon: BiCategory,
      label: "Dashboard",
    },
    {
      path: "/provider/consultation",
      activePaths: [
        "/provider/consultation",
        "/provider/consultation_details/:id",
      ],
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

  const { data: userInfo } = useGetUserProfileQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.clear();
    dispatch(baseApi.util.resetApiState());
    navigate("/sign_in", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile, visible on md+ */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-68 bg-white shadow-sm border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png" alt="Logo" />
          </Link>
          <div className="mt-5">
            <img
              src="https://i.ibb.co.com/k6Bb2sMP/Line-26.png"
              alt="Divider"
            />
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isActive ||
                      item.activePaths?.some((path) =>
                        window.location.pathname.match(
                          path.replace(":id", "[0-9]+")
                        )
                      )
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
          <button
            onClick={() => {
              handleLogOut();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-3 px-4 py-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-base font-semibold">Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar - Sticky */}
        <header className="bg-white border-b border-gray-200 px-3 py-4 sticky top-0 z-30 flex items-center justify-between md:px-11">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className=" rounded-md hover:bg-gray-100 md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 text-[#1A1A1A] font-bold text-base text-center md:text-left md:text-2xl md:flex-none">
            Welcome back,{" "}
            <span className="text-tagline font-bold">
              {userInfo?.profile?.full_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="!w-10 !h-10 md:!w-12 md:!h-12">
              <AvatarImage
                src={
                  userInfo?.profile?.profile_image ||
                  "https://github.com/shadcn.png"
                }
                alt="User"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area - Scrollable */}
        <main className="flex-1 p-4 md:p-10 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
