import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";

const Our_Vision = () => {
  return (
    <div className="pb-20">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title leading-tight">
            Our Vision
          </h2>
          <p className="text-label text-base md:text-lg mt-5 leading-relaxed">
            <span className="text-lg md:text-xl font-semibold text-tagline">
              Our vision
            </span>
            <span className="ms-2 text-black text-xl">
              is simple: education, safety, and empowerment - so that no one has
              to feel alone when seeking treatment.
            </span>
          </p>

          <p className="text-label text-base md:text-lg mt-6 leading-relaxed">
            We believe that everyone born with a cleft lip deserves access to
            care delivered with expertise, compassion, and integrity. That’s why
            we’re building a global directory where verified injectors can be
            found quickly and confidently, helping clients feel safe and
            supported in their journey.
          </p>

          <Link to="/get-listed">
            <Button
              variant="ghost"
              className="mt-8 w-[250px] py-7 text-white rounded-xl text-lg  bg-[#E26C29] hover:text-white  hover:bg-[#E26C29]/95 cursor-pointer  flex items-center gap-3"
            >
              <FaRegUser className="h-5 w-5 text-white" />
              Get Listed
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co.com/PZ2Pcr0z/Rectangle-34624395.png"
            alt="Cleft Lip Treatment"
            className="w-full md:w-3/4 rounded-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Our_Vision;
