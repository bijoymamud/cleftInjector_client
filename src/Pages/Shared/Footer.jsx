import React from "react";

const Footer = () => {
  return (
    <section className="bg-[#101828]">
      <div className=" text-white container mx-auto">
        <div className="pb-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png" alt="" />

            <div className="max-w-md text-center md:text-left text-sm leading-relaxed pt-5 text-[#C0C0C0]">
              CleftInject global directory of certified cleft lip injectors. We
              connect patients with trained professionals who provide safe and
              effective treatment.
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-20">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-[550] tracking-wide">
                Quick Access
              </h4>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Directory
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                About Us
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white font-[550] tracking-wide">
                Legal Page
              </h4>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Privacy Page
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Medical Disclaimer
              </a>
            </div>

            <div className="flex flex-col gap-2 text-white">
              <h1 className="text-white font-[550] tracking-wide">Contact</h1>
              {/* Envelope placeholder */}
              <span>support@gmail.com</span>
              <a
                href="tel:+1555123456"
                className="text-orange-500 hover:underline"
              >
                +1 (555) 123-456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
