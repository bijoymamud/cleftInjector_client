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
    <section className="relative flex items-center justify-center w-full py-10 ">
      <div className="relative container mx-auto bg-white rounded-2xl overflow-hidden  flex items-center justify-center">
        <div className="relative h-[60vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co/tMHnwxVt/Group-60-1.png')]">
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <p className="text-tagline text-[24px]">About CleftInject</p>
            <h1 className="text-[48px] font-bold text-title py-5">
              A Trusted Netwrok of Professional
            </h1>
            <p className="text-label text-xl">
              We connect patients with verified cleft lip injection specialist
              worldwide, ensuring quality care and peace of mind.
            </p>

            <div className="grid grid-cols-3 gap-10 py-10">
              {features?.map((feature) => (
                <div
                  key={feature?.id}
                  className="shadow bg-white drop-shadow-xl border-none shadow-gray-100 rounded-[20px] p-10"
                >
                  <img
                    src={feature?.icon}
                    alt="icons"
                    className="mx-auto my-5"
                  />
                  <h1 className="text-[#251913] pb-3 text-2xl font-medium">
                    {feature?.title}
                  </h1>
                  <p className="text-[#3F3F3F] text-lg ">
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
