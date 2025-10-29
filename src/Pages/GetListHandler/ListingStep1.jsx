import { MoveRight, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

export const ListingStep1 = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Basic Information
        </h3>
        <p className="text-sm text-gray-500 mb-6">Fill required information</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* designation */}
            <div>
              <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                Designation Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("designation", {
                  required: "Designation name is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter Name"
              />
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>

            {/* Clinic Name */}
            <div>
              <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("clinic_name", {
                  required: "Clinic Name is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="+1"
              />
              {errors.clinic_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.clinic_name.message}
                </p>
              )}
            </div>
          </div>

          {/* country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("country", { required: "Country is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your country"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            {/* city */}
            <div className="">
              <div>
                <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div>
              <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
                About Yourself <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                {...register("about")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="About yourself"
                rows={5}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-lg font-semibold mb-2">
              Upload Your Profile Picture
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Drag & drop files or{" "}
                  <span className="text-blue-500 cursor-pointer">Browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
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
