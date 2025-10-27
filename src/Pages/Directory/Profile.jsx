import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { LuClock3, LuGraduationCap } from "react-icons/lu";

import {
  Phone,
  Calendar,
  MapPin,
  Mail,
  Star,
  CheckCircle,
  Award,
  Globe,
  AwardIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";

export default function Profile() {
  const location = useLocation();
  const injectorData = location.state?.injector;
  console.log("injectorData:", injectorData);
  const injectorAvailability = injectorData?.availabilities;
  const navigate = useNavigate();

  const handleConsultationBook = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please log in to book a consultation.");
      setTimeout(() => {
        navigate("/sign_in");
      }, 1500);
      return;
    }

    navigate(`/book-consultation/${injectorData?.id}`, {
      state: {
        availability: injectorAvailability,
        injector: injectorinfo,
      },
    });
  };

  const injectorinfo = {
    id: injectorData?.id,
    name: injectorData?.full_name,
    fee: injectorData?.consultation_fee,
  };

  localStorage.setItem("injectorinfo", JSON.stringify(injectorinfo));

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-20">
      <div className="container mx-auto">
        <Toaster position="top-right" />
        <div className="mb-6 border-b border-dashed border-gray-300">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-[250px] h-[250px] rounded-full ">
                <img
                  src={injectorData?.profile_image}
                  className="w-full h-full"
                />
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {injectorData?.full_name}
                  </h1>
                  <BiSolidBadgeCheck size={22} className="mb-3 text-blue-500" />
                </div>

                <p className="text-tagline text-lg font-medium mb-3">
                  {injectorData?.designation}
                </p>

                <div className="flex flex-wrap gap-4 text-md text-gray-600 mb-4">
                  <div className="flex items-center gap-1 font-medium">
                    <MapPin className="w-4 h-4 text-tagline" />
                    {injectorData?.city}
                  </div>
                  <div className="flex items-center gap-1 text-md font-medium">
                    <LuClock3 className="w-4 h-4 text-tagline" />
                    <p>
                      {injectorData?.available_today === true
                        ? "Available today"
                        : "Not available today"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-md font-medium">
                    <AwardIcon size={18} className="text-tagline" />
                    {injectorData?.years_of_experience} Years Experience
                  </div>
                </div>

                <div className="flex items-center gap-10 mb-4">
                  <div className="text-md">
                    <span className="text-label text-md font-medium">
                      Consultation Fee:{" "}
                    </span>
                    <span className="font-semibold text-gray-900 text-xl">
                      {injectorData?.consultation_fee}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-xl">4.9</span>
                  </div>
                </div>

                {/* <Link
                  to={`/book-consultation/${injectorData?.id}`}
                  state={{
                    availability: injectorAvailability,
                    injector: injectorinfo,
                  }}
                  className="flex gap-3 w-[10px]"
                >
                  <Button className="bg-orange-500 hover:bg-orange-600 text-md flex cursor-pointer items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Button>
                </Link> */}
                <Button
                  onClick={handleConsultationBook}
                  className="bg-orange-500 hover:bg-orange-600 text-md flex cursor-pointer items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* About Section */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl font-semibold mb-4 text-title">
                  About {injectorData?.full_name}
                </h2>
                <p className="text-gray-600 text-md leading-relaxed text-label">
                  {injectorData?.about}
                </p>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl text-title font-semibold mb-4 flex items-center gap-2">
                  <LuGraduationCap className="w-6 h-6 text-tagline" />
                  Education & Qualifications
                </h2>
                <div className="space-y-3">
                  {injectorData?.qualifications_certifications
                    ?.split("\\n")
                    .map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-tagline mt-0.5" />
                        <span className="text-md text-gray-700">{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-sm shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl text-tagline font-semibold mb-4">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {injectorData?.specialties
                    ?.split("\\n")
                    ?.map((speciality, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-orange-100 text-base rounded-full text-orange-700 hover:bg-orange-200"
                      >
                        {speciality}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-title">
                  <Award className="w-6 h-6 text-tagline" />
                  Awards & Recognition
                </h2>
                <div className="space-y-2">
                  {injectorData?.awards_recognitions
                    ?.split("\\n")
                    .map((award, index) => (
                      <div key={index} className="text-md text-gray-700">
                        - {award}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl text-title font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-tagline" />
                    <span className="text-md text-gray-700">
                      {injectorData?.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-tagline" />
                    <span className="text-md text-gray-700">
                      {injectorData?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-tagline" />
                    <span className="text-md text-gray-700">
                      {injectorData?.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-tagline" />
                    <span className="text-md text-gray-700">
                      {injectorData?.website}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl text-title font-semibold mb-4">
                  Languages Spoken
                </h2>
                <div className="flex flex-wrap gap-2">
                  {injectorData?.languages_spoken
                    ?.split(/\\n|\n/)
                    ?.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-5 py-1 rounded-full text-base border text-black border-[#919191]"
                      >
                        {language.trim()}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>

            {/* Board Certifications */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-xl shadow-sm hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-2xl text-title font-semibold mb-4">
                  Board Certifications
                </h2>
                <div className="space-y-2 text-md text-gray-700">
                  {injectorData?.certifications?.map((certificate) => (
                    <div key={certificate.id}>- {certificate.title}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
