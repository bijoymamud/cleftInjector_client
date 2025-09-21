import React from "react";

const MedicalDesclaimer = () => {
  return (
    <section className="container mx-auto md:py-20">
      <div className="flex items-center justify-between gap-20">
        <div className="basis-6/12">
          <h1 className="text-4xl font-semibold text-[#3D3B3B]">
            Medical Disclaimer
          </h1>
          <p className="text-lg text-muted-foreground font-normal mb-4 mt-2 w-5/6">
            The information provided on this website is for general
            informational purposes only and should not be taken as medical
            advice.
          </p>
        </div>

        <div className="basis-6/12">
          <img
            src="https://i.ibb.co.com/wFs5BsLv/Group-61-1.png"
            className="w-5/6"
          />
        </div>
      </div>

      {/* coded privacy policy */}
      <div className="md:py-20">
        <p className="text-lg text-muted-foreground font-normal">
          - This directory helps connect clients with injectors who have
          completed cleft lip injection training.
        </p>
        <p className="text-lg text-muted-foreground font-normal">
          - We do not provide medical diagnosis, treatment, or emergency
          services.
        </p>
        <p className="text-lg text-muted-foreground font-normal">
          - Outcomes of any treatment are the sole responsibility of the
          injector and the client.
        </p>
        <p className="text-lg text-muted-foreground font-normal">
          - Always consult a qualified healthcare provider for medical concerns.
        </p>
        <p className="text-lg text-muted-foreground font-normal">
          - If you believe you are experiencing a medical emergency, call 911 in
          the United States, 999 in the UK, or your local emergency number
          immediately.
        </p>
      </div>

      <div className=" bg-[#F7F0E9] p-5 rounded-[10px] flex items-center mx-auto">
        <p className="text-tagline text-xl font-semibold text-[#E26C29] mx-auto">
          By using this site, you acknowledge that we make no guarantees about
          specific results or the conduct of listed injectors.
        </p>
      </div>
    </section>
  );
};

export default MedicalDesclaimer;
