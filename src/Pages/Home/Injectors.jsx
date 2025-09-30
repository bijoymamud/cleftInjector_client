import React from "react";
import { GoLocation } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoCalendarClearOutline } from "react-icons/io5";
import Specialist_Query from "./Specialist_Query";

const injectors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    designation: "Plastic Surgeon",
    location: "Dhaka, Bangladesh",
    special_at: "Cleft Lip & Facial Reconstruction",
    image:
      "https://newlotusmedical.com/wp-content/uploads/elementor/thumbs/3-r55wrprumxo6ffk0w5ulkfpfxwa1qxvu7izx7ds41c.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. John Smith",
    designation: "Dermatologist",
    location: "Chittagong, Bangladesh",
    special_at: "Facial Aesthetics & Botox",
    image:
      "https://zhumc.org.lb/wp-content/uploads/2019/03/ghasan-slim-500x600.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Dr. Maria Khan",
    designation: "Cosmetic Surgeon",
    location: "Sylhet, Bangladesh",
    special_at: "Lip Augmentation & Injectable Fillers",
    image: "https://cvhcp.com/wp-content/uploads/2024/04/Dr-Ladd-1.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dr. Michel Chen",
    designation: "Plastic Surgeon",
    location: "Sylhet, Bangladesh",
    special_at: "Lip Augmentation & Injectable Fillers",
    image:
      "https://wockhardthospitals.com/wp-content/uploads/2023/05/Dr-Ankit-Gupta-3-2.png",
    rating: 4.9,
  },
];

const Injectors = () => {
  return (
    <section id="search_injectors">
      <Specialist_Query />

      <div className="container mx-auto py-20">
        <div className="flex items-center justify-between">
          <h1 className="text-[48px] font-bold text-title">
            Featured Injector
          </h1>
          <p className="text-tagline hover:underline cursor-pointer font-medium">
            View A ll Injector
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-5 px-3 md:px-0">
          {injectors.map((injector) => (
            <div key={injector?.id}>
              <div class="relative flex flex-col md:my-6 bg-white   border-slate-200 rounded-lg shadow drop-shadow-xl shadow-gray-100">
                <div class="relative h-80  overflow-hidden text-white rounded-t-md">
                  <img
                    src={injector?.image}
                    alt="injector-image"
                    className="w-"
                  />
                </div>
                <div class="p-4">
                  <div className="flex items-center justify-between">
                    <h6 class="mb-2 text-xl font-semibold text-black">
                      {injector?.name}
                    </h6>
                    <div className="flex items-center gap-1">
                      <FaStar size={20} className="text-[#FACC15] mb-1" />
                      {injector?.rating}
                    </div>
                  </div>
                  <p class="text-tagline leading-normal font-[550]">
                    {injector?.designation}
                  </p>

                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <GoLocation className="text-gray-600" size={16} />
                      {injector?.location}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {injector?.special_at.split("&").map((item, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-[#FFE1D0] gap-10 text-[#E26C29] border-none rounded-s-full rounded-e-full"
                      >
                        {item.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div class="px-4 pb-4 pt-0 mt-2 w-full ">
                  <Button className="w-full bg-[#FF792C] hover:bg-[#ee6f25] text-white rounded-[12px] cursor-pointer">
                    <IoCalendarClearOutline size={20} />
                    Book Consultation
                  </Button>
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
