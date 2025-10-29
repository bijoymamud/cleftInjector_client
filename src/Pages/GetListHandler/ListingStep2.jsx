// import { MoveRight } from "lucide-react";
// import { useForm } from "react-hook-form";

// export const ListingStep2 = ({ onSubmit, onBack, initialData }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialData || {},
//   });

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           Professional Background
//         </h3>
//         <p className="text-sm text-gray-500 mb-6">
//           Share your experience & qualifications
//         </p>

//         <div className="space-y-4">
//           {/* Specialties */}
//           <div>
//             <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
//               Specialties
//             </label>
//             <textarea
//               {...register("specialties")}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Describe your experience, Specialization"
//             />
//             {errors.specialties && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.specialties.message}
//               </p>
//             )}
//           </div>

//           {/* Qualification & Certifications */}
//           <div>
//             <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
//               Qualification & Certifications
//             </label>
//             <textarea
//               {...register("qualifications_certifications")}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="List your medical degrees, Certification and relevant training"
//             />
//             {errors.qualifications_certifications && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.qualifications_certifications.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
//               Awards & Recognitions
//             </label>
//             <textarea
//               {...register("awards_recognitions")}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="List down your awards"
//             />

//             {errors.awards_recognitions && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.awards_recognitions.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
//               Year of Experience
//             </label>
//             <input
//               type="number"
//               {...register("years_of_experience")}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Your experience"
//             />
//             {errors.years_of_experience && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.years_of_experience.message}
//               </p>
//             )}
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

import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";

export const ListingStep2 = ({ onSubmit, onBack, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Professional Background
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Share your experience & qualifications
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Specialties
            </label>
            <textarea
              {...register("specialties")}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Describe your specialization"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Qualifications & Certifications
            </label>
            <textarea
              {...register("qualifications_certifications")}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="List your degrees and certifications"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Awards & Recognitions
            </label>
            <textarea
              {...register("awards_recognitions")}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="List your awards"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              {...register("years_of_experience")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 10"
            />
          </div>
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
          onClick={handleSubmit(onSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};
