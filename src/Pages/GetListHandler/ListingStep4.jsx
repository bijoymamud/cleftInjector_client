// import { MoveRight, Upload } from "lucide-react";
// import { useForm } from "react-hook-form";

// export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
//   const { register, handleSubmit } = useForm({
//     defaultValues: initialData || {},
//   });

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           Verification & Documentation
//         </h3>
//         <p className="text-sm text-gray-500 mb-6">
//           Upload your certification and review our terms
//         </p>

//         <div className="space-y-6">
//           <div>
//             <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
//               Certifications (Title)
//             </label>
//             <input
//               {...register("certTitle")}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload your certificates and training programs
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
//               <div className="flex flex-col items-center justify-center">
//                 <Upload className="w-12 h-12 text-gray-400 mb-2" />
//                 <p className="text-sm text-gray-500">
//                   Drag & drop files or{" "}
//                   <span className="text-blue-500 cursor-pointer">Browse</span>
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Click or Drag/Upload
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 {...register("confirm1")}
//                 className="mt-1"
//               />
//               <span className="text-sm text-gray-600">
//                 I confirm that the details are same as per my medical license
//                 which is issue by regularity and body of India or another
//                 trusted organization body
//               </span>
//             </label>

//             <label className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 {...register("confirm2")}
//                 className="mt-1"
//               />
//               <span className="text-sm text-gray-600">
//                 I confirm I disagree the any career employee practicing without
//                 proper qualification or who has misconduct cases
//               </span>
//             </label>

//             <label className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 {...register("confirm3")}
//                 className="mt-1"
//               />
//               <span className="text-sm text-gray-600">
//                 I submitted licenses or practice Certificate that is issued by
//                 proper regulatory or from other certification
//               </span>
//             </label>
//           </div>

//           <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
//             <p className="text-sm text-gray-700">
//               Your application will be Automatically be store for the 10th we
//               will notify when your application will be under review process.
//               And contact you with 10-12 business days after the submit your
//               application.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-black border border-gray-300 text-lg font-semibold"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleSubmit(onSubmit)}
//           className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
//         >
//           {" "}
//           Next
//           <MoveRight />
//         </button>
//       </div>
//     </div>
//   );
// };

import { MoveRight, Upload, Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: initialData || {
      certifications: [{ title: "", document: null }],
      confirm1: false,
      confirm2: false,
      confirm3: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  // Track file names for display
  const [fileNames, setFileNames] = useState({});

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(`certifications.${index}.document`, file);
      setFileNames((prev) => ({
        ...prev,
        [index]: file.name,
      }));
    }
  };

  return (
    <div className="space-y-6 py-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Verification & Documentation
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload your certification and review our terms
        </p>

        <div className="space-y-8">
          {/* Dynamic Certifications */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                Certifications
              </label>
              <button
                type="button"
                onClick={() => append({ title: "", document: null })}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Another
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                      Certification Title
                    </label>
                    <input
                      {...register(`certifications.${index}.title`)}
                      placeholder="e.g., American Board of Plastic Surgery"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setFileNames((prev) => {
                          const updated = { ...prev };
                          delete updated[index];
                          return updated;
                        });
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                    Upload Document
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(index, e)}
                      className="hidden"
                      id={`file-upload-${index}`}
                    />
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {fileNames[index] ? (
                          <span className="text-green-600 font-medium">
                            {fileNames[index]}
                          </span>
                        ) : (
                          <>
                            Drag & drop or{" "}
                            <span className="text-blue-500">Browse</span>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Confirmations */}
          <div className="space-y-3">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("confirm1")}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">
                I confirm that the details are same as per my medical license
                which is issued by regulatory body of India or another trusted
                organization.
              </span>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("confirm2")}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">
                I confirm I do not employ any career employee practicing without
                proper qualification or who has misconduct cases.
              </span>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("confirm3")}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">
                I have submitted licenses or practice certificates issued by
                proper regulatory or certification bodies.
              </span>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <p className="text-sm text-gray-700">
              Your application will be automatically stored. We will notify you
              when your application is under review. You will hear back within
              10-12 business days after submission.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          type="button"
          className="px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-black border border-gray-300 text-lg font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
        >
          Next
          <MoveRight />
        </button>
      </div>
    </div>
  );
};
