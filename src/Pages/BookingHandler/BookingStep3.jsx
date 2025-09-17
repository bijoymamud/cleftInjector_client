import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

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
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            📅
          </div>
          <span className="text-orange-500 font-medium">
            Book a Consultation
          </span>
        </div>
        <CardTitle className="text-sm text-muted-foreground">
          Schedule your appointment with our Sarah Johnson
        </CardTitle>

        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <span className="text-sm text-green-600">Date & Time</span>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <span className="text-sm text-green-600">Your Details</span>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 ${
                isConfirmed
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 text-white"
              } rounded-full flex items-center justify-center text-sm font-medium`}
            >
              {isConfirmed ? "✓" : "3"}
            </div>
            <span
              className={`text-sm ${
                isConfirmed ? "text-green-600" : "font-medium"
              }`}
            >
              Confirmation
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Confirm Your Appointment
          </h3>
          <p className="text-sm text-muted-foreground">
            Please review your appointment details before confirming
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-4">Appointment Summary</h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {formatDate(bookingData?.selectedDate)}
              </p>
              <p className="font-medium">
                {bookingData?.selectedTime || "Not selected"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Consultant</p>
              <p className="font-medium">Dr. Sarah Johnson</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Contact Details</p>
              <p className="font-medium">
                {(bookingData?.firstName || "") +
                  " " +
                  (bookingData?.lastName || "")}
              </p>
              <p className="text-sm">{bookingData?.email || "Not provided"}</p>
              <p className="text-sm">{bookingData?.phone || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Consultation Fee</p>
              <p className="font-medium text-lg">$150</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Reason For Visit</p>
            <p className="text-sm bg-white p-3 rounded border">
              {bookingData?.reason || "Not provided"}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Important Notes</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Please arrive 10 minutes before your appointment</li>
            <li>
              • You will receive a confirmation email with appointment details
            </li>
            <li>• Cancellations must be made 24 hours in advance</li>
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isConfirmed}
          >
            Confirm
          </Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-[2px] bg-white/50 flex items-center justify-center z-50">
            <div className="bg-gray-100 shadow-xl drop-shadow-xl border rounded-lg p-5 max-w-xl w-full">
              <div className="mx-auto mb-4">
                <img
                  src="https://i.ibb.co/Dfvzt87/Group-2147225355.png"
                  alt=""
                  className="flex items-center mx-auto justify-center w-1/3 py-5"
                />
                <h3 className="text-2xl font-semibold text-center py-5">
                  Consultation Booking <br /> Successfully
                </h3>
              </div>

              <Link to="/" className="flex justify-center">
                <Button
                  onClick={closeModal}
                  className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
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
