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

const BookingsSection = ({ bookingsData }) => {
  console.log("bookingData", bookingsData);
  const [openReviewDialog, setOpenReviewDialog] = useState(null);
  const [postReview] = usePostReviewMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Review Submitted:", data);

    const payload = {
      comment: data?.comment,
      rating: data?.rating,
    };

    try {
      const response = postReview({
        id: data?.injector,
        payload,
      }).unwrap();

      console.log(response, "response of review");
    } catch (error) {
      console.log(error);
    }

    reset();
    setOpenReviewDialog(null);
  };

  return (
    <div className="space-y-6 min-h-screen">
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center justify-center py-1 font-semibold text-lg bg-[#E26C29]  hover:bg-[#cf5a16] cursor-pointer text-white rounded-full w-[200px]">
          <h1> Total Bookings: {bookingsData?.length}</h1>
        </div>
      </div>
      {bookingsData?.map((booking) => (
        <Card key={booking?.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={booking?.injector_image}
                      // src="https://github.com/shadcn.png"
                      alt={booking.injector_name}
                    />
                    <AvatarFallback>
                      {booking.injector_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {booking.injector_name}
                    </h3>
                    <MdVerified className="text-[#41A3FF]" size={18} />
                  </div>

                  <div className="flex items-center gap-5 text-base font-semibold text-gray-600 mb-2">
                    <p className="flex items-center gap-2">
                      <Clock3 size={16} />
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
                    <p className="flex items-center gap-2">
                      <Calendar size={16} />
                      {
                        new Date(booking.appointment_datetime)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </div>

                  <p className="text-gray-700 font-medium leading-relaxed">
                    Reason: {booking.reason_for_visit}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* View Details Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
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
                            {booking.injector_name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-900">
                            Patient
                          </Label>
                          <p className="text-sm font-medium text-gray-600">
                            {booking.patient_first_name}{" "}
                            {booking.patient_last_name}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-900">
                            Date & Time
                          </Label>
                          <p className="text-sm text-gray-600">
                            {
                              new Date(booking.appointment_datetime)
                                .toISOString()
                                .split("T")[0]
                            }
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-900">
                            Consultation Fee
                          </Label>
                          <p className="text-sm font-semibold text-orange-600">
                            $ {booking.consultation_fee}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Reason For Visit
                        </Label>
                        <p className="text-sm mt-1 leading-relaxed text-gray-600">
                          {booking.reason_for_visit}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Review Dialog */}
                <Dialog
                  open={openReviewDialog === booking.id}
                  onOpenChange={(open) =>
                    setOpenReviewDialog(open ? booking.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Leave a Review"
                    >
                      <BsChatSquareQuote size={22} />
                    </button>
                  </DialogTrigger>

                  <DialogContent className="max-w-md">
                    <div className="flex items-center gap-5 mb-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={booking?.injector_image}
                            alt={booking.injector_name}
                          />
                          <AvatarFallback>
                            {booking.injector_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 flex text-xl items-center gap-2">
                          {booking.injector_name}
                          <sup>
                            <MdVerified className="text-[#41A3FF]" size={20} />
                          </sup>
                        </h3>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4 pt-2"
                    >
                      {/* Hidden Booking ID */}
                      <input
                        type="hidden"
                        value={booking.injector}
                        {...register("injector", { valueAsNumber: true })}
                      />

                      {/* Rating */}
                      <div className="flex items-start gap-1 flex-col">
                        <h1 className="font-semibold text-lg">Give Feedback</h1>
                        <Controller
                          name="rating"
                          control={control}
                          defaultValue={0}
                          rules={{ required: "Rating is required" }}
                          render={({ field }) => (
                            <Rating
                              initialRating={field.value}
                              emptySymbol={
                                <FaRegStar className="text-gray-400 text-xl" />
                              }
                              fullSymbol={
                                <FaStar className="text-yellow-500 text-xl" />
                              }
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                        {errors.rating && (
                          <p className="text-red-600 text-sm">
                            {errors.rating.message}
                          </p>
                        )}
                      </div>

                      {/* Review Text */}
                      <textarea
                        {...register("comment", {
                          required: "Review is required",
                        })}
                        className="w-full p-2 border rounded resize-none"
                        placeholder="Write your review here..."
                        rows="4"
                      />
                      {errors.review && (
                        <p className="text-red-600 text-sm">
                          {errors.review.message}
                        </p>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="bg-[#E26C29] hover:bg-[#d35913] text-white px-10 flex items-center gap-2"
                      >
                        Send
                        <RiMailSendLine />
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsSection;
