import {
  baseUrlToBackend,
  useGetConsultationDetailsQuery,
} from "@/redux/features/baseApi";
import { Calendar, Mail, Phone, Users, MapPin } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const ConsultationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const consultation = location?.state;
  const { data: consultationDetails } = useGetConsultationDetailsQuery(id);

  // Helper – format date & time in one place
  const formatDateTime = (dateStr) => {
    if (!dateStr) return { date: "—", time: "" };
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };
  const { date, time } = formatDateTime(
    consultationDetails?.appointment_datetime
  );

  return (
    <div className=" ">
      <div>
        {/* ---------- Header ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
            Consultation Details
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full font-semibold text-white bg-gradient-to-r from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            <IoIosArrowBack size={20} />
            Back
          </button>
        </div>

        <p className="text-[#676767] text-base sm:text-lg font-medium mb-6">
          Detailed information for{" "}
          <span className="text-orange-600 text-lg sm:text-xl font-semibold">
            {consultationDetails?.patient_first_name}{" "}
            {consultationDetails?.patient_last_name}
          </span>
        </p>

        {/* ---------- Patient Information Card ---------- */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <Users size={22} className="text-[#E26C29]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#171717]">
              Patient Information
            </h2>
          </div>

          {/* Avatar + Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <img
              src={
                consultationDetails?.injector_image
                  ? `${baseUrlToBackend}${consultationDetails.injector_image}`
                  : "/default-profile.png"
              }
              alt={`${consultationDetails?.patient_first_name} profile`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-orange-100"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-medium text-[#171717]">
                {consultationDetails?.patient_first_name}{" "}
                {consultationDetails?.patient_last_name}
              </h3>
              <p className="text-[#E26C29] font-semibold capitalize text-sm sm:text-base">
                {consultation?.status || consultationDetails?.status}
              </p>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-[#E26C29] mt-0.5" />
              <div>
                <p className="text-[#575757] font-medium">Email</p>
                <p className="font-medium text-gray-800 break-all">
                  {consultationDetails?.patient_email || "—"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-[#E26C29] mt-0.5" />
              <div>
                <p className="text-[#575757] font-medium">Phone</p>
                <p className="font-medium text-gray-800">
                  {consultationDetails?.patient_phone || "—"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#E26C29] mt-0.5" />
              <div>
                <p className="text-[#575757] font-medium">Location</p>
                <p className="font-medium text-gray-800">
                  {consultationDetails?.location || "Los Angeles"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Consultation Summary Card ---------- */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <Calendar size={22} className="text-[#E26C29]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#171717]">
              Consultation Summary
            </h2>
          </div>

          <div className="space-y-5">
            {/* Doctor / Date-Time / Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#575757] font-medium">Doctor</p>
                <p className="font-medium text-gray-800">
                  {consultationDetails?.injector_name || "—"}
                </p>
              </div>

              <div>
                <p className="text-[#575757] font-medium">Date &amp; Time</p>
                <p className="font-medium text-gray-800">
                  {date && time ? `${date}, ${time}` : "—"}
                </p>
              </div>

              <div>
                <p className="text-[#575757] font-medium">Consultation Fee</p>
                <p className="font-semibold text-[#E26C29] text-base">
                  ${consultationDetails?.consultation_fee ?? "0"}
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="pt-4 border-t border-gray-100">
              <h5 className="text-base sm:text-lg font-medium underline text-[#464646] mb-2">
                Reason for Visit:
              </h5>
              <p className="text-gray-700 leading-relaxed">
                {consultationDetails?.reason_for_visit || "No reason provided."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsultationDetails;
