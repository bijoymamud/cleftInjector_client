// import { Search, MapPin, Star, Award, Funnel } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { MdVerified } from "react-icons/md";
// import { useGetFeaturedInjectorsQuery } from "@/redux/features/noAuthApi";
// import { Link, useNavigate } from "react-router";
// import { useSearchInjectorQuery } from "@/redux/features/baseApi";

// export default function Directory() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const nameSpecialties = watch("nameSpecialties")?.trim() || "";
//   const cityState = watch("cityState")?.trim() || "";
//   const country = watch("country")?.trim() || "";

//   const combinedSearch = [nameSpecialties, cityState, country]
//     .filter(Boolean)
//     .join(" ");

//   const isSearching = combinedSearch.length > 0;

//   const {
//     data: searchData,
//     isFetching: isSearchingLoading,
//     isError: searchError,
//   } = useSearchInjectorQuery(
//     { search: combinedSearch },
//     { skip: !isSearching }
//   );

//   const { data: featuredData, isFetching: isFeaturedLoading } =
//     useGetFeaturedInjectorsQuery();

//   const injectors = isSearching
//     ? searchData?.results || []
//     : featuredData?.results || [];

//   const isLoading = isSearching ? isSearchingLoading : isFeaturedLoading;
//   const totalResults = injectors.length;

//   const onSubmit = (data) => {
//     console.log("Search submitted:", data);
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="relative mb-14 mt-24 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto">
//         <div
//           className="relative h-[50vh] w-full bg-center bg-cover rounded-2xl"
//           style={{
//             backgroundImage: `url('https://i.ibb.co.com/0pzPpQms/Frame-1707482902.jpg')`,
//           }}
//         >
//           <div className="absolute inset-0 bg-black/60" />
//           <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
//               Certified Cleft Lip Injector Directory
//             </h1>
//             <p className="text-lg md:text-xl max-w-2xl font-thin mb-6">
//               This feature allows patients and families to easily search for
//               qualified and trained cleft lip injectors near them.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search Form */}
//       <div className="bg-white container mx-auto">
//         <div className="container mx-auto">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
//             <div className="flex items-center justify-between gap-6">
//               <div className="flex w-full gap-4">
//                 {/* Name / Specialties */}
//                 <div className="relative w-1/3">
//                   <Input
//                     {...register("nameSpecialties")}
//                     placeholder="Search by Name, Specialities"
//                     className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 </div>

//                 {/* City / State */}
//                 <div className="relative w-1/3">
//                   <Input
//                     {...register("cityState")}
//                     placeholder="City, State"
//                     className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 </div>

//                 {/* Country */}
//                 <div className="relative w-1/3">
//                   <Input
//                     {...register("country")}
//                     placeholder="Country"
//                     className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg hover:text-white !px-7 !py-5"
//               >
//                 <Search className="h-4 w-4" />
//                 Search
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="w-full h-1 border-b shadow-2xl shadow-orange-500 container mx-auto border-gray-400"></div>

//       {/* Main Content */}
//       <div className="container mx-auto py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Map */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <img
//               src="https://i.ibb.co.com/0jZwZS18/Rectangle-14.png"
//               alt="Map"
//               className="object-cover w-full rounded-lg"
//             />
//           </div>

//           {/* Results */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between pb-10">
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl font-semibold text-[#333333]">
//                   Available Injector
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   ({isLoading ? "..." : totalResults} results found)
//                 </p>
//               </div>
//             </div>

//             {/* Loading */}
//             {isLoading && (
//               <div className="text-center py-10 text-gray-500">
//                 Searching injectors...
//               </div>
//             )}

//             {/* Error */}
//             {searchError && isSearching && (
//               <div className="text-center py-10 text-red-500">
//                 Failed to search. Please try again.
//               </div>
//             )}

//             {/* Empty */}
//             {!isLoading && totalResults === 0 && (
//               <div className="text-center py-10 text-gray-500">
//                 No injectors found matching your criteria.
//               </div>
//             )}

//             {/* Injector Cards */}
//             <div className="space-y-4">
//               {injectors.map((injector) => (
//                 <div
//                   key={injector.id}
//                   className="border bg-[#FFFBF9] border-gray-200 drop-shadow-md hover:shadow-md transition-shadow rounded-[20px] cursor-pointer"
//                 >
//                   <div className="p-8">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={injector.profile_image || "/placeholder.svg"}
//                           alt={injector.full_name}
//                           className="w-16 h-16 rounded-full object-cover"
//                         />
//                         <div>
//                           <h3 className="text-gray-900 text-xl font-semibold flex items-center gap-2">
//                             {injector.full_name}
//                             {injector.is_verified && (
//                               <MdVerified
//                                 className="text-[#41A3FF]"
//                                 size={20}
//                               />
//                             )}
//                           </h3>
//                           <p className="text-[#5C5C5C]">
//                             {injector.designation}
//                           </p>
//                           <p className="font-semibold text-xl py-2">
//                             ${injector.consultation_fee}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Star
//                           size={20}
//                           className="fill-[#FACC15] text-[#FACC15]"
//                         />
//                         <span className="font-[550]">
//                           {injector.avg_rating}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4 text-sm pt-4 text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <MapPin size={20} className="text-tagline" />
//                         <span className="font-[550] text-base">
//                           {injector.city}, {injector.country}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Award size={20} className="text-tagline" />
//                         <span className="font-[550] text-base">
//                           {injector.years_of_experience} Years Experience
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-5 w-full flex gap-3">
//                       <Link
//                         to={`/doctor-profile/${injector.id}`}
//                         state={{ injector }}
//                         className="flex-1 text-center py-3 text-base font-semibold basis-6/12 rounded-full border border-[#E26C29] text-[#E26C29] font-medium hover:bg-[#E26C29]/10 transition"
//                       >
//                         View Profile
//                       </Link>
//                       <button
//                         onClick={() => navigate(-1)}
//                         className="inline-flex !basis-6/12 items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg hover:text-white !px-7 !py-5"
//                       >
//                         Back
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Search, MapPin, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { MdVerified } from "react-icons/md";
import { useGetFeaturedInjectorsQuery } from "@/redux/features/noAuthApi";
import { Link, useNavigate } from "react-router";
import { useSearchInjectorQuery } from "@/redux/features/baseApi";

export default function Directory() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const nameSpecialties = watch("nameSpecialties")?.trim() || "";
  const cityState = watch("cityState")?.trim() || "";
  const country = watch("country")?.trim() || "";

  const combinedSearch = [nameSpecialties, cityState, country]
    .filter(Boolean)
    .join(" ");

  const isSearching = combinedSearch.length > 0;

  const {
    data: searchData,
    isFetching: isSearchingLoading,
    isError: searchError,
  } = useSearchInjectorQuery(
    { search: combinedSearch },
    { skip: !isSearching }
  );

  const { data: featuredData, isFetching: isFeaturedLoading } =
    useGetFeaturedInjectorsQuery();

  const injectors = isSearching
    ? searchData?.results || []
    : featuredData?.results || [];

  const isLoading = isSearching ? isSearchingLoading : isFeaturedLoading;
  const totalResults = injectors.length;

  const onSubmit = (data) => {
    console.log("Search submitted:", data);
  };

  return (
    <div className="min-h-screen px-3 md:px-0">
      <div className="relative mb-8 md:mb-14 mt-8 md:mt-24 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto md:px-0">
        <div
          className="relative h-[40vh] md:h-[50vh] w-full bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/0pzPpQms/Frame-1707482902.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-3 md:mb-4 tracking-wide">
              Certified Cleft Lip Injector Directory
            </h1>
            <p className="text-sm sm:text-base md:text-xl max-w-2xl font-thin mb-4 md:mb-6">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto  md:px-0">
        <div className="container mx-auto">
          <div
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6 pb-6 md:pb-10"
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-6">
              <div className="flex flex-col md:flex-row w-full gap-3 md:gap-4">
                {/* Name / Specialties */}
                <div className="relative w-full md:w-1/3">
                  <Input
                    {...register("nameSpecialties")}
                    placeholder="Search by Name, Specialities"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* City / State */}
                <div className="relative w-full md:w-1/3">
                  <Input
                    {...register("cityState")}
                    placeholder="City, State"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Country */}
                <div className="relative w-full md:w-1/3">
                  <Input
                    {...register("country")}
                    placeholder="Country"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              <Button
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg hover:text-white !px-6 md:!px-7 !py-5 w-full md:w-auto"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1 border-b shadow-2xl shadow-orange-500 container mx-auto border-gray-400"></div>

      {/* Main Content */}
      <div className="container mx-auto py-6 md:py-10 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 order-2 lg:order-1">
            <img
              src="https://i.ibb.co.com/0jZwZS18/Rectangle-14.png"
              alt="Map"
              className="object-cover w-full rounded-lg"
            />
          </div>

          {/* Results */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between pb-6 md:pb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Available Injector
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  ({isLoading ? "..." : totalResults} results found)
                </p>
              </div>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-10 text-gray-500">
                Searching injectors...
              </div>
            )}

            {/* Error */}
            {searchError && isSearching && (
              <div className="text-center py-10 text-red-500">
                Failed to search. Please try again.
              </div>
            )}

            {/* Empty */}
            {!isLoading && totalResults === 0 && (
              <div className="text-center py-10 text-gray-500">
                No injectors found matching your criteria.
              </div>
            )}

            {/* Injector Cards */}
            <div className="space-y-4">
              {injectors.map((injector) => (
                <div
                  key={injector.id}
                  className="border bg-[#FFFBF9] border-gray-200 drop-shadow-md hover:shadow-md transition-shadow rounded-[20px] cursor-pointer"
                >
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={injector.profile_image || "/placeholder.svg"}
                          alt={injector.full_name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 text-lg sm:text-xl font-semibold flex items-center gap-2 flex-wrap">
                            <span className="truncate">
                              {injector.full_name}
                            </span>
                            {injector.is_verified && (
                              <MdVerified
                                className="text-[#41A3FF] flex-shrink-0"
                                size={20}
                              />
                            )}
                          </h3>
                          <p className="text-[#5C5C5C] text-sm sm:text-base">
                            {injector.designation}
                          </p>
                          <p className="font-semibold text-lg sm:text-xl py-1 sm:py-2">
                            ${injector.consultation_fee}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <Star
                          size={20}
                          className="fill-[#FACC15] text-[#FACC15]"
                        />
                        <span className="font-[550]">
                          {injector.avg_rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm pt-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin
                          size={18}
                          className="text-tagline flex-shrink-0"
                        />
                        <span className="font-[550] text-sm sm:text-base">
                          {injector.city}, {injector.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award
                          size={18}
                          className="text-tagline flex-shrink-0"
                        />
                        <span className="font-[550] text-sm sm:text-base">
                          {injector.years_of_experience} Years Experience
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-5 w-full flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/doctor-profile/${injector.id}`}
                        state={{ injector }}
                        className="flex-1 text-center py-3 text-sm sm:text-base font-semibold sm:basis-6/12 rounded-full border border-[#E26C29] text-[#E26C29] font-medium hover:bg-[#E26C29]/10 transition"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => navigate(-1)}
                        className="inline-flex sm:!basis-6/12 items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg hover:text-white !px-6 sm:!px-7 !py-5"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
