import { Calendar, Mail, Phone, Users } from "lucide-react";
import React from "react";
import { useLocation, useParams } from "react-router";

const ConsultationDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const consultation = location?.state;
  console.log("consultation data", consultation?.fee);
  console.log(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1A1A1A]">
        Consultation Details
      </h1>
      <p className="text-[#676767] py-3 text-lg font-medium">
        Detailed information for {consultation?.name}
      </p>

      <div className="bg-white rounded-lg shadow drop-shadow-md p-10 border border-gray-200 my-10">
        <div className="flex items-center gap-5">
          <Users size={24} className="text-[#E26C29]" />
          <h1 className="text-2xl text-[#171717] font-semibold">
            Patient Information
          </h1>
        </div>
        <div className="flex items-center gap-6 my-10">
          <img
            src={consultation?.image}
            alt=""
            className="rounded-full w-[80px] h-[80px] object-cover"
          />

          <div>
            <h1 className="text-xl text-[#171717] font-medium">
              {consultation?.name}
            </h1>
            <p className="text-[#E26C29] font-semibold">
              {consultation?.status}
            </p>
          </div>
        </div>

        {/* social */}

        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#E26C29]" />
            <div>
              <h1 className="text-[#575757] font-medium">Email</h1>
              <p className="font-medium">{consultation?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-[#E26C29]" />
            <div>
              <h1 className="text-[#575757] font-medium">Phone</h1>
              <p className="font-medium">{consultation?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#E26C29]" />
            <div>
              <h1 className="text-[#575757] font-medium">Location</h1>
              <p className="font-medium">{consultation?.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow drop-shadow-md p-10 border border-gray-200">
        <div className="flex items-center gap-5">
          <Calendar size={24} className="text-[#E26C29]" />
          <h1 className="text-2xl text-[#171717] font-semibold">
            Consultation Summary
          </h1>
        </div>

        <div className="my-10">
          <div className="flex items-center justify-between gap-10">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-[#575757] font-medium text-lg">Doctor</h1>
                <p className="font-medium">{consultation?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-[#575757] font-medium text-lg">
                  Date & Time
                </h1>
                <p className="font-medium">{consultation?.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-[#575757] font-medium text-lg">
                  Consultation Fee
                </h1>
                <p className="font-semibold text-[#E26C29] text-lg">
                  ${consultation?.fee}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <h5 className="text-lg font-medium underline text-[#464646]">
              Reason:
            </h5>
            <p className="py-2">{consultation?.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetails;
