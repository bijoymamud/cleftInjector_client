import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import BasicInformation from "./BasicInformation";
import ProfessionalBackground from "./ProfessionalBackground";
import ContactBookingInformation from "./ContactBookingInformation";
import VerificationDocumentation from "./VerificationDocumentation";
import { MdFormatListBulletedAdd } from "react-icons/md";

export default function GetListedController() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    profilePicture: null,

    // Professional Background
    jobTitle: "",
    qualifications: "",
    experience: "",

    // Contact & Booking Information
    phoneNumber: "",
    emailAddress: "",
    website: "",
    whatsapp: "",
    languageSpoken: "",
    consultationFee: "",

    // Verification & Documentation
    certificates: null,
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false,
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("getListedFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("getListedFormData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Remove data from localStorage
    localStorage.removeItem("getListedFormData");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      city: "",
      profilePicture: null,
      jobTitle: "",
      qualifications: "",
      experience: "",
      phoneNumber: "",
      emailAddress: "",
      website: "",
      whatsapp: "",
      languageSpoken: "",
      consultationFee: "",
      certificates: null,
      agreeToTerms: false,
      agreeToPrivacy: false,
      agreeToMarketing: false,
    });
    setCurrentStep(1);
    alert("Application submitted successfully!");
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <ProfessionalBackground
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ContactBookingInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <VerificationDocumentation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
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
            <h1 className="text-[30px] font-bold text-title ">Get Listed</h1>
          </div>
          <p className="font-semibold text-md text-muted-foreground">
            Join our network of verified cleft lip injectors
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
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
  );
}
