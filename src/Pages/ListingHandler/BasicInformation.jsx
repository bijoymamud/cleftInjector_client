import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function BasicInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted ✅:", data);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("profilePicture", file); // store file in form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-semibold text-[#3D3B3B]">
            Basic Information{" "}
            <p className="text-lg text-muted-foreground font-normal mb-4 mt-4">
              Tell us yourself & your practice
            </p>
          </CardTitle>
        </CardHeader>

        <div className="space-y-6">
          {/* First + Last Name */}
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

          {/* Email */}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              Email
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Country + City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-lg font-semibold">
                Country
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="country"
                placeholder="Enter your country"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-semibold">
                City
              </Label>
              <Input
                className="py-5 !text-base placeholder:!text-base"
                id="city"
                placeholder="Enter your city"
                {...register("city", { required: "City is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <Label htmlFor="country" className="text-lg font-semibold">
              Upload Your Profile Picture
            </Label>
            <div className="border-2 my-5 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">
                Most accepted formats: JPG, PNG
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="profileUpload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("profileUpload").click()}
                className="text-orange-500 border-orange-500 cursor-pointer hover:bg-orange-50"
              >
                Choose File
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </form>
  );
}
