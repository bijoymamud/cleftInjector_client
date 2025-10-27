

import React from "react";
import { GoLocation } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useGetFeaturedInjectorsQuery } from "@/redux/features/noAuthApi";
import { RiProfileLine } from "react-icons/ri";
import Specialist_Query from "./Specialist_Query";

const Injectors = () => {
  const { data: allInjectors, isLoading } = useGetFeaturedInjectorsQuery();

  console.log("allInjectors:", allInjectors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const injectors = allInjectors?.results || [];
  return (
    <section id="search_injectors">
      <Specialist_Query />

      <div className="container mx-auto py-20">
        <div className="flex items-center justify-between">
          <h1 className="text-[48px] font-bold text-title">
            Featured Injector
          </h1>
          <button className="bg-[#FF792C] hover:bg-[#ee6f25] text-white rounded-full py-[3px]">
            <Link
              to="/directory"
              className="text-white p-2   cursor-pointer font-medium"
            >
              View A ll Injector
            </Link>
          </button>
        </div>
        <div className="grid md:grid-cols-4 gap-5 px-3 md:px-0">
          {injectors?.slice(0, 4)?.map((injector) => (
            <div key={injector?.id}>
              <div class="relative flex flex-col md:my-6 bg-white   border-slate-200 rounded-lg shadow drop-shadow-xl shadow-gray-100">
                <div class="relative h-80  overflow-hidden text-white rounded-t-md">
                  <img
                    src={injector?.profile_image}
                    alt="injector-image"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div class="p-4">
                  <div className="flex items-center justify-between">
                    <h6 class="mb-2 text-xl font-semibold text-black">
                      {injector?.full_name}
                    </h6>
                    <div className="flex items-center gap-1">
                      <FaStar size={20} className="text-[#FACC15] mb-1" />
                      {injector?.avg_rating}
                    </div>
                  </div>
                  <p class="text-tagline leading-normal font-[550]">
                    {injector?.designation}
                  </p>

                  <div className="my-5">
                    <div className="flex items-center gap-3">
                      <GoLocation className="text-gray-600" size={16} />
                      <p>
                        {injector?.city}, {injector?.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {injector?.specialties
                      ?.split("\\n")
                      .map((specialty, index) => (
                        <div
                          key={index}
                          className="bg-[#FFE1D080] text-tagline rounded-full px-2 text-sm whitespace-nowrap"
                        >
                          {specialty}
                        </div>
                      ))}
                  </div>
                </div>

                <div class="px-4 pb-4 pt-0 mt-2 w-full ">
                  <Link
                    to={`/doctor-profile/${injector?.id}`}
                    state={{ injector }}
                  >
                    <Button className="w-full bg-[#FF792C] text-base hover:bg-[#ee6f25] text-white rounded-[12px] cursor-pointer">
                      <RiProfileLine size={20} />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Injectors;
