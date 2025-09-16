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
    <div className="pb-14 bg-[#F9FAFB]">
      {/* //main text */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title  text-center leading-tight capitalize">
          our core values
        </h1>
        <p className="text-label text-lg leading-relaxed text-center mt-5 w-2/5 mx-auto">
          These principles guide everything we do and ensure we maintain the
          highest standards in connecting patients with certified professionals.
        </p>
      </div>

      <div className=" container mx-auto">
        <div className="grid grid-cols-3 gap-20">
          {values.map((value) => (
            <div
              key={value?.id}
              className="shadow-md shadow-gray-200 text-center p-10 drop-shadow-xl rounded-[20px] bg-white"
            >
              <img
                src={value?.image}
                alt=""
                className="mx-auto w-[65px] pb-5"
              />
              <h1 className="text-black text-xl font-semibold leading-relaxed">
                {value?.title}
              </h1>
              <p className="text-label py-5">{value?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Core_values;
