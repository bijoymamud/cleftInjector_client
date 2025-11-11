// import React, { useState } from "react";
// import {
//   Camera,
//   CircleDollarSign,
//   Edit2,
//   FilePenLine,
//   User,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useGetProviderProfileQuery } from "@/redux/features/baseApi";

// export default function Setting() {
//   const initialData = {
//     profilePicture:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
//     fullName: "Sarah Johnson",
//     specialization: "Cleft Lip and Palate Surgery",
//     email: "sarahjohnson@gmail.com",
//     yearsOfExperience: "15 years",
//     phoneNumber: "01980012351",
//     location: "new york, ny",
//     bio: "Dr. Sarah Johnson is a board-certified plastic surgeon specializing in cleft lip and palate reconstruction. With over 15 years of experience, she has helped hundreds of patients achieve better function and aesthetics.",
//     consultationFee: "150",
//   };

//   const [userData, setUserData] = useState(initialData);
//   const [previewImage, setPreviewImage] = useState(initialData.profilePicture);
//   const [isLoading, setIsLoading] = useState(false);

//   const { data: initialsData } = useGetProviderProfileQuery();
//   console.log(initialsData, "injector profile");

//   // Edit mode states for different sections
//   const [editMode, setEditMode] = useState({
//     details: false,
//     bio: false,
//     fee: false,
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: userData,
//   });

//   // Toggle edit mode for sections
//   const toggleEditMode = (section) => {
//     setEditMode((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));

//     if (!editMode[section]) {
//       reset(userData);
//     }
//   };

//   // Handle profile picture upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 500 * 1024) {
//         alert("File size should not exceed 500KB");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submission
//   const onSubmit = async (data) => {
//     setIsLoading(true);

//     try {
//       // Prepare form data for API
//       const apiData = new FormData();

//       // Append all fields
//       Object.keys(data).forEach((key) => {
//         apiData.append(key, data[key]);
//       });

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Update local state with new data
//       setUserData(data);

//       setEditMode({
//         details: false,
//         bio: false,
//         fee: false,
//       });

//       console.log("Form Data to be sent to API:", data);
//       alert("Settings saved successfully!");
//     } catch (error) {
//       console.error("Error saving settings:", error);
//       alert("Failed to save settings. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className=" mx-auto  min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//         <p className=" text-gray-500 mb-6 text-base">
//           Manage your profile, consultation fees, and preferences
//         </p>
//       </div>

//       {/* Profile Picture Section */}
//       <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
//         <div className="flex items-center gap-1 mb-2">
//           <Camera className="w-4 h-4 text-gray-600" />
//           <h2 className="text-base font-semibold text-gray-900">
//             Profile Picture
//           </h2>
//         </div>
//         <p className="text-sm text-gray-500 mb-4">
//           Update your profile picture that patients will see
//         </p>

//         <div className="flex items-start gap-4">
//           <div className="relative">
//             <img
//               src={previewImage}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//             />
//             <label
//               htmlFor="profile-upload"
//               className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
//             >
//               <Camera className="w-3 h-3" />
//               <input
//                 id="profile-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <div className="flex-1">
//             <label
//               htmlFor="profile-upload"
//               className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md text-sm font-medium cursor-pointer hover:bg-orange-50 transition-colors"
//             >
//               <Camera className="w-4 h-4" />
//               Change Profile Picture
//             </label>
//             <p className="text-xs text-gray-500 mt-2">
//               Recommended Square image at least 400x400px
//             </p>
//             <button
//               type="button"
//               className="text-xs text-orange-500 hover:text-orange-600 mt-2"
//             >
//               Want to change your password?
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Personal Information Section */}
//       <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
//         <div className="flex items-center justify-between gap-1 mb-4">
//           <div className="flex items-center gap-2">
//             <span className="text-orange-500">
//               <User size={24} />
//             </span>
//             <h2 className="text-lg font-semibold text-gray-900">
//               Personal Information
//             </h2>
//           </div>
//           <div>
//             <button
//               type="button"
//               onClick={() => toggleEditMode("details")}
//               className="flex items-center gap-2 text-sm cursor-pointer text-orange-500 hover:text-orange-600 ml-auto mt-4"
//             >
//               <Edit2 className="w-4 h-4" />
//               {editMode.details ? "Cancel" : "Edit Details"}
//             </button>
//           </div>
//         </div>

//         {!editMode.details ? (
//           // View Mode - Flat Display
//           <div className="grid grid-cols-2 gap-6 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Full Name
//               </label>
//               <p className="text-gray-900">{userData.fullName}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Specialization
//               </label>
//               <p className="text-gray-900">{userData.specialization}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email
//               </label>
//               <p className="text-gray-900">{userData.email}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Year of Experience
//               </label>
//               <p className="text-gray-900">{userData.yearsOfExperience}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Phone Number
//               </label>
//               <p className="text-gray-900">{userData.phoneNumber}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Location
//               </label>
//               <p className="text-gray-900">{userData.location}</p>
//             </div>
//           </div>
//         ) : (
//           // Edit Mode - Input Fields
//           <div className="grid grid-cols-2 gap-6 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 {...register("fullName", { required: "Full name is required" })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Specialization
//               </label>
//               <input
//                 type="text"
//                 {...register("specialization", {
//                   required: "Specialization is required",
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.specialization && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.specialization.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Year of Experience
//               </label>
//               <input
//                 type="text"
//                 {...register("yearsOfExperience", {
//                   required: "Years of experience is required",
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.yearsOfExperience && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.yearsOfExperience.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 {...register("phoneNumber", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^[0-9]{11}$/,
//                     message: "Please enter a valid 11-digit phone number",
//                   },
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.phoneNumber && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.phoneNumber.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 {...register("location", { required: "Location is required" })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {errors.location && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.location.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Personal Bio Section */}
//       <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-orange-500">
//             <FilePenLine size={24} />
//           </span>
//           <h2 className="text-lg font-semibold text-gray-900">Personal Bio</h2>

//           <button
//             type="button"
//             onClick={() => toggleEditMode("bio")}
//             className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 ml-auto"
//           >
//             <Edit2 className="w-4 h-4" />
//             {editMode.bio ? "Cancel" : "Edit Bio"}
//           </button>
//         </div>

//         {!editMode.bio ? (
//           // View Mode
//           <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
//         ) : (
//           // Edit Mode
//           <div>
//             <textarea
//               {...register("bio", {
//                 required: "Bio is required",
//                 minLength: {
//                   value: 50,
//                   message: "Bio must be at least 50 characters",
//                 },
//               })}
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
//             />
//             {errors.bio && (
//               <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Consultation Fee Section */}
//       <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-orange-500">
//             <CircleDollarSign size={24} />
//           </span>
//           <h2 className="text-base font-semibold text-gray-900">
//             Consultation Fee
//           </h2>
//           <button
//             type="button"
//             onClick={() => toggleEditMode("fee")}
//             className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 ml-auto mt-4"
//           >
//             <Edit2 className="w-4 h-4" />
//             {editMode.fee ? "Cancel" : "Edit Fee"}
//           </button>
//         </div>

//         {!editMode.fee ? (
//           // View Mode
//           <p className="text-3xl font-bold text-gray-900">
//             ${userData.consultationFee}
//           </p>
//         ) : (
//           // Edit Mode
//           <div>
//             <input
//               type="number"
//               {...register("consultationFee", {
//                 required: "Consultation fee is required",
//                 min: {
//                   value: 1,
//                   message: "Fee must be greater than 0",
//                 },
//               })}
//               className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-2xl font-semibold"
//             />
//             {errors.consultationFee && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.consultationFee.message}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Save Button - Only show when in edit mode */}
//       {(editMode.details || editMode.bio || editMode.fee) && (
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => {
//               setEditMode({ details: false, bio: false, fee: false });
//               reset(userData);
//             }}
//             className="px-8 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
//           >
//             Cancel All
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit(onSubmit)}
//             disabled={isLoading}
//             className="px-8 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Saving..." : "Save Change"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Camera,
  CircleDollarSign,
  Edit2,
  FilePenLine,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useGetProviderProfileQuery,
  useProfileSettingsMutation,
} from "@/redux/features/baseApi";
import { toast, Toaster } from "sonner";

export default function Setting() {
  const {
    data: apiData,
    isLoading: profileLoading,
    isError,
  } = useGetProviderProfileQuery();
  const [profileSettings, { isLoading: isSaving }] =
    useProfileSettingsMutation();

  // Transform API data to match form structure
  const transformApiData = (data) => {
    if (!data) return null;
    return {
      profilePicture: data.profile_image || "",
      fullName: data.full_name || "",
      specialization: data.designation || "",
      email: data.email || "",
      yearsOfExperience: data.years_of_experience
        ? `${data.years_of_experience} years`
        : "",
      phoneNumber: data.phone || "",
      location: `${data.city || ""}, ${data.country || ""}`
        .trim()
        .replace(/^,\s*|,\s*$/g, ""),
      bio: data.about || "",
      consultationFee: data.consultation_fee || "0",
      clinicName: data.clinic_name || "",
      specialties: data.specialties || "",
      website: data.website || "",
      whatsappNumber: data.whatsapp_number || "",
      languagesSpoken: data.languages_spoken || "",
      awardsRecognitions: data.awards_recognitions || "",
    };
  };

  const [userData, setUserData] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Edit mode states for different sections
  const [editMode, setEditMode] = useState({
    details: false,
    bio: false,
    fee: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Initialize form data when API data loads
  useEffect(() => {
    if (apiData) {
      const transformedData = transformApiData(apiData);
      setUserData(transformedData);
      setPreviewImage(transformedData.profilePicture);
      reset(transformedData);
    }
  }, [apiData, reset]);

  // Toggle edit mode for sections
  const toggleEditMode = (section) => {
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

    if (!editMode[section]) {
      reset(userData);
      setPreviewImage(userData.profilePicture);
      setUploadedFile(null);
    }
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error("File size should not exceed 500KB");
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Add profile picture if uploaded
      if (uploadedFile) {
        formData.append("profile_image", uploadedFile);
      }

      // Map form fields to API fields
      formData.append("full_name", data.fullName);
      formData.append("designation", data.specialization);
      formData.append("email", data.email);
      formData.append(
        "years_of_experience",
        parseInt(data.yearsOfExperience) || 0
      );
      formData.append("phone", data.phoneNumber);

      // Split location into city and country
      const locationParts = data.location.split(",").map((part) => part.trim());
      formData.append("city", locationParts[0] || "");
      formData.append("country", locationParts[1] || "");

      formData.append("about", data.bio);
      formData.append(
        "consultation_fee",
        parseFloat(data.consultationFee) || 0
      );

      const result = await profileSettings(formData).unwrap();

      // Success - update local state
      const updatedData = { ...data };
      if (!uploadedFile) {
        updatedData.profilePicture = userData.profilePicture;
      }
      setUserData(updatedData);

      setEditMode({
        details: false,
        bio: false,
        fee: false,
      });

      setUploadedFile(null);

      // Show success toast
      toast.success(result?.detail || "Profile updated successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);

      // Show error toast
      const errorMessage =
        error?.data?.detail ||
        error?.message ||
        "Failed to save settings. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (isError || !apiData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">
          Failed to load profile data. Please try again.
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Initializing...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen">
      {/* Header */}
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          success: { className: "bg-green-600 text-white" },
          error: { className: "bg-red-600 text-white" },
        }}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500 mb-6 text-base">
          Manage your profile, consultation fees, and preferences
        </p>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
        <div className="flex items-center gap-1 mb-2">
          <Camera className="w-4 h-4 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Picture
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Update your profile picture that patients will see
        </p>

        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
            >
              <Camera className="w-3 h-3" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <label
              htmlFor="profile-upload"
              className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md text-sm font-medium cursor-pointer hover:bg-orange-50 transition-colors"
            >
              <Camera className="w-4 h-4" />
              Change Profile Picture
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Recommended Square image at least 400x400px
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
        <div className="flex items-center justify-between gap-1 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-500">
              <User size={24} />
            </span>
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>
          </div>
          <div>
            <button
              type="button"
              onClick={() => toggleEditMode("details")}
              className="flex items-center gap-2 text-sm cursor-pointer text-orange-500 hover:text-orange-600 ml-auto mt-4"
            >
              <Edit2 className="w-4 h-4" />
              {editMode.details ? "Cancel" : "Edit Details"}
            </button>
          </div>
        </div>

        {!editMode.details ? (
          // View Mode - Flat Display
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <p className="text-gray-900">{userData.fullName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Specialization
              </label>
              <p className="text-gray-900">{userData.specialization}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <p className="text-gray-900">{userData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Year of Experience
              </label>
              <p className="text-gray-900">{userData.yearsOfExperience}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <p className="text-gray-900">{userData.phoneNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Location
              </label>
              <p className="text-gray-900">{userData.location}</p>
            </div>
          </div>
        ) : (
          // Edit Mode - Input Fields
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Specialization
              </label>
              <input
                type="text"
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.specialization && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                readOnly
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 text-gray-500 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                readOnly
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 text-gray-500 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pointer-events-none "
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Year of Experience
              </label>
              <input
                type="text"
                {...register("yearsOfExperience", {
                  required: "Years of experience is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Please enter a valid 11-digit phone number",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Personal Bio Section */}
      <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-orange-500">
            <FilePenLine size={24} />
          </span>
          <h2 className="text-lg font-semibold text-gray-900">Personal Bio</h2>

          <button
            type="button"
            onClick={() => toggleEditMode("bio")}
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 ml-auto"
          >
            <Edit2 className="w-4 h-4" />
            {editMode.bio ? "Cancel" : "Edit Bio"}
          </button>
        </div>

        {!editMode.bio ? (
          // View Mode
          <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
        ) : (
          // Edit Mode
          <div>
            <textarea
              {...register("bio", {
                required: "Bio is required",
                minLength: {
                  value: 50,
                  message: "Bio must be at least 50 characters",
                },
              })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Consultation Fee Section */}
      <div className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-orange-500">
            <CircleDollarSign size={24} />
          </span>
          <h2 className="text-base font-semibold text-gray-900">
            Consultation Fee
          </h2>
          <button
            type="button"
            onClick={() => toggleEditMode("fee")}
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 ml-auto mt-4"
          >
            <Edit2 className="w-4 h-4" />
            {editMode.fee ? "Cancel" : "Edit Fee"}
          </button>
        </div>

        {!editMode.fee ? (
          // View Mode
          <p className="text-3xl font-bold text-gray-900">
            ${userData.consultationFee}
          </p>
        ) : (
          // Edit Mode
          <div>
            <input
              type="number"
              {...register("consultationFee", {
                required: "Consultation fee is required",
                min: {
                  value: 1,
                  message: "Fee must be greater than 0",
                },
              })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-2xl font-semibold"
            />
            {errors.consultationFee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consultationFee.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Save Button - Only show when in edit mode */}
      {(editMode.details || editMode.bio || editMode.fee) && (
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setEditMode({ details: false, bio: false, fee: false });
              reset(userData);
              setPreviewImage(userData.profilePicture);
              setUploadedFile(null);
            }}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel All
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="px-8 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Change"}
          </button>
        </div>
      )}
    </div>
  );
}
