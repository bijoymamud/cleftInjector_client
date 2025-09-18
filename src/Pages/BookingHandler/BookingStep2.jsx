import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

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
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      reason: initialData?.reason || "",
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
              <Label htmlFor="firstName" className="text-lg font-semibold">
                First Name
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="firstName"
                placeholder="Your first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-lg font-semibold">
                Last Name
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="lastName"
                placeholder="Your last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              Email Address
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg font-semibold">
              Phone Number
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-lg font-semibold">
              Reason For Visit
            </Label>
            <Textarea
              id="reason"
              placeholder="Please describe the reason for your consultation..."
              className="!text-base placeholder:!text-base"
              rows={10}
              {...register("reason", {
                required: "Please provide a reason for your visit",
              })}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
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
