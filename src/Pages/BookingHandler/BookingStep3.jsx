import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

export function BookingStep3({ onBack, bookingData, onConfirm, isConfirmed }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Booking Data:", bookingData);

    onConfirm();

    localStorage.removeItem("bookingData");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("isConfirmed");

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full ">
      <CardContent className="space-y-6 ">
        <div className="text-center py-5">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
            Confirm Your Appointment
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            Please review your appointment details before confirming
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h4 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
            Appointment Summary
          </h4>

          <div className="grid grid-cols-2 gap-8 py-10 pt-10">
            <div>
              <p className="text-lg font-semibold mb-2 text-[#3D3B3B]">
                Date & Time
              </p>
              <p className="font-medium">
                {formatDate(bookingData?.selectedDate)}
              </p>
              <p className="font-medium">
                {bookingData?.selectedTime || "Not selected"}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold mb-2 text-[#3D3B3B]">
                Consultant
              </p>
              <p className="font-medium">Dr. Sarah Johnson</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold mb-2 text-[#3D3B3B]">
                Contact Details
              </p>
              <p className="font-medium">
                {(bookingData?.firstName || "") +
                  " " +
                  (bookingData?.lastName || "")}
              </p>
              <p className="text-sm">{bookingData?.email || "Not provided"}</p>
              <p className="text-sm">{bookingData?.phone || "Not provided"}</p>
            </div>

            <div>
              <p className="text-lg font-semibold mb-2 text-[#3D3B3B]">
                Consultation Fee
              </p>
              <p className="font-medium text-lg">$150</p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2 text-[#3D3B3B]">
              Reason For Visit
            </p>
            <p className=" mb-2">- {bookingData?.reason || "Not provided"}</p>
          </div>
        </div>

        <div className="bg-[#F7F0E9] border  rounded-lg p-4">
          <h5 className="font-medium text-[#3A3A3A] mb-2">Important Notes</h5>
          <ul className="text-sm text-[#555555] space-y-1">
            <li>• Please arrive 10 minutes before your appointment</li>
            <li>
              • You will receive a confirmation email with appointment details
            </li>
            <li>• Cancellations must be made 24 hours in advance</li>
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border rounded-md px-8 text-lg flex items-center gap-2 py-2 font-semibold cursor-pointer hover:bg-gray-100"
          >
            <FaArrowLeftLong />
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
            disabled={isConfirmed}
          >
            Confirm
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-[2px] bg-white/50 flex items-center justify-center z-50">
            <div className="bg-gray-100 shadow-xl drop-shadow-xl border rounded-lg p-5 max-w-xl w-full">
              <div className="mx-auto mb-4">
                <img
                  src="https://i.ibb.co.com/Dfvzt87w/Group-2147225355.png"
                  alt=""
                  className="flex items-center mx-auto justify-center w-1/3 py-5"
                />
                <h3 className="text-2xl font-semibold text-center py-5">
                  Consultation Booked <br /> Successfully
                </h3>
              </div>

              <Link to="/" className="flex justify-center">
                <Button
                  onClick={closeModal}
                  className="bg-[#E26C29] text-base hover:bg-orange-600 cursor-pointer"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
