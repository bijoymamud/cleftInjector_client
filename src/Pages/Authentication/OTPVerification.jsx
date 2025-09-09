import { useForm } from "react-hook-form";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { useRef } from "react";

export default function OTPVerification() {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const onSubmit = (data) => {
    const otp = Object.values(data).join("");
    console.log("OTP submitted:", otp);

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    toast.success("OTP verified successfully!");
    setTimeout(() => {
      navigate("/reset_password");
    }, 1000);
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
      <Toaster position="top-right" />
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
              <h1 className="text-3xl font-semibold text-title mb-2 capitalize">
                OTP Verification
              </h1>
              <p className="text-tagline text-sm">
                Enter the 6-digit code sent to your email. <br /> This code is
                valid for next 10 minutes
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
              className="relative overflow-hidden w-full bg-title text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 
              before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-200/10 hover:cursor-pointer before:transition-all before:duration-500 hover:before:w-full"
            >
              <span className="relative z-10">Verify</span>
            </button>
          </form>
          <div>
            <h1 className="text-tagline pt-4 text-center font-medium">
              Don't get the code?{" "}
              <span className="underline text-title cursor-pointer">
                Resend Code
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
