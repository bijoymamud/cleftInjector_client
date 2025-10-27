import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { FaRegEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";
import { useLogInMutation } from "@/redux/features/authApi";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logIn] = useLogInMutation();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      console.log(userData);

      const response = await logIn(userData).unwrap();
      console.log("Success:", response);
      toast.success(response?.data?.message || "Login successful!");
      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("refresh_token", response?.refresh_token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const message =
        error?.data?.detail ||
        error?.error ||
        toast.error(message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster position="top-right" />
      {/* Left side - Illustration */}
      <div className="hidden lg:flex items-center justify-center w-full lg:basis-8/12">
        <img
          src="https://i.ibb.co.com/HLmGB8Fx/64e78d2cd51524aaf4f8ce12-64e78d0d294a3db1449d0c31-Do-I-need-identity-theft-protection-lead-image.webp"
          alt="3D isometric illustration with computer and UNIONBIGDATA branding"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Sign in form */}
      <div className="flex items-center justify-center w-full lg:basis-6/12">
        <div className="w-full max-w-lg p-10 shadow-gray-300 shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 font-semibold text-center mb-2">
              Log In to Continue
            </h1>
            <p className="text-md text-center text-[#5B5B5B]">
              Access your account and manage your profile
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="yatingzang0215@gmail.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FaRegEye size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Link
              to="/email_verification"
              className="text-gray-600 text-sm underline flex justify-end hover:text-blue-500"
            >
              Forget Password?
            </Link>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 cursor-pointer bg-white/70 backdrop-blur-sm border-gray-300 rounded"
                  {...register("terms", {
                    required: "You must agree to the terms of service",
                  })}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600 cursor-pointer">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-gray-900 hover:text-blue-500 underline"
                  >
                    terms of service
                  </a>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="relative overflow-hidden w-full bg-[#E26C29] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-200/10 hover:cursor-pointer before:transition-all before:duration-500 hover:before:w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">Login Account</span>
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Be a member?{" "}
              <Link
                to="/sign_up"
                className="text-gray-900 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

