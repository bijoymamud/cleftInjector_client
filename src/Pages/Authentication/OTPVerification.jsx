import { useForm } from "react-hook-form";
import { MdKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { useRef, useState } from "react";
import {
  useOtpVerificationMutation,
  useResendOTPMutation,
} from "@/redux/features/authApi";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function OTPVerification() {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [otpVerification] = useOtpVerificationMutation();
  const [resendOTP] = useResendOTPMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSubmitting, setOtpSubmitting] = useState(false);

  const inputRefs = useRef([]);

  const location = useLocation();
  const status = location.state?.status;
  console.log("Status:", status);

  const onSubmit = async (data) => {
    const otp = Object.values(data).join("");
    console.log("OTP submitted:", otp);
    setIsSubmitting(true);

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    const payload = {
      email: localStorage.getItem("user_email"),
      otp: otp,
    };

    // try {
    //   const response = await otpVerification(payload).unwrap();
    //   console.log("Success:", response);
    //   localStorage.setItem("access_token", response?.access_token);
    //   localStorage.setItem("refresh_token", response?.refresh_token);
    //   toast.success(response?.detail || "OTP Verification successful!");
    //   setTimeout(() => {
    //     if (status === "signup") {
    //       navigate("/sign_in");
    //     } else if (
    //       response?.profile_data?.user &&
    //       response?.profile_data?.role === "provider"
    //     ) {
    //       navigate("/get-listed");
    //     } else if (status === "reset") {
    //       navigate("/reset_password");
    //     } else {
    //       navigate("/");
    //     }
    //   }, 1000);
    // } catch (error) {
    //   console.error("Error during OTP verification:", error);
    //   toast.error(
    //     error?.data?.message || "Failed to verify OTP. Please try again."
    //   );
    // } finally {
    //   setIsSubmitting(false);
    // }
    try {
      const response = await otpVerification(payload).unwrap();
      console.log("Success:", response);

      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("refresh_token", response?.refresh_token);
      localStorage.setItem("user_id", response?.profile_data?.user);

      toast.success(response?.detail || "OTP Verification successful!");

      setTimeout(() => {
        if (
          response?.profile_data?.user &&
          response?.profile_data?.role === "provider"
        ) {
          navigate("/get-listed");
        } else if (status === "signup") {
          navigate("/sign_in");
        } else if (status === "reset") {
          navigate("/reset_password");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(
        error?.data?.message || "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //resend
  const resendOpt = async () => {
    setOtpSubmitting(true);

    const email = {
      email: localStorage.getItem("user_email"),
    };

    try {
      const response = await resendOTP(email).unwrap();
      console.log("Success:", response);
      toast.success(response?.message || "OTP Resend successful!");
    } catch (error) {
      console.log("Error during resending OTP:", error);
    } finally {
      setOtpSubmitting(false); // Changed from setIsSubmitting to setOtpSubmitting
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue(`otp${index}`, value);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !getValues(`otp${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      pasteData.split("").forEach((num, i) => {
        setValue(`otp${i}`, num);
        inputRefs.current[i].value = num;
      });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
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
      <div className="hidden lg:flex items-center justify-center w-full basis-8/12">
        <img
          src="https://i.ibb.co.com/HLmGB8Fx/64e78d2cd51524aaf4f8ce12-64e78d0d294a3db1449d0c31-Do-I-need-identity-theft-protection-lead-image.webp"
          alt="illustration"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center w-full basis-6/12">
        <div className="w-full max-w-lg p-10 shadow-gray-300 shadow-md">
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="relative overflow-hidden w-[80px] mb-10 flex gap-2 items-center justify-center border border-tagline text-tagline font-medium py-1 px-3 rounded-full transition-colors duration-200 before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-700/10 hover:cursor-pointer before:transition-all before:duration-500 hover:before:w-full"
            >
              <span className="relative z-10 flex gap-1 items-center">
                <MdKeyboardBackspace size={18} />
                Back
              </span>
            </button>

            <div>
              <h1 className="text-3xl text-gray-900 font-semibold text-center mb-2">
                OTP Verification
              </h1>
              <p className="text-tagline text-sm w-full text-center">
                Enter the 6-digit code sent to your email. This code is valid
                for next 10 minutes
              </p>
            </div>
          </div>

          {/* OTP form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
            )}

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
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </span>
            </button>
          </form>
          <div>
            <h1 className="text-tagline pt-4 text-center font-medium">
              Don't get the code?{" "}
              <button
                onClick={() => resendOpt()}
                className="underline text-title cursor-pointer"
                disabled={otpSubmitting}
              >
                {otpSubmitting ? <>Resending...</> : "Resend Code"}
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
