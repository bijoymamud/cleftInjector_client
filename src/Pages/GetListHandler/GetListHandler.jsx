// // GetListHandler.jsx
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState("idle"); // idle | loading | success | error

//   /* ------------------- SAFE localStorage ------------------- */
//   const saveStep = (n, data) => {
//     try {
//       const safeData = data === undefined ? null : data;
//       localStorage.setItem(`step${n}Data`, JSON.stringify(safeData));
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

//   /* ------------------- Navigation ------------------- */
//   const next = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
//   const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

//   const handleStepSubmit = (step, data) => {
//     saveStep(step, data);
//     next();
//   };

//   const submitAll = async () => {
//     setIsSubmitting(true);
//     setSubmitResult("loading");

//     try {
//       const payload = {};
//       for (let i = 1; i <= TOTAL_STEPS; i++) {
//         const d = getStep(i);
//         if (d) Object.assign(payload, d);
//       }

//       const fd = new FormData();
//       const append = (obj, prefix = "") => {
//         Object.entries(obj).forEach(([k, v]) => {
//           const key = prefix ? `${prefix}[${k}]` : k;
//           if (v instanceof File) {
//             fd.append(key, v);
//           } else if (Array.isArray(v)) {
//             v.forEach((item, idx) => {
//               if (item instanceof File) fd.append(`${key}[${idx}]`, item);
//               else if (typeof item === "object" && item)
//                 append(item, `${key}[${idx}]`);
//               else fd.append(`${key}[${idx}]`, String(item));
//             });
//           } else if (typeof v === "object" && v !== null) {
//             append(v, key);
//           } else {
//             fd.append(key, String(v));
//           }
//         });
//       };
//       append(payload);

//       const res = await fetch("/api/listings", { method: "POST", body: fd });
//       if (res.ok) {
//         for (let i = 1; i <= TOTAL_STEPS; i++)
//           localStorage.removeItem(`step${i}Data`);
//         setSubmitResult("success");
//       } else {
//         setSubmitResult("error");
//       }
//     } catch (e) {
//       console.error("[submitAll]", e);
//       setSubmitResult("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* ------------------- Render Step ------------------- */
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
//             onFinalSubmit={submitAll}
//             onBack={back}
//             initialData={getStep(5)}
//             isSubmitting={isSubmitting}
//             submitResult={submitResult}
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

// GetListHandler.jsx
import { useState } from "react";
import { ListingStep1 } from "./ListingStep1";
import { ListingStep2 } from "./ListingStep2";
import { ListingStep3 } from "./ListingStep3";
import { ListingStep4 } from "./ListingStep4";
import { ListingStep5 } from "./ListingStep5";
import { ProgressBar } from "./ProgressBar";

export const GetListHandler = () => {
  const TOTAL_STEPS = 5;
  const [currentStep, setCurrentStep] = useState(1);

  const saveStep = (n, data) => {
    try {
      const safe = data === undefined ? null : data;
      localStorage.setItem(`step${n}Data`, JSON.stringify(safe));
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
      return JSON.parse(raw);
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
            getAllData={() => {
              const all = {};
              for (let i = 1; i <= TOTAL_STEPS; i++) {
                const d = getStep(i);
                if (d) Object.assign(all, d);
              }
              return all;
            }}
            clearAllData={() => {
              for (let i = 1; i <= TOTAL_STEPS; i++)
                localStorage.removeItem(`step${i}Data`);
            }}
          />
        );
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
