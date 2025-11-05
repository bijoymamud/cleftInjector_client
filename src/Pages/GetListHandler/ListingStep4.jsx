// import { MoveRight, Upload, Trash2, Plus } from "lucide-react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { useState } from "react";

// export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
//   const { register, handleSubmit, control } = useForm({
//     defaultValues: initialData || {
//       certifications: [{ title: "", document: null }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "certifications",
//   });
//   const [fileNames, setFileNames] = useState({});

//   const handleFileChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue(`certifications.${index}.document`, file);
//       setFileNames((prev) => ({ ...prev, [index]: file.name }));
//     }
//   };

//   const { setValue } = useForm().control;

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           Verification & Documentation
//         </h3>
//         <p className="text-sm text-gray-500 mb-6">Upload your certificates</p>

//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <label className="text-lg font-semibold">Certifications</label>
//             <button
//               type="button"
//               onClick={() => append({ title: "", document: null })}
//               className="flex items-center gap-1 text-orange-600 text-sm font-medium"
//             >
//               <Plus className="w-4 h-4" /> Add Another
//             </button>
//           </div>

//           {fields.map((field, index) => (
//             <div key={field.id} className="border rounded-lg p-4 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <label className="block text-lg font-semibold mb-2">
//                     Title
//                   </label>
//                   <input
//                     {...register(`certifications.${index}.title`)}
//                     className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//                     placeholder="e.g., MBBS"
//                   />
//                 </div>
//                 {fields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       remove(index);
//                       setFileNames((prev) => {
//                         const updated = { ...prev };
//                         delete updated[index];
//                         return updated;
//                       });
//                     }}
//                     className="ml-2 text-red-500"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-semibold mb-2">
//                   Upload Document
//                 </label>
//                 <input
//                   type="file"
//                   accept=".pdf,.jpg,.png"
//                   onChange={(e) => handleFileChange(index, e)}
//                   className="hidden"
//                   id={`file-${index}`}
//                 />
//                 <label
//                   htmlFor={`file-${index}`}
//                   className="border-2 border-dashed rounded-lg p-4 cursor-pointer flex flex-col items-center"
//                 >
//                   <Upload className="w-10 h-10 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">
//                     {fileNames[index] || "Drag & drop or click"}
//                   </p>
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 space-y-3">
//           {["confirm1", "confirm2", "confirm3"].map((name) => (
//             <label key={name} className="flex items-start gap-2">
//               <input type="checkbox" {...register(name)} className="mt-1" />
//               <span className="text-sm text-gray-600">
//                 {name === "confirm1" && "Details match my medical license"}
//                 {name === "confirm2" && "No unqualified employees"}
//                 {name === "confirm3" && "Submitted valid certificates"}
//               </span>
//             </label>
//           ))}
//         </div>

//         <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-6">
//           <p className="text-sm text-gray-700">
//             Your application will be reviewed within 10-12 business days.
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 py-2 rounded-md border border-gray-300 text-lg font-semibold"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleSubmit(onSubmit)}
//           className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold"
//         >
//           Next <MoveRight />
//         </button>
//       </div>
//     </div>
//   );
// };

import { MoveRight, Upload, Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
  // We re-initialize the form using the hook for full control
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: initialData || {
      // Use the structure that will hold the File object
      certifications: [{ title: "", document: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  // State to hold the display name for uploaded files
  const [fileNames, setFileNames] = useState({});

  // Populate fileNames state on initial data load
  useEffect(() => {
    if (initialData?.certifications) {
      const names = initialData.certifications.reduce((acc, cert, index) => {
        if (cert.document instanceof File) {
          acc[index] = cert.document.name;
        }
        return acc;
      }, {});
      setFileNames(names);
    }
  }, [initialData]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Use setValue to correctly set the File object in the React Hook Form state
      setValue(`certifications.${index}.document`, file, { shouldDirty: true });
      setFileNames((prev) => ({ ...prev, [index]: file.name }));
    }
  };

  // onSubmit will pass the data object which contains the certifications array with File objects.
  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      {/* Wrap the form content with an actual form element if this component handles the submit, 
          but since we are using handleSubmit(onFormSubmit) on the button, this is fine. */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Verification & Documentation
        </h3>
        <p className="text-sm text-gray-500 mb-6">Upload your certificates</p>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Certifications</label>
            <button
              type="button"
              onClick={() => append({ title: "", document: null })}
              className="flex items-center gap-1 text-orange-600 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Another
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label className="block text-lg font-semibold mb-2">
                    Title
                  </label>
                  <input
                    {...register(`certifications.${index}.title`)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., MBBS"
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
                    className="ml-2 text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Upload Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  // We use onChange and setValue manually to handle the File object
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-${index}`}
                />
                <label
                  htmlFor={`file-${index}`}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {fileNames[index] || "Drag & drop or click"}
                  </p>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {["confirm1", "confirm2", "confirm3"].map((name) => (
            <label key={name} className="flex items-start gap-2">
              <input type="checkbox" {...register(name)} className="mt-1" />
              <span className="text-sm text-gray-600">
                {name === "confirm1" && "Details match my medical license"}
                {name === "confirm2" && "No unqualified employees"}
                {name === "confirm3" && "Submitted valid certificates"}
              </span>
            </label>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-6">
          <p className="text-sm text-gray-700">
            Your application will be reviewed within 10-12 business days.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-2 rounded-md border border-gray-300 text-lg font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleSubmit(onFormSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};
