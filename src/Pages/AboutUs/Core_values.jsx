import React from "react";

const Core_values = () => {
  const values = [
    {
      id: 1,
      image: "https://i.ibb.co.com/RTMp8Nrb/Frame-6.png",
      title: "Safety First",
      description:
        "Every specialist in our network is thoroughly vetted and certified, ensuring patient safety is never compromised.",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/RkgwTNkJ/Frame-7.png",
      title: "Patient Care",
      description:
        "We prioritize compassionate, personalized care that puts patient comfort and satisfaction at the center of every interaction.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/QvzprJvh/Frame-8.png",
      title: "Excellence",
      description:
        "We maintain the highest standards of professional excellence, continuously improving our platform and services.",
    },
  ];

  return (
    <div className="md:pb-14 pt-14 md:pt-0 bg-[#F9FAFB]">
      {/* //main text */}
      <div className="container mx-auto md:py-10 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-title text-center leading-tight capitalize">
          our core values
        </h1>
        <p className="text-label text-base sm:text-lg leading-relaxed text-center my-5 w-full sm:w-11/12 md:w-2/5 mx-auto">
          These principles guide everything we do and ensure we maintain the
          highest standards in connecting patients with certified professionals.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 md:gap-20">
          {values.map((value) => (
            <div
              key={value?.id}
              className="shadow-md shadow-gray-200 text-center p-6 sm:p-8 md:p-10 drop-shadow-md rounded-[20px] bg-white"
            >
              <img
                src={value?.image}
                alt={value?.title}
                className="mx-auto w-[50px] sm:w-[60px] md:w-[65px] pb-4 sm:pb-5"
              />
              <h1 className="text-black text-lg sm:text-xl font-semibold leading-relaxed">
                {value?.title}
              </h1>
              <p className="text-label text-sm sm:text-base py-4 sm:py-5">
                {value?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Core_values;
