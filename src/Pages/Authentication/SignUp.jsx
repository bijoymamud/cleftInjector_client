import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { FaRegEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUserMutation } from "@/redux/features/authApi";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (userData) => {
    localStorage.setItem("user_email", userData.email);
    setIsSubmitting(true);

    try {
      const response = await createUser(userData).unwrap();
      console.log("Success:", response);

      toast.success(response?.message || "Account created successfully!");
      setTimeout(() => {
        navigate("/otp_verification", {
          state: { status: "signup" },
        });
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      // toast.error(err || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          success: { className: "bg-green-600 text-white" },
          error: { className: "bg-red-600 text-white" },
        }}
      />

      {/* Left side - Illustration */}
      <div className="hidden lg:flex items-center justify-center w-full basis-8/12">
        <div className="hidden lg:block w-full h-screen">
          <img
            src="https://i.ibb.co.com/HLmGB8Fx/64e78d2cd51524aaf4f8ce12-64e78d0d294a3db1449d0c31-Do-I-need-identity-theft-protection-lead-image.webp"
            alt="3D isometric illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:basis-6/12">
        <div className="w-full max-w-lg p-10 shadow-gray-300 shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 font-semibold text-center mb-2">
              Create Your Account
            </h1>
            <p className=" text-md text-center  text-[#5B5B5B]">
              Join our directory to connect with trusted injectors.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="full_name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm text-title placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("full_name", {
                  required: "Full Name is required",
                })}
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm text-title placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="number"
                placeholder="Enter your number"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm text-title placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("phone", {
                  required: "Number is required",
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm text-title placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FaRegEye size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role Select with Controller */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="py-3">
                      <SelectGroup>
                        <SelectLabel>Select Role</SelectLabel>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="provider">Provider</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="relative overflow-hidden w-full bg-[#E26C29] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none
                before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-200/10 hover:cursor-pointer before:transition-all before:duration-500 hover:before:w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-5 w-5" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </span>
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-tagline">
              Already have an account?{" "}
              <Link
                to="/sign_in"
                className="text-title hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
