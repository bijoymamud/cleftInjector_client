import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";

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

export default function DoctorProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 py-20">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-6 border-b border-dashed border-gray-300">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-[250px] h-[250px] rounded-full ">
                <img
                  src="https://img.freepik.com/free-photo/portrait-male-doctor_23-2148480369.jpg?semt=ais_incoming"
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full"
                />
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Dr. Sarah Johnson
                  </h1>
                  <BiSolidBadgeCheck size={22} className="mb-3 text-blue-500" />
                </div>

                <p className="text-tagline text-lg font-medium mb-3">
                  Reconstructive Surgery
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1 text-base font-medium">
                    <MapPin className="w-4 h-4 text-tagline" />
                    Los Angeles
                  </div>
                  <div className="flex items-center gap-1 text-base font-medium">
                    <LuClock3 className="w-4 h-4 text-tagline" />
                    Available This Week
                  </div>
                  <div className="flex items-center gap-1 text-base font-medium">
                    <AwardIcon size={18} className="text-tagline" />
                    12 Years Experience
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-label text-base font-medium">
                      Consultation Fee:{" "}
                    </span>
                    <span className="font-semibold text-gray-900">$250</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Phone className="w-4 h-4" />
                    Make a Call
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About Section */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4">About Dr. Sarah</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dr. Sarah Johnson is a board-certified plastic and
                  reconstructive surgeon specializing in cleft lip and palate
                  repair. With over 12 years of experience, she has performed
                  hundreds of successful procedures and is known for her
                  compassionate care and excellent results.
                </p>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  Education & Qualifications
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      MD from Harvard Medical School
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Residency in Plastic Surgery at Johns Hopkins Hospital
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Fellowship in Craniofacial Surgery at Children's Hospital
                      of Philadelphia
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Board Certified by American Board of Plastic Surgery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    Cleft Palate Repair
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    Pediatric Plastic Surgery
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    Rhinoplasty
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    Facial Reconstruction
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    Cleft Lip Repair
                  </Badge>
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Awards & Recognition
                </h2>
                <div className="space-y-2">
                  <div className="text-sm text-gray-700">
                    Top Doctor Award 2023
                  </div>
                  <div className="text-sm text-gray-700">
                    Excellence in Patient Care 2022
                  </div>
                  <div className="text-sm text-gray-700">
                    Best Reconstructive Surgeon 2021
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Los Angeles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      support@drsarah.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      www.drsarah.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4">Languages Spoken</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Outline</Badge>

                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">French</Badge>
                </div>
              </div>
            </div>

            {/* Board Certifications */}
            <div>
              <div className="p-6  rounded-[16px] drop-shadow-2xl shadow-md hover:transition-discrete hover:cursor-pointer">
                <h2 className="text-lg font-semibold mb-4">
                  Board Certifications
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>American Board of Plastic Surgery</div>
                  <div>American Society of Plastic Surgeons</div>
                  <div>American Cleft Palate-Craniofacial Association</div>
                  <div>
                    International Association of Oral and Maxillofacial Surgeons
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
