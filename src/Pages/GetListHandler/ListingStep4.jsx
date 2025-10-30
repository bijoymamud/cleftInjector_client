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

// import { MoveRight, Upload, Trash2, Plus, FileText, X } from "lucide-react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { useState, useEffect } from "react";

export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: initialData || {
      certifications: [{ title: "", document: null }],
      confirm1: false,
      confirm2: false,
      confirm3: false,
    },
  });

  const onSubmitLocal = (formData) => {
    onSubmit(serializeFormData(formData));
  };
  const serializeFormData = (data) => ({
    ...data,
    certifications: data.certifications.map((item) => ({
      title: item.title,
      document: item.document
        ? {
            name: item.document.name,
            type: item.document.type,
            preview: URL.createObjectURL(item.document),
          }
        : null,
    })),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const [filePreviews, setFilePreviews] = useState({});

  const watchedCerts = watch("certifications");

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      e.target.value = "";
      return;
    }

    setValue(`certifications.${index}.document`, file);

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreviews((prev) => ({
        ...prev,
        [index]: { name: file.name, preview: previewUrl, type: "image" },
      }));
    } else {
      setFilePreviews((prev) => ({
        ...prev,
        [index]: { name: file.name, preview: null, type: "pdf" },
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((item) => {
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [filePreviews]);

  const handleRemove = (index) => {
    const preview = filePreviews[index];
    if (preview?.preview) {
      URL.revokeObjectURL(preview.preview);
    }
    remove(index);
    setFilePreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <div className="space-y-6">
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
              className="flex items-center gap-1 text-orange-600 text-sm font-medium hover:text-orange-700"
            >
              <Plus className="w-4 h-4" /> Add Another
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-5 space-y-4 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    {...register(`certifications.${index}.title`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="e.g., MBBS, MD in Cardiology"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-3 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Document
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-upload-${index}`}
                />

                <label
                  htmlFor={`file-upload-${index}`}
                  className={`block border-2 border-dashed rounded-lg p-6 cursor-pointer text-center transition-all
                    ${
                      filePreviews[index]
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {filePreviews[index]?.name ||
                      "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </label>

                {/* Preview Area */}
                {filePreviews[index] && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                    {filePreviews[index].type === "image" ? (
                      <>
                        <img
                          src={filePreviews[index].preview}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {filePreviews[index].name}
                          </p>
                          <p className="text-xs text-green-600">
                            Image uploaded
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-red-50 rounded flex items-center justify-center">
                          <FileText className="w-10 h-10 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {filePreviews[index].name}
                          </p>
                          <p className="text-xs text-blue-600">PDF Document</p>
                        </div>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById(`file-upload-${index}`).value =
                          "";
                        handleRemove(index);
                      }}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Checkboxes */}
        <div className="mt-8 space-y-3">
          {[
            { name: "confirm1", label: "Details match my medical license" },
            { name: "confirm2", label: "No unqualified employees" },
            { name: "confirm3", label: "Submitted valid certificates" },
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register(item.name)}
                className="mt-0.5 w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-8">
          <p className="text-sm text-orange-800">
            Your application will be reviewed within 10-12 business days.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-2.5 rounded-md border border-gray-300 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmitLocal)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2.5 rounded-md flex items-center gap-2 text-white text-lg font-semibold transition shadow-sm"
        >
          Next <MoveRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
