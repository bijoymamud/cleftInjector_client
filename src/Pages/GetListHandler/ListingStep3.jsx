import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";

export const ListingStep3 = ({ onSubmit, onBack, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">
          Contact & Booking Information
        </h3>
        <p className="text-sm text-gray-500 mb-6">How people contact you</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Phone Number
            </label>
            <input
              {...register("contactPhone")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("contactEmail")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="doctor@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Website (optional)
            </label>
            <input
              {...register("website")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              WhatsApp Number
            </label>
            <input
              {...register("whatsapp_number")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Languages Spoken
            </label>
            <input
              {...register("languages_spoken")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="English, Hindi"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Consultation Fee
            </label>
            <input
              type="number"
              {...register("consultation_fee")}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="500"
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
