import React from "react";

const Certification_Process = () => {
  const values = [
    {
      id: 1,
      description:
        "Thorough review of medical licenses, certifications, and professional credentials.",
      title: "Credential Verification",
    },
    {
      id: 2,
      description:
        "Evaluation of clinical experience and specialization in cleft lip injection procedures.",
      title: "Experience Assessment",
    },
    {
      id: 3,
      description:
        "Comprehensive background screening and professional reference verification.",
      title: "Background Check",
    },
    {
      id: 4,
      description:
        "Continuous monitoring of patient feedback and professional standing.",
      title: "Ongoing Monitoring",
    },
  ];

  return (
    <div className="md:py-20">
      <div className="pb-10 md:pb-14">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-title text-center leading-tight capitalize">
            Our Certification Process
          </h1>
          <p className="text-label text-base sm:text-lg leading-relaxed text-center mt-4 sm:mt-5 w-full sm:w-11/12 md:w-3/6 mx-auto">
            We maintain rigorous standards to ensure every specialist in our
            network meets the highest qualifications for patient safety and care
            excellence.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-10">
            {values.map((value) => (
              <div
                key={value?.id}
                className="text-center p-5 sm:p-7 md:p-10 bg-white rounded-lg md:rounded-none"
              >
                <div className="bg-[#E26C291A] p-2 rounded-full w-[45px] sm:w-[48px] md:w-[50px] h-[45px] sm:h-[48px] md:h-[50px] flex items-center justify-center mx-auto">
                  <h1 className="text-xl sm:text-2xl text-tagline font-bold">
                    {value?.id}
                  </h1>
                </div>
                <h2 className="text-black text-base sm:text-lg md:text-xl font-semibold leading-relaxed mt-3 sm:mt-4 md:mt-5">
                  {value?.title}
                </h2>
                <p className="text-label text-sm sm:text-base mt-2 sm:mt-3">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification_Process;
