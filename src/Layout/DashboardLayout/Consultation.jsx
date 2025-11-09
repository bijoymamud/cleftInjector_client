import React, { useState } from "react";
import { Search, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useGetAllConsultationQuery } from "@/redux/features/baseApi";

const consultations = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Pending",
    time: "10:00 AM, Sep 15, 2025",

    step: "Step 17",
    reason:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis mauris vitae non sed porta. Convallis pretium et tellus ullamcorper odio felis massa leo venenatis. Ut sed at blandit vestibulum elit. Accumsan sodales magna sagittis tellus nunc facilisi neque dignissim.",
    image:
      "https://img.freepik.com/premium-photo/portrait-happy-young-casual-man-standing_171337-29744.jpg",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    fee: 150,
  },
  {
    id: 2,
    name: "Jenny Wilson",
    status: "Confirmed",
    time: "10:00 AM, Sep 15, 2025",

    step: "Step 17",
    reason:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis mauris vitae non sed porta. Convallis pretium et tellus ullamcorper odio felis massa leo venenatis. Ut sed at blandit vestibulum elit. Accumsan sodales magna sagittis tellus nunc facilisi neque dignissim.",
    image:
      "https://img.freepik.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80",
    email: "jenny.wilson@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, USA",
    fee: 170,
  },
  {
    id: 3,
    name: "Robert Fox",
    status: "Cancelled",
    time: "10:00 AM, Sep 15, 2025",

    step: "Step 17",
    reason:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis mauris vitae non sed porta. Convallis pretium et tellus ullamcorper odio felis massa leo venenatis. Ut sed at blandit vestibulum elit. Accumsan sodales magna sagittis tellus nunc facilisi neque dignissim.",
    image:
      "https://www.drmeilynhew.com.au/wp-content/uploads/2017/02/person12.jpg",
    email: "robert.fox@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, USA",
    fee: 120,
  },
  {
    id: 4,
    name: "Jacob Jones",
    status: "Pending",
    time: "10:00 AM, Sep 15, 2025",

    step: "Step 17",
    reason:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis mauris vitae non sed porta. Convallis pretium et tellus ullamcorper odio felis massa leo venenatis. Ut sed at blandit vestibulum elit. Accumsan sodales magna sagittis tellus nunc facilisi neque dignissim.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0N_dzc3iT74_6s4xL7NPybKkYmxkxmoJdubrt3-OJHhbW9Ga3J-44ug1BPslZFaS-Gc&usqp=CAU",
    email: "jacob.jones@example.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, USA",
    fee: 150,
  },
  {
    id: 5,
    name: "Bessie Cooper",
    status: "Confirmed",
    time: "10:00 AM, Sep 15, 2025",

    step: "Step 17",
    reason:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis mauris vitae non sed porta. Convallis pretium et tellus ullamcorper odio felis massa leo venenatis. Ut sed at blandit vestibulum elit. Accumsan sodales magna sagittis tellus nunc facilisi neque dignissim.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWQKwNNsnY_f7eiJcrZFZHUGp-eR7BC2o_x3fMXWOrB2qO9B6bZrELuQ7E1T09CYpd5k&usqp=CAU",
    email: "bessie.cooper@example.com",
    phone: "+1 (555) 567-8901",
    location: "San Francisco, USA",
    fees: 150,
  },
  {
    id: 6,
    name: "Devon Lane",
    status: "Cancelled",
    time: "10:00 AM",
    step: "Step 17",
    reason: "Lorem ipsum dolor sit amet consectetur...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-j-79isZ-m017kMBJWFHOqWKbe9Avs0h2N4BxVxS2rr0qltJa-oMIuv_xGzQ4q-fdjkE&usqp=CAU",
    email: "devon.lane@example.com",
    phone: "+1 (555) 678-9012",
    location: "Seattle, USA",
    fees: 150,
  },
];

export default function Consultation() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: consultationData } = useGetAllConsultationQuery();
  console.log(consultationData, "ccccccccccccc");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-500 bg-orange-100";
      case "Confirmed":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Consultation Management
          </h1>
          <p className="text-base text-gray-500">
            Manage your patient consultations and bookings
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by patient name or reason"
                className="pl-10 border-gray-200"
              />
            </div>
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              onClick={() => setActiveFilter("All")}
              className={
                activeFilter === "All"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              All
            </Button>
            <Button
              variant={activeFilter === "Pending" ? "default" : "outline"}
              onClick={() => setActiveFilter("Pending")}
              className={
                activeFilter === "Pending"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              Pending
            </Button>
            <Button
              variant={activeFilter === "Confirmed" ? "default" : "outline"}
              onClick={() => setActiveFilter("Confirmed")}
              className={
                activeFilter === "Confirmed"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              Confirmed
            </Button>
            <Button
              variant={activeFilter === "Cancelled" ? "default" : "outline"}
              onClick={() => setActiveFilter("Cancelled")}
              className={
                activeFilter === "Cancelled"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              Cancelled
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {consultationData?.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-[#E26C290D] cursor-pointer rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={
                    consultation?.patient_image ||
                    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
                  }
                  alt={consultation?.patient_name}
                  className="rounded-full w-[100px] h-[100px] object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-xl">
                      {consultation.patient_name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 capitalize rounded-full text-[14px] font-semibold ${
                        consultation.status === "pending"
                          ? "bg-[#E26C29] text-white"
                          : consultation.status === "confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {consultation.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(
                          consultation?.appointment_datetime
                        ).toLocaleDateString([], {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {" • "}
                        {new Date(
                          consultation?.appointment_datetime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{consultation.location || "Los Angels"}</span>
                    </div>
                  </div>
                  <p className="text-base text-[#656464]">
                    Reason:{" "}
                    <span className="text-black">{consultation.reason}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ">
                  <Link
                    to={`/provider/consultation_details/${consultation?.id}`}
                    state={consultation}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-orange-500 cursor-pointer hover:text-orange-500 hover:bg-gray-300 border-orange-500"
                    >
                      View Details
                    </Button>
                  </Link>
                  {consultation.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2  mt-10 ">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 rounded-full">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 rounded-full">
            3
          </Button>
          <span className="text-gray-400">...</span>
          <Button variant="outline" size="sm" className="w-8 h-8 rounded-full">
            32
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
