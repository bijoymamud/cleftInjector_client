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
    <div className="py-20">
      <div className="pb-14 ">
        {/* //main text */}
        <div className="container mx-auto py-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title  text-center leading-tight capitalize">
            Our Certification Process
          </h1>
          <p className="text-label text-lg leading-relaxed text-center mt-5 w-3/6 mx-auto">
            We maintain rigorous standards to ensure every specialist in our
            network meets the highest qualifications for patient safety and care
            excellence.
          </p>
        </div>

        <div className=" container mx-auto">
          <div className="grid grid-cols-4 gap-10">
            {values.map((value) => (
              <div key={value?.id} className=" text-center p-10  bg-white">
                <div className="bg-[#E26C291A]/90 p-2 rounded-full w-[50px] flex text-center mx-auto justify-center">
                  <h1 className="text-2xl text-tagline ">{value?.id}</h1>
                </div>
                <h1 className="text-black py-5 text-xl font-semibold leading-relaxed">
                  {value?.title}
                </h1>
                <h1 className="text-label text-lg">{value?.description}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification_Process;
