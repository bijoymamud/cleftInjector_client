import React from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "https://i.ibb.co.com/F4d29trh/Frame-3.png",
      title: "Verified Professional",
      description:
        "Connect with certified and experienced cleft lip injectors near you.",
    },
    {
      id: 2,
      icon: "https://i.ibb.co.com/fVnhgJqc/Frame-4.png",
      title: "Global Network",
      description:
        "Easily find qualified injectors in your city or neighborhood.",
    },
    {
      id: 3,
      icon: "https://i.ibb.co.com/5WLRs5Cy/Frame-5.png",
      title: "Easy Booking",
      description: "Book your appointment quickly and conveniently online.",
    },
  ];

  return (
    <section
      className="relative flex items-center justify-center w-full py-10 md:px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co/tMHnwxVt/Group-60-1.png')",
      }}
    >
      <div className="relative container mx-auto  rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative h-auto w-full">
          <div className="relative z-10 flex flex-col items-center justify-center text-center md:px-10 py-10 md:py-16">
            <p className="text-tagline text-lg sm:text-xl md:text-[24px]">
              About CleftInject
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title py-3 md:py-5">
              A Trusted Network of Professional
            </h1>
            <p className="text-label text-base md:text-xl w-11/12 md:w-8/12">
              We connect patients with verified cleft lip injection specialists
              worldwide, ensuring quality care and peace of mind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 py-10 w-full px-3 sm:px-6 md:px-0">
              {features?.map((feature) => (
                <div
                  key={feature?.id}
                  className="shadow bg-white drop-shadow-xl border-none shadow-gray-100 rounded-[20px] p-6 sm:p-8 md:p-10"
                >
                  <img
                    src={feature?.icon}
                    alt="icons"
                    className="mx-auto my-3 sm:my-5 w-16 sm:w-20 md:w-auto"
                  />
                  <h1 className="text-[#251913] pb-2 sm:pb-3 text-xl font-medium">
                    {feature?.title}
                  </h1>
                  <p className="text-[#3F3F3F] text-base sm:text-lg">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
