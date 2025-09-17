

import { useState, useEffect } from "react";
import { BookingStep1 } from "./BookingStep1";
import { BookingStep2 } from "./BookingStep2";
import { BookingStep3 } from "./BookingStep3";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">{renderStep()}</div>
    </div>
  );
}
