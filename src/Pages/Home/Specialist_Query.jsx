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
        className="relative w-full  h-[200px]  md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/MynhVqZM/augmentation-improvement-lips-professional-salon.jpg')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title py-3 md:py-5">
                Find Your Specialist
              </h2>
              <p className="text-label md:mx-auto text-base md:text-xl w-11/12 md:w-8/12">
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
                      className="pl-10 h-12 border-2 md:text-base text-sm border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="relative">
                    <Input
                      {...register("cityState")}
                      placeholder="City, State"
                      className="pl-10 h-12 border-2 md:text-base text-sm  border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="relative">
                    <Input
                      {...register("country")}
                      placeholder="Country"
                      className="pl-10 h-12 border-2 md:text-base text-sm  border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="bg-gradient-to-r from-[#cf5a16] cursor-pointer to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 h-12  font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 md:text-lg text-base"
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
