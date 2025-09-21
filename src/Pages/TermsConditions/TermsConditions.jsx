import React from "react";

const TermsConditions = () => {
  return (
    <section className="container mx-auto md:py-20">
      <div className="basis-6/12">
        <h1 className="text-4xl font-semibold text-[#3D3B3B]">
          Terms and Conditions
        </h1>
        <p className="text-lg text-muted-foreground font-normal mb-4 mt-2 w-5/6">
          By accessing and using this platform, you agree to comply with our
          terms and conditions. Please read them carefully to understand your
          rights, responsibilities, and limitations while using our services.
        </p>
      </div>

      <div className="">
        {/* coded terms&conditions */}
        <div>
          <h1 className="capitalize text-2xl font-semibold text-[#3D3B3B]">
            1. Purpose of the Site
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            This website is a directory service to help clients find certified
            cleft lip injectors. It does not provide medical treatment.
          </p>
        </div>

        <div className="py-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B] capitalize">
            {" "}
            2. Use of the Site
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            Users may search for injectors for personal, non-commercial use.
            Misuse, data scraping, or fraudulent activity is prohibited.
          </p>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            3. Injector Responsibilities
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            Injectors who apply for listing must provide accurate, truthful, and
            current information, including valid certifications.
            <p className="">
              We reserve the right to verify information and to suspend or
              revoke listings at our discretion.
            </p>
          </p>
        </div>

        <div className="pt-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            4. Our Responsibilities
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            We make reasonable efforts to ensure data accuracy but do not
            guarantee availability, suitability, or outcomes of any treatments
            by listed injectors.
          </p>
        </div>

        <div className="py-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            5. Liability
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            We are not liable for any damages or outcomes resulting from using
            this site or services provided by listed injectors.
          </p>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            6. Governing Law
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            These Terms are governed by the laws of the United Kingdom, unless
            otherwise required by local law.
          </p>
        </div>

        <div className="pt-10">
          <div className=" bg-[#F7F0E9] p-5 rounded-[10px] flex items-center mx-auto">
            <p className="text-tagline text-xl font-semibold text-[#E26C29] mx-auto">
              By using this site, you agree to these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
