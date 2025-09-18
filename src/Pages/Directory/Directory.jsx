import {
  Search,
  MapPin,
  Star,
  Clock,
  Award,
  Filter,
  Funnel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router";

export default function Directory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Search data:", data);
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Reconstructive Surgery",
      rating: 4.9,
      price: "$300-400",
      location: "Los Angeles",
      availability: "Available This Week",
      experience: "10+ Years Experience",
      image:
        "https://img.freepik.com/free-photo/close-up-portrait-handsome-smiling-young-man-white-t-shirt-blurry-outdoor-nature_176420-6305.jpg?semt=ais_incoming&w=740&q=80",
      verified: true,
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Reconstructive Surgery",
      rating: 4.9,
      price: "$300-350",
      location: "New York, NY",
      availability: "Available This Week",
      experience: "10+ Years Experience",
      image:
        "https://cdn.pixabay.com/photo/2022/03/11/06/14/indian-man-7061278_640.jpg",
      verified: true,
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Reconstructive Surgery",
      rating: 4.9,
      price: "$250-400",
      location: "Los Angeles",
      availability: "Available This Week",
      experience: "10+ Years Experience",
      image:
        "https://img.freepik.com/free-photo/young-happy-man-standing-isolated_171337-1127.jpg",
      verified: true,
    },
    {
      id: 4,
      name: "Dr. Sarah Johnson",
      specialty: "Reconstructive Surgery",
      rating: 4.9,
      price: "$300-500",
      location: "New York, NY",
      availability: "Available This Week",
      experience: "10+ Years Experience",
      image:
        "https://media.istockphoto.com/id/1359149467/photo/shot-of-a-handsome-young-man-standing-alone-and-stretching-during-his-outdoor-workout.jpg?s=612x612&w=0&k=20&c=bCwqY95KICwmFZKRgbc9yd9O-0Ra1oHrhv6vYe6Weh8=",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="relative mb-14 mt-24 bg-white rounded-2xl shadow-lg overflow-hidden w-full container mx-auto">
        <div className="relative h-[50vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co.com/0pzPpQms/Frame-1707482902.jpg')] rounded-2xl">
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
              Certified Cleft Lip Injector Directory
            </h1>
            <p className="text-lg md:text-xl max-w-2xl font-thin mb-6">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white  container mx-auto border-gray-200 ">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
            <div className="flex items-center justify-between gap-6">
              {/* Input Fields Container */}
              <div className="flex w-full gap-4">
                {/* Name / Specialities */}
                <div className="relative w-1/3">
                  <Input
                    {...register("nameSpecialties")}
                    placeholder="Search by Name, Specialities"
                    className="pl-10 h-12 border border-gray-300 
                     outline-none focus:outline-none 
                     focus-visible:outline-none 
                     focus:ring-0 focus-visible:ring-0 
                     shadow-none focus:shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* City / State */}
                <div className="relative w-1/3">
                  <Input
                    {...register("cityState")}
                    placeholder="City, State"
                    className="pl-10 h-12 border border-gray-300 
                     outline-none focus:outline-none 
                     focus-visible:outline-none 
                     focus:ring-0 focus-visible:ring-0 
                     shadow-none focus:shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Country */}
                <div className="relative w-1/3">
                  <Input
                    {...register("country")}
                    placeholder="Country"
                    className="pl-10 h-12 border border-gray-300 
                     outline-none focus:outline-none 
                     focus-visible:outline-none 
                     focus:ring-0 focus-visible:ring-0 
                     shadow-none focus:shadow-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#E26C29] cursor-pointer px-10 hover:bg-[#cf5a16] 
                   text-white py-3 h-12 w-[200px] text-base tracking-wide
                   rounded-md flex items-center gap-2"
                >
                  Search
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full h-1 border-b shadow-2xl shadow-orange-500 container mx-auto border-gray-400"></div>

      {/* Main Content */}
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <img
              src="https://i.ibb.co.com/0jZwZS18/Rectangle-14.png"
              alt=""
              className="object-cover w-full"
            />
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-[#333333]">
                  Available Injector
                </h2>
                <p className="text-sm text-gray-500">(24 results found)</p>
              </div>
              <Button
                variant="outline"
                className="cursor-pointer text-base border-gray-200 shadow-sm"
              >
                Filter
                <Funnel size={24} className="text-tagline" />
              </Button>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="border bg-[#FFFBF9] border-gray-200 drop-shadow-md hover:shadow-md transition-shadow rounded-[20px] cursor-pointer"
                >
                  <div className="p-8 ">
                    <div className="">
                      <div className="flex items-center justify-between">
                        <div className="relative flex items-center gap-3">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                  {doctor.name}
                                  {doctor.verified && (
                                    <MdVerified
                                      className="text-[#41A3FF]"
                                      size={20}
                                    />
                                  )}
                                </h3>
                                <p className="text-sm text-[#5C5C5C]">
                                  {doctor.specialty}
                                </p>
                              </div>
                            </div>

                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-4 text-base text-gray-600">
                                <span className="font-[550] text-gray-900 text-[18px]">
                                  {doctor.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* //rating */}
                        <div className="flex items-center gap-2">
                          <Star
                            size={20}
                            className=" fill-[#FACC15] text-[#FACC15]"
                          />
                          <span className="text-sm font-[550]">
                            {doctor.rating}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-4 text-sm pt-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={20} className="text-tagline" />
                            <span className="font-[550]">
                              {doctor.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={20} className="text-tagline" />
                            <span className="font-[550]">
                              {doctor.availability}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award size={20} className="text-tagline" />
                            <span className="font-[550]">
                              {doctor.experience}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 flex gap-3">
                          <Link
                            to={`/profile/${doctor?.id}`}
                            className="flex-1 text-center py-3 rounded-[12px] border border-[#E26C29] text-[#E26C29] font-medium hover:bg-[#E26C29]/10 transition"
                          >
                            View Profile
                          </Link>
                          <Link
                            to={`/consultation_details/${doctor?.id}`}
                            className="flex-1 text-center py-3 rounded-[12px] bg-[#E26C29] text-white font-medium hover:bg-orange-600 transition"
                          >
                            Book Consultation
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
