import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { IoIosEye } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success("Account created successfully.");

    setTimeout(() => {
      navigate("/sign_in"); // redirect to login after signup
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster position="top-right" />

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

      {/* Right side - Sign Up form */}
      <div className="flex items-center justify-center w-full basis-6/12">
        <div className="w-full max-w-lg p-10 shadow-gray-300 shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-title mb-2">Sign Up</h1>
            <p className="text-tagline text-sm">
              Join our logistics supply chain platform.
              <br />
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-label mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm text-title placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-label mb-2"
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

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-label mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
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

            {/* Submit button */}
            <button
              type="submit"
              className="relative overflow-hidden w-full bg-title text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
             before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-200/10 hover:cursor-pointer before:transition-all before:duration-500 hover:before:w-full"
            >
              <span className="relative z-10">Create Account</span>
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-tagline">
              Already have an account?{" "}
              <Link
                to="/sign_in"
                className="text-title  hover:underline font-medium"
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
