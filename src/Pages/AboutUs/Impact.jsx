

import React from "react";

const Impact = () => {
  const values = [
    {
      id: 1,
      value: "500+",
      title: "Certified Specialists",
    },
    {
      id: 2,
      value: "50+",
      title: "Countries Served",
    },
    {
      id: 3,
      value: "10K+",
      title: "Successful Consultations",
    },
    {
      id: 4,
      value: "98%",
      title: "Patient Satisfaction",
    },
  ];

  return (
    <div className="md:py-20 pt-14">
      <div className="md:pb-14 pb-10 bg-[#FFF7ED]">
        {/* Main Text */}
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-title text-center leading-tight capitalize">
            Our Impact
          </h1>
          <p className="text-label text-base sm:text-lg leading-relaxed text-center mt-4 sm:mt-5 w-full sm:w-11/12 md:w-2/5 mx-auto">
            Numbers that reflect our commitment to connecting patients with
            qualified specialists worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {values.map((value) => (
              <div
                key={value?.id}
                className="shadow-md shadow-gray-200 text-center p-5 sm:p-7 md:p-10 drop-shadow-md rounded-[20px] bg-white"
              >
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-tagline leading-tight">
                  {value?.value}
                </h1>
                <h2 className="text-black text-sm sm:text-base md:text-xl font-semibold leading-relaxed mt-2">
                  {value?.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
