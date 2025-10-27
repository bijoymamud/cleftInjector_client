import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import BasicInformation from "./BasicInformation";
import ProfessionalBackground from "./ProfessionalBackground";
import ContactBookingInformation from "./ContactBookingInformation";
import VerificationDocumentation from "./VerificationDocumentation";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function GetListedController() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalSteps = 4;
  const currentStepRef = useRef(null);

  const handleNext = () => {
    if (currentStepRef.current && currentStepRef.current.validate()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (currentStepRef.current && currentStepRef.current.validate()) {
      const allData = currentStepRef.current.getAllData();
      console.log("Submitted Form Data:", allData); // Log all form data
      // TODO: Send allData to backend, e.g., using fetch or axios
      // Example:
      // fetch('/api/submit-application', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(allData)
      // }).then(response => {
      //   if (response.ok) {
      //     // success
      //   }
      // });
      localStorage.removeItem("getListedFormData"); // Clear localStorage
      setCurrentStep(1);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformation ref={currentStepRef} />;
      case 2:
        return <ProfessionalBackground ref={currentStepRef} />;
      case 3:
        return <ContactBookingInformation ref={currentStepRef} />;
      case 4:
        return <VerificationDocumentation ref={currentStepRef} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#E26C29] text-white rounded-md flex items-center justify-center text-sm font-medium">
              <MdFormatListBulletedAdd size={24} />
            </div>
            <h1 className="text-[30px] font-bold text-title">Get Listed</h1>
          </div>
          <p className="font-semibold text-md text-muted-foreground">
            Join our network of verified cleft lip injectors
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-gray-900 font-medium">
              Step{" "}
              <span className="text-lg font-bold">
                ( {currentStep} of {totalSteps} )
              </span>
            </span>
            <span className="text-base text-gray-900 font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Form Content */}
        <Card className="mb-8">{renderStepContent()}</Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="border rounded-md px-8 text-lg flex items-center gap-2 py-2 font-semibold cursor-pointer hover:bg-gray-100"
              disabled={currentStep === 1}
            >
              <FaArrowLeftLong />
              Back
            </button>
          )}
          <div className="flex justify-end ml-auto">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
              >
                Next <FaArrowRightLong />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
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
                Application Submitted <br /> Successfully
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
    </div>
  );
}
