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
    <div className="py-20">
      <div className="pb-14 bg-[#FFF7ED]">
        {/* //main text */}
        <div className="container mx-auto py-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title  text-center leading-tight capitalize">
            Our Impact
          </h1>
          <p className="text-label text-lg leading-relaxed text-center mt-5 w-2/5 mx-auto">
            Numbers that reflect our commitment to connecting patients with
            qualified specialists worldwide.
          </p>
        </div>

        <div className=" container mx-auto">
          <div className="grid grid-cols-4 gap-10">
            {values.map((value) => (
              <div
                key={value?.id}
                className="shadow-md shadow-gray-200 text-center p-10 drop-shadow-md rounded-[20px] bg-white"
              >
                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-tagline  text-center leading-tight capitalize">
                  {value?.value}
                </h1>
                <h1 className="text-black text-xl font-semibold leading-relaxed">
                  {value?.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
