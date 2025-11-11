import {
  baseUrlToBackend,
  useGetConsultationDetailsQuery,
} from "@/redux/features/baseApi";
import { Calendar, Mail, Phone, Users } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const ConsultationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const consultation = location?.state;
  console.log("consultation data", consultation?.fee);
  console.log(id);

  const { data: consultationDetails } = useGetConsultationDetailsQuery(id);
  console.log(consultationDetails, "details");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          Consultation Details
        </h1>

        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 !shadow-md h-10 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold  hover:shadow-xl transition-all duration-300 text-lg"
          >
            <IoIosArrowBack size={18} />
            Back
          </button>
        </div>
      </div>
      <p className="text-[#676767] py-3 text-lg font-medium">
        Detailed information for{" "}
        <span className="text-tagline text-xl font-semibold">
          {consultationDetails?.patient_first_name} {""}
          {consultationDetails?.patient_last_name}
        </span>
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
            src={
              consultationDetails?.injector_image
                ? `${baseUrlToBackend}${consultationDetails.injector_image}`
                : "/default-profile.png"
            }
            alt={consultationDetails?.patient_first_name}
            className="rounded-full w-[80px] h-[80px] object-cover"
          />

          <div>
            <h1 className="text-xl text-[#171717] font-medium">
              {consultationDetails?.patient_first_name} {""}
              {consultationDetails?.patient_last_name}
            </h1>
            <p className="text-[#E26C29] font-semibold capitalize">
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
              <p className="font-medium">
                {consultationDetails?.patient_email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-[#E26C29]" />
            <div>
              <h1 className="text-[#575757] font-medium">Phone</h1>
              <p className="font-medium">
                {consultationDetails?.patient_phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#E26C29]" />
            <div>
              <h1 className="text-[#575757] font-medium">Location</h1>
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
                <p className="font-medium">
                  {consultationDetails?.injector_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-[#575757] font-medium text-lg">
                  Date & Time
                </h1>
                <p className="font-medium">
                  {consultationDetails?.appointment_datetime && (
                    <>
                      {new Date(
                        consultationDetails.appointment_datetime
                      ).toLocaleDateString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      ,{" "}
                      {new Date(
                        consultationDetails.appointment_datetime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-[#575757] font-medium text-lg">
                  Consultation Fee
                </h1>
                <p className="font-semibold text-[#E26C29] text-lg">
                  ${consultationDetails?.consultation_fee}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <h5 className="text-lg font-medium underline text-[#464646]">
              Reason:
            </h5>
            <p className="py-2">{consultationDetails?.reason_for_visit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetails;
