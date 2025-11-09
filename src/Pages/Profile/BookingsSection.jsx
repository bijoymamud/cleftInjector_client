

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
import { Calendar, Clock3 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { MdVerified } from "react-icons/md";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePostReviewMutation } from "@/redux/features/baseApi";
import { toast, Toaster } from "sonner";

const BookingsSection = ({ bookingsData }) => {
  const [openReviewDialog, setOpenReviewDialog] = useState(null);
  const [postReview] = usePostReviewMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      comment: data?.comment,
      rating: data?.rating,
    };

    try {
      await postReview({
        id: data?.injector,
        payload,
      }).unwrap();

      toast.success("Thank you! Your review has been submitted.");
      reset();
      setOpenReviewDialog(null);
    } catch (error) {
      const errorMessage =
        error?.data?.error || error?.error || "Failed to submit review.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Appointments
            </h1>
            <p className="text-gray-600">
              Manage your upcoming and past bookings
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold text-lg">
                {bookingsData?.length || 0} Bookings
              </span>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6">
          {bookingsData?.map((booking) => (
            <Card
              key={booking?.id}
              className="group transition-all duration-300 border-0 shadow-md overflow-hidden bg-white"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Avatar & Name */}
                  <div className="md:w-1/3 bg-gradient-to-br from-orange-50 to-blue-50 p-6 flex flex-col items-center justify-center border-r border-gray-100">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={booking?.injector_image}
                            alt={booking.injector_name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold">
                            {booking.injector_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
                        <MdVerified className="text-white" size={24} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1 text-center">
                      {booking.injector_name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      Medical Professional
                    </p>
                  </div>

                  {/* Right: Details & Actions */}
                  <div className="md:w-2/3 p-6">
                    <div className="space-y-4">
                      {/* Time & Date */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                          <Clock3 className="text-blue-600" size={18} />
                          <span className="font-semibold text-gray-700">
                            {new Date(
                              `1970-01-01T${booking.injector_availability_start_time}Z`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(
                              `1970-01-01T${booking.injector_availability_end_time}Z`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                          <Calendar className="text-orange-600" size={18} />
                          <span className="font-semibold text-gray-700">
                            {
                              new Date(booking.appointment_datetime)
                                .toISOString()
                                .split("T")[0]
                            }
                          </span>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Reason for Visit
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {booking.reason_for_visit}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        {/* VIEW DETAILS DIALOG */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 hover:cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="text-orange-600" />
                                Appointment Summary
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 pt-4">
                              {/* Provider Info */}
                              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl">
                                <Avatar className="w-16 h-16 ring-4 ring-white">
                                  <AvatarImage
                                    src={booking?.injector_image}
                                    alt={booking.injector_name}
                                  />
                                  <AvatarFallback className="bg-orange-500 text-white">
                                    {booking.injector_name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-bold text-lg flex items-center gap-2">
                                    {booking.injector_name}
                                    <MdVerified
                                      className="text-blue-500"
                                      size={20}
                                    />
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    Healthcare Provider
                                  </p>
                                </div>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    Patient Name
                                  </Label>
                                  <p className="text-base text-gray-700 font-medium">
                                    {booking.patient_first_name}{" "}
                                    {booking.patient_last_name}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    Appointment Date
                                  </Label>
                                  <p className="text-base text-gray-700 font-medium">
                                    {
                                      new Date(booking.appointment_datetime)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    Time Slot
                                  </Label>
                                  <p className="text-base text-gray-700 font-medium">
                                    {new Date(
                                      `1970-01-01T${booking.injector_availability_start_time}Z`
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                      `1970-01-01T${booking.injector_availability_end_time}Z`
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    Consultation Fee
                                  </Label>
                                  <p className="text-xl font-bold text-orange-600">
                                    ${booking.consultation_fee}
                                  </p>
                                </div>
                              </div>

                              {/* Reason Section */}
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                  Reason For Visit
                                </Label>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-gray-700 leading-relaxed">
                                    {booking.reason_for_visit}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* REVIEW DIALOG */}
                        <Dialog
                          open={openReviewDialog === booking.id}
                          onOpenChange={(open) =>
                            setOpenReviewDialog(open ? booking.id : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r hover:cursor-pointer from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                              <BsChatSquareQuote size={18} className="mr-2" />
                              Leave Review
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-gray-900">
                                Share Your Experience
                              </DialogTitle>
                            </DialogHeader>

                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl">
                              <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                                <AvatarImage
                                  src={booking?.injector_image}
                                  alt={booking.injector_name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-bold">
                                  {booking.injector_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold text-xl flex items-center gap-2">
                                  {booking.injector_name}
                                  <MdVerified
                                    className="text-blue-500"
                                    size={22}
                                  />
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  How was your appointment?
                                </p>
                              </div>
                            </div>

                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="space-y-5 pt-2"
                            >
                              <input
                                type="hidden"
                                value={booking.injector}
                                {...register("injector", {
                                  valueAsNumber: true,
                                })}
                              />

                              {/* Rating */}
                              <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-900">
                                  Your Rating
                                </Label>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                  <Controller
                                    name="rating"
                                    control={control}
                                    defaultValue={0}
                                    rules={{
                                      required: "Please select a rating",
                                    }}
                                    render={({ field }) => (
                                      <Rating
                                        initialRating={field.value}
                                        emptySymbol={
                                          <FaRegStar className="text-gray-300 text-3xl mx-1 hover:text-yellow-400 transition-colors" />
                                        }
                                        fullSymbol={
                                          <FaStar className="text-yellow-500 text-3xl mx-1" />
                                        }
                                        onChange={(value) =>
                                          field.onChange(value)
                                        }
                                      />
                                    )}
                                  />
                                </div>
                                {errors.rating && (
                                  <p className="text-red-600 text-sm font-medium">
                                    {errors.rating.message}
                                  </p>
                                )}
                              </div>

                              {/* Review Text */}
                              <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-900">
                                  Your Review
                                </Label>
                                <textarea
                                  {...register("comment", {
                                    required: "Please write a review",
                                    minLength: {
                                      value: 10,
                                      message:
                                        "Review must be at least 10 characters",
                                    },
                                  })}
                                  className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                  placeholder="Share your experience with this healthcare provider..."
                                  rows="5"
                                />
                                {errors.comment && (
                                  <p className="text-red-600 text-sm font-medium">
                                    {errors.comment.message}
                                  </p>
                                )}
                              </div>

                              <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                Submit Review
                                <RiMailSendLine className="ml-2" size={20} />
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {(!bookingsData || bookingsData.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-16 h-16 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              You don't have any appointments scheduled. Book your first
              appointment to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
