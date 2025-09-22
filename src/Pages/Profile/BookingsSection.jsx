import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BsChatSquareQuote } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { MdVerified } from "react-icons/md";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";

const BookingsSection = ({ bookings }) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={booking.doctor.image}
                    alt={booking.doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {booking.doctor.name}
                    </h3>
                    {booking.doctor.verified && (
                      <sup className="bg-orange-100 text-orange-600 text-sm px-2 rounded-full">
                        Verified
                      </sup>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-base font-semibold text-gray-600 mb-2">
                    <Calendar size={16} />
                    {booking.date}
                  </div>
                  <p className="text-gray-700 text-sm w-5/6 leading-relaxed">
                    {booking.description}
                  </p>
                </div>
              </div>
              <Dialog>
                <div className="flex items-center gap-4">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <Dialog>
                    <DialogTrigger asChild>
                      <BsChatSquareQuote
                        size={22}
                        className="text-gray-600 cursor-pointer"
                        title="Review"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          <img
                            src={booking.doctor.image}
                            alt={booking.doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex text-xl items-center gap-2">
                            {booking.doctor.name}

                            <sup>
                              <MdVerified
                                className="text-[#41A3FF]"
                                size={20}
                              />
                            </sup>
                          </h3>
                          <span className="text-label">
                            {booking.doctor.expertis}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-1 flex-col">
                          <h1 className="font-semibold text-lg">
                            Give Feedback
                          </h1>
                          <Rating
                            initialRating={rating}
                            emptySymbol={
                              <FaRegStar className="text-gray-400 text-xl" />
                            }
                            fullSymbol={
                              <FaStar className="text-yellow-500 text-xl" />
                            }
                            onChange={(value) => setRating(value)}
                          />
                        </div>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <textarea
                            {...register("review", {
                              required: "Review is required",
                            })}
                            className="w-full p-2 border rounded"
                            placeholder="Write here"
                            rows="4"
                          />
                          {errors.review && (
                            <p className="text-red-600 text-sm">
                              {errors.review.message}
                            </p>
                          )}
                          <Button
                            type="submit"
                            className="mt-2 bg-tagline bg-[#E26C29] hover:bg-[#d35913] cursor-pointer text-base px-10"
                          >
                            Send
                            <div>
                              <RiMailSendLine />
                            </div>
                          </Button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Appointment Summary
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Doctor
                        </Label>
                        <p className="text-sm font-medium text-gray-600">
                          {booking.appointment.doctor}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Patient
                        </Label>
                        <p className="text-sm font-medium text-gray-600">
                          {booking.appointment.patient}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Date & Time
                        </Label>
                        <p className="text-sm whitespace-pre-line text-gray-600">
                          {booking.appointment.dateTime}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Consultation Fee
                        </Label>
                        <p className="text-sm font-semibold text-orange-600">
                          {booking.appointment.consultationFee}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-900">
                        Reason For Visit
                      </Label>
                      <p className="text-sm mt-1 leading-relaxed text-gray-600">
                        {booking.appointment.reasonForVisit}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsSection;
