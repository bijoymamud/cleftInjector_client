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
            <button className="border cursor-pointer px-10 bg-[#E26C29]  hover:bg-[#cf5a16]hover:text-black text-white border-none py-3 rounded-[12px] font-medium flex items-center gap-2">
              <FaRegUser size={20} />
              Get Listed
            </button>
          </Link>
          <Link to="/directory">
            <button className="border border-white text-white cursor-pointer px-10 py-3 rounded-[12px]">
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
