import { Search, MapPin, Star, Award, Funnel } from "lucide-react";
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
    <div className="min-h-screen">
      <div className="relative mb-14 mt-24 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto">
        <div
          className="relative h-[50vh] w-full bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/0pzPpQms/Frame-1707482902.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
              Certified Cleft Lip Injector Directory
            </h1>
            <p className="text-lg md:text-xl max-w-2xl font-thin mb-6">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white container mx-auto">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
            <div className="flex items-center justify-between gap-6">
              <div className="flex w-full gap-4">
                {/* Name / Specialties */}
                <div className="relative w-1/3">
                  <Input
                    {...register("nameSpecialties")}
                    placeholder="Search by Name, Specialities"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* City / State */}
                <div className="relative w-1/3">
                  <Input
                    {...register("cityState")}
                    placeholder="City, State"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Country */}
                <div className="relative w-1/3">
                  <Input
                    {...register("country")}
                    placeholder="Country"
                    className="pl-10 h-12 border border-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              <Button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg hover:text-white !px-7 !py-5"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full h-1 border-b shadow-2xl shadow-orange-500 container mx-auto border-gray-400"></div>

      {/* Main Content */}
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <img
              src="https://i.ibb.co.com/0jZwZS18/Rectangle-14.png"
              alt="Map"
              className="object-cover w-full rounded-lg"
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-[#333333]">
                  Available Injector
                </h2>
                <p className="text-sm text-gray-500">
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
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={injector.profile_image || "/placeholder.svg"}
                          alt={injector.full_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-gray-900 text-xl font-semibold flex items-center gap-2">
                            {injector.full_name}
                            {injector.is_verified && (
                              <MdVerified
                                className="text-[#41A3FF]"
                                size={20}
                              />
                            )}
                          </h3>
                          <p className="text-[#5C5C5C]">
                            {injector.designation}
                          </p>
                          <p className="font-semibold text-xl py-2">
                            ${injector.consultation_fee}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star
                          size={20}
                          className="fill-[#FACC15] text-[#FACC15]"
                        />
                        <span className="font-[550]">
                          {injector.avg_rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm pt-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={20} className="text-tagline" />
                        <span className="font-[550] text-base">
                          {injector.city}, {injector.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={20} className="text-tagline" />
                        <span className="font-[550] text-base">
                          {injector.years_of_experience} Years Experience
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 w-full flex gap-3">
                      <Link
                        to={`/doctor-profile/${injector.id}`}
                        state={{ injector }}
                        className="flex-1 text-center py-3 text-base font-semibold basis-6/12 rounded-full border border-[#E26C29] text-[#E26C29] font-medium hover:bg-[#E26C29]/10 transition"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => navigate(-1)}
                        className="inline-flex !basis-6/12 items-center justify-center gap-2 whitespace-nowrap h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg hover:text-white !px-7 !py-5"
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
