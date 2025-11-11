// import { MoveRight, Upload } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";

// export const ListingStep1 = ({ onSubmit, initialData }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialData || {},
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Load initial data including the File object
//   useEffect(() => {
//     if (initialData?.profile_image) {
//       // Check if it's already a File object from Redux
//       if (initialData.profile_image instanceof File) {
//         setProfileImage(initialData.profile_image);
//         setPreview(URL.createObjectURL(initialData.profile_image));
//       }

//     }
//   }, [initialData?.profile_image]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const onFormSubmit = (data) => {
//     // *** KEY CHANGE: Pass the actual File object to the handler. ***
//     onSubmit({
//       ...data,
//       ...(profileImage && { profile_image: profileImage }),
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           Basic Information
//         </h3>
//         <p className="text-sm text-gray-500 mb-6">Fill required information</p>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Designation Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("designation", { required: "Required" })}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter Name"
//             />
//             {errors.designation && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.designation.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Clinic Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("clinic_name", { required: "Required" })}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//               placeholder="Clinic Name"
//             />
//             {errors.clinic_name && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.clinic_name.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Country <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("country", { required: "Required" })}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//               placeholder="Country"
//             />
//             {errors.country && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.country.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               City <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("city", { required: "Required" })}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//               placeholder="City"
//             />
//             {errors.city && (
//               <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-lg font-semibold mb-2">
//             About Yourself <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             {...register("about", { required: "Required" })}
//             rows={5}
//             className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
//             placeholder="Tell us about yourself"
//           />
//           {errors.about && (
//             <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>
//           )}
//         </div>

//         <div className="mt-6">
//           <label className="block text-lg font-semibold mb-2">
//             Profile Picture
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//             id="profile-image"
//           />
//           <label
//             htmlFor="profile-image"
//             className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer flex flex-col items-center"
//           >
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-24 h-24 object-cover rounded-full mb-2"
//               />
//             ) : (
//               <Upload className="w-10 h-10 text-gray-400 mb-2" />
//             )}
//             <p className="text-sm text-gray-500">
//               {profileImage
//                 ? profileImage.name
//                 : "Drag & drop or click to upload"}
//             </p>
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={handleSubmit(onFormSubmit)}
//           className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold"
//         >
//           Next <MoveRight />
//         </button>
//       </div>
//     </div>
//   );
// };

import { MoveRight, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const ListingStep1 = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load initial data including the File object
  useEffect(() => {
    if (initialData?.profile_image) {
      // Check if it's already a File object
      if (initialData.profile_image instanceof File) {
        setProfileImage(initialData.profile_image);
        // Create preview URL from File object
        const previewUrl = URL.createObjectURL(initialData.profile_image);
        setPreview(previewUrl);

        // Cleanup function to revoke object URL
        return () => URL.revokeObjectURL(previewUrl);
      }
    }
  }, [initialData?.profile_image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous preview URL if exists
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = (data) => {
    // Pass the actual File object to the handler
    onSubmit({
      ...data,
      ...(profileImage && { profile_image: profileImage }),
    });
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Basic Information
        </h3>
        <p className="text-sm text-gray-500 mb-6">Fill required information</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Designation Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("designation", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Name"
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Clinic Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("clinic_name", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Clinic Name"
            />
            {errors.clinic_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.clinic_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              {...register("country", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              {...register("city", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">
            About Yourself <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("about", { required: "Required" })}
            rows={5}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            placeholder="Tell us about yourself"
          />
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-image"
          />
          <label
            htmlFor="profile-image"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer flex flex-col items-center hover:border-orange-300 transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
            ) : (
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-500">
              {profileImage
                ? profileImage.name
                : "Drag & drop or click to upload"}
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit(onFormSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold transition-colors"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};
