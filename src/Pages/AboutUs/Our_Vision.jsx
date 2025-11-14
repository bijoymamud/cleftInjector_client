import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";

const Our_Vision = () => {
  return (
    <div className="pb-10 md:pb-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center px-4 sm:px-6">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-title leading-tight">
            Our Vision
          </h2>

          <p className="text-label text-sm sm:text-base md:text-lg mt-4 sm:mt-5 leading-relaxed">
            <span className="text-base sm:text-lg md:text-xl font-semibold text-tagline">
              Our vision
            </span>
            <span className="ms-2 text-black text-lg sm:text-xl">
              {" "}
              is simple: education, safety, and empowerment — so that no one has
              to feel alone when seeking treatment.
            </span>
          </p>

          <p className="text-label text-sm sm:text-base md:text-lg mt-5 sm:mt-6 leading-relaxed">
            We believe that everyone born with a cleft lip deserves access to
            care delivered with expertise, compassion, and integrity. That’s why
            we’re building a global directory where verified injectors can be
            found quickly and confidently, helping clients feel safe and
            supported in their journey.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link to="/get-listed">
              <Button
                variant="ghost"
                className="mt-6 sm:mt-8 w-full sm:w-[250px] py-5 sm:py-7 text-white rounded-xl text-base sm:text-lg bg-[#E26C29] hover:text-white hover:bg-[#E26C29]/95 cursor-pointer flex items-center justify-center gap-3"
              >
                <FaRegUser className="h-5 w-5 text-white" />
                Get Listed
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center mt-6 md:mt-0">
          <img
            src="https://i.ibb.co.com/PZ2Pcr0z/Rectangle-34624395.png"
            alt="Cleft Lip Treatment"
            className="w-full max-w-sm sm:max-w-md md:max-w-none md:w-3/4 rounded-2xl shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Our_Vision;
