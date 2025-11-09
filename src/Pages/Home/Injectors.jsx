// import React from "react";
// import { GoLocation } from "react-icons/go";
// import { FaStar } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import { useGetFeaturedInjectorsQuery } from "@/redux/features/noAuthApi";
// import { RiProfileLine } from "react-icons/ri";
// import Specialist_Query from "./Specialist_Query";
// import { useSelector } from "react-redux";
// import { useSearchInjectorsFromHomeQuery } from "@/redux/features/baseApi";
// import { Link } from "react-router";

// const Injectors = () => {
//   const searchQuery = useSelector((state) => state.searchSlice.query);

//   const { data: searchData, isLoading: searchLoading } =
//     useSearchInjectorsFromHomeQuery(searchQuery, {
//       skip: !searchQuery,
//     });

//   const { data: featuredData, isLoading: featuredLoading } =
//     useGetFeaturedInjectorsQuery(undefined, {
//       skip: !!searchQuery,
//     });

//   const isLoading = searchLoading || featuredLoading;
//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   const injectors = searchQuery
//     ? searchData?.results || []
//     : featuredData?.results?.slice(0, 4) || [];

//   return (
//     <section id="search_injectors">
//       <Specialist_Query />
//       <div className="container mx-auto py-20">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-[48px] font-bold text-title">
//             {searchQuery ? "Search Results" : "Featured Injector"}
//           </h1>
//           {!searchQuery && (
//             <button className="bg-[#FF792C] hover:bg-[#ee6f25] text-white rounded-full py-[3px]">
//               <Link
//                 to="/directory"
//                 className="text-white px-4 py-2 cursor-pointer font-medium block"
//               >
//                 View All Injector
//               </Link>
//             </button>
//           )}
//         </div>

//         {searchQuery && injectors.length === 0 && (
//           <p className="text-center py-10 text-gray-600">
//             No results found for "<strong>{searchQuery}</strong>"
//           </p>
//         )}

//         <div className="grid md:grid-cols-4 gap-5 px-3 md:px-0">
//           {injectors.map((injector) => (
//             <div key={injector?.id}>
//               <div className="relative flex flex-col bg-white border-slate-200 rounded-lg shadow drop-shadow-xl shadow-gray-100">
//                 <div className="relative h-80 overflow-hidden text-white rounded-t-md">
//                   <img
//                     src={injector?.profile_image}
//                     alt="injector-image"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-center justify-between">
//                     <h6 className="mb-2 text-xl font-semibold text-black">
//                       {injector?.full_name}
//                     </h6>
//                     <div className="flex items-center gap-1">
//                       <FaStar size={20} className="text-[#FACC15] mb-1" />
//                       {injector?.avg_rating || "N/A"}
//                     </div>
//                   </div>
//                   <p className="text-tagline leading-normal font-[550]">
//                     {injector?.designation}
//                   </p>
//                   <div className="my-5">
//                     <div className="flex items-center gap-3">
//                       <GoLocation className="text-gray-600" size={16} />
//                       <p>
//                         {injector?.city}, {injector?.country}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-3">
//                     {injector?.specialties
//                       ?.split("\\n")
//                       .filter(Boolean)
//                       .map((specialty, index) => (
//                         <div
//                           key={index}
//                           className="bg-[#FFE1D080] text-tagline rounded-full px-2 text-sm whitespace-nowrap"
//                         >
//                           {specialty.trim()}
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//                 <div className="px-4 pb-4 pt-0 mt-2 w-full">
//                   <Link
//                     to={`/doctor-profile/${injector?.id}`}
//                     state={{ injector }}
//                   >
//                     <Button className="w-full bg-[#FF792C] text-base hover:bg-[#ee6f25] text-white rounded-[12px] cursor-pointer">
//                       <RiProfileLine size={20} /> View Profile
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Injectors;

import React, { useRef } from "react";
import { GoLocation } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useGetFeaturedInjectorsQuery } from "@/redux/features/noAuthApi";
import { RiProfileLine } from "react-icons/ri";
import Specialist_Query from "./Specialist_Query";
import { useSelector } from "react-redux";
import { useSearchInjectorsFromHomeQuery } from "@/redux/features/baseApi";
import { Link } from "react-router";
import { Search } from "lucide-react";

const Injectors = () => {
  const searchQuery = useSelector((state) => state.searchSlice.query);
  const resultsRef = useRef(null);

  const {
    data: searchData,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useSearchInjectorsFromHomeQuery(searchQuery, {
    skip: !searchQuery,
  });

  const { data: featuredData, isLoading: featuredLoading } =
    useGetFeaturedInjectorsQuery(undefined, {
      skip: !!searchQuery,
    });

  const isLoading = searchLoading || featuredLoading || searchFetching;

  const injectors = searchQuery
    ? searchData?.results || []
    : featuredData?.results?.slice(0, 4) || [];

  return (
    <section id="search_injectors">
      <Specialist_Query />

      <div
        id="search_results"
        ref={resultsRef}
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {searchQuery ? "Search Results" : "Featured Injectors"}
            </h1>
            {injectors.length > 0 && (
              <p className="text-gray-600">
                {searchQuery
                  ? `Found ${injectors.length} specialist${
                      injectors.length !== 1 ? "s" : ""
                    }`
                  : `Showing ${injectors.length} featured specialists`}
              </p>
            )}
          </div>

          {!searchQuery && (
            <Link to="/directory">
              <Button className="bg-gradient-to-r hover:cursor-pointer text-base from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                View All Injectors
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading specialists...
            </p>
          </div>
        ) : searchQuery && injectors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We couldn't find any specialists matching "
              <strong>{searchQuery}</strong>"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {injectors.map((injector, index) => (
              <div
                key={injector?.id}
                className="group"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative flex flex-col bg-white rounded-2xl shadow-lg  overflow-hidden h-full border border-gray-100">
                  {/* Image Section */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                    <img
                      src={injector?.profile_image}
                      alt={injector?.full_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                      <FaStar className="text-yellow-400" size={16} />
                      <span className="font-bold text-gray-900">
                        {injector?.avg_rating
                          ? Number(injector.avg_rating).toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                        {injector?.full_name}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-3 line-clamp-1">
                        {injector?.designation}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <GoLocation className="flex-shrink-0" size={18} />
                        <p className="text-sm line-clamp-1">
                          {injector?.city}, {injector?.country}
                        </p>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {injector?.specialties
                          ?.split("\\n")
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-orange-50 text-orange-700 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap border border-orange-100"
                            >
                              {specialty.trim()}
                            </span>
                          ))}
                        {injector?.specialties?.split("\\n").filter(Boolean)
                          .length > 3 && (
                          <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">
                            +
                            {injector?.specialties?.split("\\n").filter(Boolean)
                              .length - 3}{" "}
                            more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link
                        to={`/doctor-profile/${injector?.id}`}
                        state={{ injector }}
                      >
                        <Button className="w-full bg-gradient-to-r hover:cursor-pointer text-[17px]  from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-[#cf5a16] text-white rounded-xl font-semibold h-11 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                          <RiProfileLine size={24} />
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Injectors;
