import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { FaRegEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";
import { useLogInMutation } from "@/redux/features/authApi";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/features/baseApi"; // Import your baseApi

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [logIn, { isLoading }] = useLogInMutation();

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

      dispatch(baseApi.util.resetApiState());

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      const message = error?.error || error?.data?.detail || "Login failed";
      toast.error(message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster position="bottom-right" richColors />

      <div className="hidden lg:flex items-center justify-center w-full lg:basis-8/12 bg-gradient-to-br from-orange-50 to-blue-50">
        <img
          src="https://i.ibb.co.com/HLmGB8Fx/64e78d2cd51524aaf4f8ce12-64e78d0d294a3db1449d0c31-Do-I-need-identity-theft-protection-lead-image.webp"
          alt="3D isometric illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:basis-6/12 p-4">
        <div className="w-full max-w-lg p-8 sm:p-10 bg-white rounded-2xl shadow-xl">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 font-bold text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-md text-center text-gray-600">
              Log in to continue to your account
            </p>
          </div>

          <div className="space-y-6">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-900 placeholder-gray-400 outline-none"
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
                <p
                  id="email-error"
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.email.message}
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
                  placeholder="Enter your password"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-900 placeholder-gray-400 outline-none"
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end w-full">
              <Link
                to="/email_verification"
                className="text-sm text-orange-600 font-medium hover:text-orange-700 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-orange-600 cursor-pointer bg-white border-gray-300 rounded focus:ring-2 focus:ring-orange-200"
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
                    className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                  >
                    terms of service
                  </a>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 font-medium">
                {errors.terms.message}
              </p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login to Account"
              )}
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign_up"
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
