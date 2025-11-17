
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";

export const ListingStep3 = ({ onSubmit, onBack, initialData }) => {
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
          Contact & Service Details
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Provide your contact information and service details
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Website URL
            </label>
            <input
              type="url"
              {...register("website")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="https://www.example.com"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("whatsapp_number", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="+1234567890"
            />
            {errors.whatsapp_number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.whatsapp_number.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Languages Spoken <span className="text-red-500">*</span>
            </label>
            <input
              {...register("languages_spoken", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., English, Spanish, French"
            />
            {errors.languages_spoken && (
              <p className="text-red-500 text-xs mt-1">
                {errors.languages_spoken.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple languages with commas
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Consultation Fee (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("consultation_fee", {
                required: "Required",
                min: { value: 0, message: "Fee must be positive" },
              })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="250.00"
            />
            {errors.consultation_fee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consultation_fee.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-2 rounded-md border border-gray-300 text-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold transition-colors"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};
