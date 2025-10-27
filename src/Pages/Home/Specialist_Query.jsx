import React from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Specialist_Query = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Search data:", data);
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
      />

      {/* Search Section */}
      <div className="bg-[#F2F4F6] flex items-center justify-center p-4 sm:p-10 md:p-20">
        <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title">
              Find Your Specialist
            </h1>
            <p className="text-sm sm:text-base md:text-xl tracking-wide text-label">
              Search our comprehensive directory of certified cleft lip
              injection specialists
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name / Specialities */}
              <div className="relative">
                <Input
                  {...register("nameSpecialties")}
                  placeholder="Search by Name, Specialities"
                  className="pl-10 h-12 border border-gray-300 
                             outline-none focus:outline-none 
                             focus-visible:outline-none 
                             focus:ring-0 focus-visible:ring-0 
                             shadow-none focus:shadow-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* City / State */}
              <div className="relative">
                <Input
                  {...register("cityState")}
                  placeholder="City, State"
                  className="pl-10 h-12 border border-gray-300 
                             outline-none focus:outline-none 
                             focus-visible:outline-none 
                             focus:ring-0 focus-visible:ring-0 
                             shadow-none focus:shadow-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Country */}
              <div className="relative">
                <Input
                  {...register("country")}
                  placeholder="Country"
                  className="pl-10 h-12 border border-gray-300 
                             outline-none focus:outline-none 
                             focus-visible:outline-none 
                             focus:ring-0 focus-visible:ring-0 
                             shadow-none focus:shadow-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#E26C29] cursor-pointer px-6 sm:px-8 md:px-10 hover:bg-[#cf5a16] 
                           text-white py-3 h-12 w-full sm:w-[180px] md:w-[200px] text-sm sm:text-base tracking-wide
                           rounded-md flex items-center justify-center gap-2"
              >
                Search
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Specialist_Query;
