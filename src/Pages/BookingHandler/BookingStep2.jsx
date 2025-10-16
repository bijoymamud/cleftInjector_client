import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";

import { CiUser } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { BsCardText } from "react-icons/bs";

const steps = [
  { number: 1, label: "Date & Time", icon: "📅" },
  { number: 2, label: "Your Details", icon: null },
  { number: 3, label: "Confirmation", icon: null },
];

export function BookingStep2({ onNext, onBack, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patient_first_name: initialData?.patient_first_name || "",
      patient_last_name: initialData?.patient_last_name || "",
      patient_email: initialData?.patient_email || "",
      patient_phone: initialData?.patient_phone || "",
      reason_for_visit: initialData?.reason_for_visit || "",
    },
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <Card className="w-full">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
              Your Information
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              Please provide your details for the appointment
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="patient_first_name"
                className="text-lg font-semibold"
              >
                <CiUser />
                First Name
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="patient_first_name"
                placeholder="Your first name"
                {...register("patient_first_name", {
                  required: "First name is required",
                })}
              />
              {errors.patient_first_name && (
                <p className="text-sm text-red-500">
                  {errors.patient_first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="patient_last_name"
                className="text-lg font-semibold"
              >
                <CiUser />
                Last Name
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="patient_last_name"
                placeholder="Your last name"
                {...register("patient_last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.patient_last_name && (
                <p className="text-sm text-red-500">
                  {errors.patient_last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient_email" className="text-lg font-semibold">
              <HiOutlineEnvelope />
              Email Address
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="patient_email"
              type="email"
              placeholder="your.email@example.com"
              {...register("patient_email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.patient_email && (
              <p className="text-sm text-red-500">
                {errors.patient_email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient_phone" className="text-lg font-semibold">
              <MdOutlinePhone />
              Phone Number
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="patient_phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("patient_phone", {
                required: "Phone number is required",
              })}
            />
            {errors.patient_phone && (
              <p className="text-sm text-red-500">
                {errors.patient_phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason_for_visit" className="text-lg font-semibold">
              <BsCardText />
              Reason For Visit
            </Label>
            <Textarea
              id="reason_for_visit"
              placeholder="Please describe the reason for your consultation..."
              className="!text-base placeholder:!text-base"
              rows={10}
              {...register("reason_for_visit", {
                required: "Please provide a reason for your visit",
              })}
            />
            {errors.reason_for_visit && (
              <p className="text-sm text-red-500">
                {errors.reason_for_visit.message}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border rounded-md px-8 text-lg flex items-center gap-2 py-2 font-semibold cursor-pointer hover:bg-gray-100"
            >
              <FaArrowLeftLong />
              Back
            </button>
            <button
              type="submit"
              className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
            >
              Next <FaArrowRightLong />
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
