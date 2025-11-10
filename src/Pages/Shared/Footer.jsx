import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <section className="bg-[#101828]">
      <div className="bg-[#101828] p-10">
        <p className="text-tagline pt-10 text-center text-xl">For Provider</p>
        <h1 className="text-white  text-center text-[48px] font-bold pt-2">
          Get Listed In Our Directory
        </h1>

        <p className="text-white text-center py-3 text-xl">
          Join our network of certified cleft lip injectors and connect with
          patients seeking your expertise.
        </p>

        <div className="space-x-4 py-3 flex items-center justify-center">
          <Link to="/get-listed">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-10 h-13 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white  font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg rounded-[12px]">
              <FaRegUser size={20} />
              Get Listed
            </button>
          </Link>
          <Link to="/directory">
            <button className="border border-white text-lg text-white cursor-pointer px-10 h-13 rounded-[12px]">
              Brows Directory
            </button>
          </Link>
        </div>
        <div className="border border-t border-gray-500 mt-20 container mx-auto"></div>
      </div>

      <div className=" text-white container mx-auto">
        <div className="pb-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img src="https://i.ibb.co.com/tp5FFNsL/Frame-2.png" alt="" />

            <div className="max-w-md text-center md:text-left text-base leading-relaxed pt-5 text-[#C0C0C0]">
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
              <Link
                to="/privacy_policy"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Privacy Page
              </Link>
              <Link
                to="/terms_conditions"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/medical_disclaimer"
                className="text-white hover:text-orange-500 transition-colors"
              >
                Medical Disclaimer
              </Link>
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
