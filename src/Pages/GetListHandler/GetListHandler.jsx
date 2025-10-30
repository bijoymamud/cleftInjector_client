// import { useState } from "react";
// import { ListingStep1 } from "./ListingStep1";
// import { ListingStep2 } from "./ListingStep2";
// import { ListingStep3 } from "./ListingStep3";
// import { ListingStep4 } from "./ListingStep4";
// import { ListingStep5 } from "./ListingStep5";
// import { ProgressBar } from "./ProgressBar";

// export const GetListHandler = () => {
//   const TOTAL_STEPS = 5;
//   const [currentStep, setCurrentStep] = useState(1);

//   const saveStep = (n, data) => {
//     try {
//       const safe = data === undefined ? null : data;
//       localStorage.setItem(`step${n}Data`, JSON.stringify(safe));
//     } catch (e) {
//       console.error(`[saveStep ${n}]`, e);
//     }
//   };

//   const getStep = (n) => {
//     try {
//       const raw = localStorage.getItem(`step${n}Data`);
//       if (!raw || raw === "undefined" || raw === "null") {
//         localStorage.removeItem(`step${n}Data`);
//         return null;
//       }
//       return JSON.parse(raw);
//     } catch (e) {
//       console.error(`[getStep ${n}]`, e);
//       localStorage.removeItem(`step${n}Data`);
//       return null;
//     }
//   };

//   const next = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
//   const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

//   const handleStepSubmit = (step, data) => {
//     saveStep(step, data);
//     next();
//   };

//   // ✅ FIXED: Proper getAllData that MERGES all steps
//   const getAllData = () => {
//     const all = {};
//     for (let i = 1; i <= TOTAL_STEPS; i++) {
//       const stepData = getStep(i);
//       if (stepData) {
//         Object.assign(all, stepData);
//       }
//     }
//     return all;
//   };

//   // ✅ FIXED: Proper clearAllData
//   const clearAllData = () => {
//     for (let i = 1; i <= TOTAL_STEPS; i++) {
//       localStorage.removeItem(`step${i}Data`);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <ListingStep1
//             onSubmit={(d) => handleStepSubmit(1, d)}
//             initialData={getStep(1)}
//           />
//         );
//       case 2:
//         return (
//           <ListingStep2
//             onSubmit={(d) => handleStepSubmit(2, d)}
//             onBack={back}
//             initialData={getStep(2)}
//           />
//         );
//       case 3:
//         return (
//           <ListingStep3
//             onSubmit={(d) => handleStepSubmit(3, d)}
//             onBack={back}
//             initialData={getStep(3)}
//           />
//         );
//       case 4:
//         return (
//           <ListingStep4
//             onSubmit={(d) => handleStepSubmit(4, d)}
//             onBack={back}
//             initialData={getStep(4)}
//           />
//         );
//       case 5:
//         return (
//           <ListingStep5
//             onBack={back}
//             initialData={getStep(5)}
//             getAllData={getAllData}
//             clearAllData={clearAllData}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-2xl">
//         <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
//         <div className="mt-6">{renderStep()}</div>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { ListingStep1 } from "./ListingStep1";
import { ListingStep2 } from "./ListingStep2";
import { ListingStep3 } from "./ListingStep3";
import { ListingStep4 } from "./ListingStep4";
import { ListingStep5 } from "./ListingStep5";

export const GetListHandler = () => {
  const TOTAL_STEPS = 5;
  const [currentStep, setCurrentStep] = useState(1);

  // Store files in memory (not localStorage)
  const [fileStore, setFileStore] = useState({
    profile_image: null,
    certifications: [],
  });

  const saveStep = (n, data) => {
    try {
      // Separate files from other data
      const { profile_image, certifications, ...otherData } = data;

      // Save non-file data to localStorage
      localStorage.setItem(`step${n}Data`, JSON.stringify(otherData));

      // Save files to state
      if (n === 1 && profile_image) {
        setFileStore((prev) => ({ ...prev, profile_image }));
      }

      if (n === 4 && certifications) {
        setFileStore((prev) => ({ ...prev, certifications }));
      }
    } catch (e) {
      console.error(`[saveStep ${n}]`, e);
    }
  };

  const getStep = (n) => {
    try {
      const raw = localStorage.getItem(`step${n}Data`);
      if (!raw || raw === "undefined" || raw === "null") {
        localStorage.removeItem(`step${n}Data`);
        return null;
      }

      const data = JSON.parse(raw);

      // Add files back from state
      if (n === 1 && fileStore.profile_image) {
        data.profile_image = fileStore.profile_image;
      }

      if (n === 4 && fileStore.certifications.length > 0) {
        data.certifications = fileStore.certifications;
      }

      return data;
    } catch (e) {
      console.error(`[getStep ${n}]`, e);
      localStorage.removeItem(`step${n}Data`);
      return null;
    }
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleStepSubmit = (step, data) => {
    saveStep(step, data);
    next();
  };

  const getAllData = () => {
    const all = {};

    // Merge all step data from localStorage
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const raw = localStorage.getItem(`step${i}Data`);
      if (raw && raw !== "undefined" && raw !== "null") {
        try {
          const stepData = JSON.parse(raw);
          Object.assign(all, stepData);
        } catch (e) {
          console.error(`Error parsing step ${i}:`, e);
        }
      }
    }

    // Add files from state
    if (fileStore.profile_image) {
      all.profile_image = fileStore.profile_image;
    }

    if (fileStore.certifications.length > 0) {
      all.certifications = fileStore.certifications;
    }

    return all;
  };

  const clearAllData = () => {
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      localStorage.removeItem(`step${i}Data`);
    }
    setFileStore({ profile_image: null, certifications: [] });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ListingStep1
            onSubmit={(d) => handleStepSubmit(1, d)}
            initialData={getStep(1)}
          />
        );
      case 2:
        return (
          <ListingStep2
            onSubmit={(d) => handleStepSubmit(2, d)}
            onBack={back}
            initialData={getStep(2)}
          />
        );
      case 3:
        return (
          <ListingStep3
            onSubmit={(d) => handleStepSubmit(3, d)}
            onBack={back}
            initialData={getStep(3)}
          />
        );
      case 4:
        return (
          <ListingStep4
            onSubmit={(d) => handleStepSubmit(4, d)}
            onBack={back}
            initialData={getStep(4)}
          />
        );
      case 5:
        return (
          <ListingStep5
            onBack={back}
            initialData={getStep(5)}
            getAllData={getAllData}
            clearAllData={clearAllData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6 bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-orange-600">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-6">{renderStep()}</div>
      </div>
    </div>
  );
};
