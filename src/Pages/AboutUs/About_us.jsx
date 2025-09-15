import React from "react";

const About_us = () => {
  return (
    <section className="min-h-screen">
      <div className="relative my-14 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto">
        <div className="relative h-[50vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co.com/vxV6j5Xk/Frame-1707482945.jpg')] rounded-2xl">
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

      <div className="bg-[#F2F4F6] p-14  my-24">
        <div className="container  mx-auto flex items-center justify-center gap-20">
          <div className="basis-6/12">
            <h1 className="text-[48px] font-bold text-title">Our Mission </h1>
            <p className="text-label text-base my-5">
              At CleftInject, our mission is to make safe, certified cleft lip
              injectors accessible to everyone who needs them. Founded by
              Lindsay Owens, a trainer and advocate for cleft lip treatment
              worldwide, this platform was created to connect clients and
              families with trusted professionals who have completed specialist
              training
            </p>

            <p className="text-label mt-10 text-base">
              We've built a trusted network that prioritizes patient safety,
              professional excellence, and transparent communication throughout
              the entire treatment journey.
            </p>
          </div>
          <div className="basis-6/12 flex items-center justify-end">
            <img
              src="https://i.ibb.co.com/qFFJwV2T/Rectangle-15.png"
              alt=""
              className=" w-3/4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About_us;
