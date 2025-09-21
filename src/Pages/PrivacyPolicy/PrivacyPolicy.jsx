import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="container mx-auto md:py-20">
      <div className="flex items-center justify-between gap-20">
        <div className="basis-6/12">
          <h1 className="text-4xl font-semibold text-[#3D3B3B]">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground font-normal mb-4 mt-2 w-5/6">
            This Privacy Policy explains how we collect, use, and protect
            personal information when you use our website.
          </p>
        </div>

        <div className="basis-6/12">
          <img
            src="https://i.ibb.co.com/LdJsD96w/Group-2147225359.png"
            className="w-5/6"
          />
        </div>
      </div>

      <div className="md:py-32">
        {/* coded privacy policy */}
        <div>
          <h1 className="capitalize text-2xl font-semibold text-[#3D3B3B]">
            1. information we collect
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            - Details submitted by injectors when applying to be listed (name,
            clinic information, email, phone, address, certifications, social
            media handles).
          </p>
          <p className="text-lg text-muted-foreground font-normal">
            - Limited analytics information about how visitors use the directory
            (searches, views, clicks).
          </p>
        </div>

        <div className="py-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B] capitalize">
            {" "}
            2. how to use information
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            - To operate and improve our injector directory service.
          </p>
          <p className="text-lg text-muted-foreground font-normal">
            - To verify certification and eligibility of injectors.
          </p>
          <p className="text-lg text-muted-foreground font-normal">
            - To communicate with injectors about their application or listing.
          </p>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            3. Legal Basis
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            We rely on legitimate interests to maintain the directory and
            consent for any optional marketing communications.
          </p>
        </div>

        <div className="pt-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            4. Data Sharing
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            We use <span className="text-tagline">Airtable</span> and{" "}
            <span className="text-tagline">Softr</span> as technical service
            providers to host and display directory data. We do not sell
            personal data to third parties.
          </p>
        </div>

        <div className="py-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            5. Data Security
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            We take steps to protect data through secure platforms, restricted
            access, and encryption where possible.
          </p>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">
            6. Your Rights
          </h1>
          <p className="text-lg text-muted-foreground font-normal">
            Depending on your location, you may have rights to access, correct,
            or delete your personal data. Please contact us for any requests.
          </p>
        </div>

        <div className="pt-10">
          <h1 className="text-2xl font-semibold text-[#3D3B3B]">7. Contact</h1>
          <p className="text-lg text-muted-foreground font-normal">
            For any privacy questions, please email us at{" "}
            <span className="text-tagline hover:underline cursor-pointer">
              hello@cleftinject.org
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
