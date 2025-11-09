// import React from "react";
// import { useForm } from "react-hook-form";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "@/redux/slices/searchSlice";

// const Specialist_Query = () => {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch();

//   const onSubmit = (data) => {
//     const query = Object.values(data).filter(Boolean).join(" ").trim();

//     dispatch(setSearchQuery(query));
//   };

//   return (
//     <section>
//       {/* Banner */}
//       <div
//         className="relative w-full mb-8 sm:mb-12 md:mb-16 h-[300px] sm:h-[400px] md:h-[600px] bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://i.ibb.co.com/Cpk19K6z/Rectangle-34624394.png')",
//         }}
//       />

//       {/* Search Section */}
//       <div className="bg-[#F2F4F6] flex items-center justify-center p-4 sm:p-10 md:p-20">
//         <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl">
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title">
//               Find Your Specialist
//             </h1>
//             <p className="text-sm sm:text-base md:text-xl tracking-wide text-label">
//               Search our comprehensive directory of certified cleft lip
//               injection specialists
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-4 sm:space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="relative">
//                 <Input
//                   {...register("nameSpecialties")}
//                   placeholder="Search by Name, Specialities"
//                   className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none"
//                 />
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//               </div>

//               <div className="relative">
//                 <Input
//                   {...register("cityState")}
//                   placeholder="City, State"
//                   className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none"
//                 />
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//               </div>

//               <div className="relative">
//                 <Input
//                   {...register("country")}
//                   placeholder="Country"
//                   className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none"
//                 />
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <Button
//                 type="submit"
//                 className="bg-[#E26C29] cursor-pointer px-6 sm:px-8 md:px-10 hover:bg-[#cf5a16] text-white py-3 h-12 w-full sm:w-[180px] md:w-[200px] text-sm sm:text-base tracking-wide rounded-md flex items-center justify-center gap-2"
//               >
//                 Search
//                 <Search className="h-4 w-4" />
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Specialist_Query;

import React from "react";
import { useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/slices/searchSlice";

const Specialist_Query = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchSlice.query);

  const formValues = watch();
  const hasAnyValue = Object.values(formValues).some((val) => val?.trim());

  const onSubmit = (data) => {
    const query = Object.values(data).filter(Boolean).join(" ").trim();
    if (query) {
      dispatch(setSearchQuery(query));

      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById("search_results");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleClear = () => {
    reset();
    dispatch(setSearchQuery(""));
  };

  return (
    <section>
      {/* Banner */}
      <div
        className="relative w-full mb-8 sm:mb-12 md:mb-16 h-[300px] sm:h-[400px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/Cpk19K6z/Rectangle-34624394.png')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-title mb-3">
                Find Your Specialist
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Search our comprehensive directory of certified cleft lip
                injection specialists
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Input
                      {...register("nameSpecialties")}
                      placeholder="Name or Specialties"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="relative">
                    <Input
                      {...register("cityState")}
                      placeholder="City, State"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="relative">
                    <Input
                      {...register("country")}
                      placeholder="Country"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="bg-gradient-to-r from-[#cf5a16] cursor-pointer to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <Search className="h-5 w-5" />
                      Search Specialists
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {searchQuery && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                  <Search className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Searching for: <strong>{searchQuery}</strong>
                  </span>
                  <button
                    onClick={handleClear}
                    className="ml-2 hover:bg-orange-200 rounded-full p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialist_Query;
