import { useState, useEffect } from "react";
import { BookingStep1 } from "./BookingStep1";
import { BookingStep2 } from "./BookingStep2";
import { BookingStep3 } from "./BookingStep3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineCalendarToday } from "react-icons/md";

const steps = [
  { number: 1, label: "Date & Time", icon: null },
  { number: 2, label: "Your Details", icon: null },
  { number: 3, label: "Confirmation", icon: null },
];

export default function BookConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    const savedData = localStorage.getItem("bookingData");
    const savedConfirmed = localStorage.getItem("isConfirmed");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
    if (savedData) {
      setBookingData(JSON.parse(savedData));
    }
    if (savedConfirmed) {
      setIsConfirmed(JSON.parse(savedConfirmed));
    }
  }, []);

  const handleNext = (data) => {
    const updatedData = {
      ...bookingData,
      ...data,
    };
    setBookingData(updatedData);
    localStorage.setItem("bookingData", JSON.stringify(updatedData));

    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      localStorage.setItem("currentStep", nextStep);
      return nextStep;
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => {
      const prevStep = prev - 1;
      localStorage.setItem("currentStep", prevStep);
      return prevStep;
    });
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    localStorage.setItem("isConfirmed", JSON.stringify(true));
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStep1
            onNext={handleNext}
            initialData={bookingData}
            isConfirmed={isConfirmed}
          />
        );
      case 2:
        return (
          <BookingStep2
            onNext={handleNext}
            onBack={handleBack}
            initialData={bookingData}
            isConfirmed={isConfirmed}
          />
        );
      case 3:
        return (
          <BookingStep3
            onBack={handleBack}
            bookingData={bookingData}
            onConfirm={handleConfirm}
            isConfirmed={isConfirmed}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E26C29] text-white rounded-md flex items-center justify-center text-sm font-medium">
                <MdOutlineCalendarToday size={24} />
              </div>
              <span className="text-[30px] font-bold text-title ">
                Book a Consultation
              </span>
            </div>
            <CardTitle className="text-md text-muted-foreground">
              Schedule your appointment with our{" "}
              <span className="text-black text-lg">Sarah Johnson</span>
            </CardTitle>
            <div className="flex items-center justify-center gap-8 my-10">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center gap-2">
                  <div
                    className={`w-12 h-12 ${
                      step.number === currentStep
                        ? "bg-[#E26C29] text-white"
                        : step.number < currentStep ||
                          (step.number === 3 && isConfirmed)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    } rounded-full flex items-center justify-center text-2xl font-semibold`}
                  >
                    {step.number < currentStep ||
                    (step.number === 3 && isConfirmed)
                      ? "✓"
                      : step.icon && step.number === currentStep
                      ? step.icon
                      : step.number}
                  </div>
                  <span
                    className={`text-xl ${
                      step.number === currentStep
                        ? "text-black font-semibold"
                        : step.number < currentStep ||
                          (step.number === 3 && isConfirmed)
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </div>
      </div>
    </div>
  );
}
