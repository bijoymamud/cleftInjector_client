import { useEffect, useState } from "react";
import { ListingStep1 } from "./ListingStep1";
import { ListingStep2 } from "./ListingStep2";
import { ListingStep3 } from "./ListingStep3";
import { ListingStep4 } from "./ListingStep4";
import { ListingStep5 } from "./ListingStep5";
import { ListingStep6 } from "./ListingStep6";
import { ProgressBar } from "./ProgressBar";

const GetListHandler = () => {
  const TOTAL_STEPS = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStepData = (step) => {
    const data = localStorage.getItem(`step${step}Data`);
    return data ? JSON.parse(data) : null;
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepSubmit = (stepNumber, data) => {
    localStorage.setItem(`step${stepNumber}Data`, JSON.stringify(data));
    goToNextStep();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const allData = {};
      for (let i = 1; i <= 5; i++) {
        const stepData = getStepData(i);
        if (stepData) {
          Object.assign(allData, stepData);
        }
      }

      const formData = new FormData();

      Object.entries(allData).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch("/api/listings", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        for (let i = 1; i <= 5; i++) {
          localStorage.removeItem(`step${i}Data`);
        }
        console.log("Application submitted successfully!");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentStep === 6 && !isSubmitting) {
      handleFinalSubmit();
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ListingStep1
            onSubmit={(data) => handleStepSubmit(1, data)}
            initialData={getStepData(1)}
          />
        );
      case 2:
        return (
          <ListingStep2
            onSubmit={(data) => handleStepSubmit(2, data)}
            onBack={goToPreviousStep}
            initialData={getStepData(2)}
          />
        );
      case 3:
        return (
          <ListingStep3
            onSubmit={(data) => handleStepSubmit(3, data)}
            onBack={goToPreviousStep}
            initialData={getStepData(3)}
          />
        );
      case 4:
        return (
          <ListingStep4
            onSubmit={(data) => handleStepSubmit(4, data)}
            onBack={goToPreviousStep}
            initialData={getStepData(4)}
          />
        );
      case 5:
        return (
          <ListingStep5
            onSubmit={(data) => handleStepSubmit(5, data)}
            onBack={goToPreviousStep}
            initialData={getStepData(5)}
          />
        );
      case 6:
        return <ListingStep6 />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <div className="mt-6">{renderStep()}</div>
      </div>
    </div>
  );
};

export default GetListHandler;
