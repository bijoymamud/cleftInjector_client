import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import Core_values from "./Core_values";
import Certification_process from "./Impact";
import Impact from "./Impact";
import Certification_Process from "./Certification_process";
import Our_Vision from "./Our_Vision";

const About_us = () => {
  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative my-14 mt-24 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto">
        <div className="relative h-[50vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co.com/vxV6j5Xk/Frame-1707482945.jpg')] rounded-2xl">
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
              Certified Cleft Lip Injector Directory
            </h1>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl font-light mb-6">
              Helping patients and families easily connect with qualified,
              certified cleft lip injectors nearby.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#F2F4F6] py-16 px-6 md:px-14 my-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title leading-tight">
              Our Mission
            </h2>
            <p className="text-label text-base md:text-lg mt-5 leading-relaxed">
              At{" "}
              <span className="text-lg md:text-xl font-semibold text-tagline">
                CleftInject
              </span>
              , our mission is to make safe, certified cleft lip injectors
              accessible to everyone who needs them. Founded by{" "}
              <span className="font-medium">Lindsay Owens</span>, a trainer and
              advocate for cleft lip treatment worldwide, this platform was
              created to connect families with trusted professionals who have
              completed specialist training.
            </p>

            <p className="text-label text-base md:text-lg mt-6 leading-relaxed">
              We’ve built a network that prioritizes patient safety,
              professional excellence, and transparent communication throughout
              the entire treatment journey.
            </p>

            <Button
              variant="ghost"
              className="mt-8 w-[250px] py-7 text-white rounded-xl text-lg  bg-[#E26C29]  hover:bg-[#E26C29]/95 cursor-pointer  flex items-center gap-3"
            >
              <Search className="h-5 w-5 text-white" />
              Find a Specialist
            </Button>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co.com/qFFJwV2T/Rectangle-15.png"
              alt="Cleft Lip Treatment"
              className="w-full md:w-3/4 rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>

      <Core_values />
      <Impact />
      <Certification_Process />
      <Our_Vision />
    </section>
  );
};

export default About_us;
