// import { useForm } from "react-hook-form";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function ContactBookingInformation() {
//   const {
//     register,
//     formState: { errors },
//   } = useForm();

//   return (
//     <CardContent className="p-6">
//       <div>
//         <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
//           Contact & Booking Information{" "}
//         </h3>
//         <p className="text-lg text-muted-foreground mb-4">
//           Please provide your details for the appointment
//         </p>
//       </div>

//       <div className="space-y-6 py-4">
//         {/* Phone + Email */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="phoneNumber" className="text-lg font-semibold">
//               Phone Number
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="phoneNumber"
//               placeholder="Your phone number"
//               {...register("phoneNumber", {
//                 required: "Phone number is required",
//               })}
//             />
//             {errors.phoneNumber && (
//               <p className="text-sm text-red-500">
//                 {errors.phoneNumber.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="emailAddress" className="text-lg font-semibold">
//               Email Address
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="emailAddress"
//               type="email"
//               placeholder="Professional email"
//               {...register("emailAddress", {
//                 required: "Email is required",
//               })}
//             />
//             {errors.emailAddress && (
//               <p className="text-sm text-red-500">
//                 {errors.emailAddress.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Website + WhatsApp */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="website" className="text-lg font-semibold">
//               Website
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="website"
//               placeholder="Your website URL"
//               {...register("website")}
//             />
//             {errors.website && (
//               <p className="text-sm text-red-500">{errors.website.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="whatsapp" className="text-lg font-semibold">
//               WhatsApp Number
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="whatsapp"
//               placeholder="WhatsApp contact"
//               {...register("whatsapp")}
//             />
//             {errors.whatsapp && (
//               <p className="text-sm text-red-500">{errors.whatsapp.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Language + Fee */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="languageSpoken" className="text-lg font-semibold">
//               Language Spoken
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="languageSpoken"
//               placeholder="Languages you speak"
//               {...register("languageSpoken", {
//                 required: "Language is required",
//               })}
//             />
//             {errors.languageSpoken && (
//               <p className="text-sm text-red-500">
//                 {errors.languageSpoken.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="consultationFee" className="text-lg font-semibold">
//               Consultation Fee
//             </Label>
//             <Input
//               className="py-5 !text-base placeholder:!text-base"
//               id="consultationFee"
//               placeholder="Your consultation fee"
//               {...register("consultationFee", {
//                 required: "Consultation fee is required",
//               })}
//             />
//             {errors.consultationFee && (
//               <p className="text-sm text-red-500">
//                 {errors.consultationFee.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </CardContent>
//   );
// }

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactBookingInformation = forwardRef((props, ref) => {
  const [data, setData] = useState({
    phoneNumber: "",
    emailAddress: "",
    website: "",
    whatsapp: "",
    languageSpoken: "",
    consultationFee: "",
  });
  const [errors, setErrors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("getListedFormData");
    if (savedData) {
      setData((prev) => ({ ...prev, ...JSON.parse(savedData).step3 }));
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("getListedFormData") || "{}"
    );
    localStorage.setItem(
      "getListedFormData",
      JSON.stringify({ ...savedData, step3: data })
    );
  }, [data]);

  const validate = () => {
    const newErrors = {};
    if (!data.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!data.emailAddress) newErrors.emailAddress = "Email is required";
    if (!data.languageSpoken) newErrors.languageSpoken = "Language is required";
    if (!data.consultationFee)
      newErrors.consultationFee = "Consultation fee is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  useImperativeHandle(ref, () => ({
    validate,
    getAllData: () => {
      const savedData = JSON.parse(
        localStorage.getItem("getListedFormData") || "{}"
      );
      return {
        ...savedData.step1,
        ...savedData.step2,
        ...savedData.step3,
        ...savedData.step4,
      };
    },
  }));

  return (
    <CardContent className="p-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
          Contact & Booking Information
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          Please provide your details for the appointment
        </p>
      </div>

      <div className="space-y-6 py-4">
        {/* Phone + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-lg font-semibold">
              Phone Number
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="phoneNumber"
              placeholder="Your phone number"
              value={data.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-lg font-semibold">
              Email Address
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="emailAddress"
              type="email"
              placeholder="Professional email"
              value={data.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
            />
            {errors.emailAddress && (
              <p className="text-sm text-red-500">{errors.emailAddress}</p>
            )}
          </div>
        </div>

        {/* Website + WhatsApp */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="text-lg font-semibold">
              Website
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="website"
              placeholder="Your website URL"
              value={data.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-lg font-semibold">
              WhatsApp Number
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="whatsapp"
              placeholder="WhatsApp contact"
              value={data.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
            />
            {errors.whatsapp && (
              <p className="text-sm text-red-500">{errors.whatsapp}</p>
            )}
          </div>
        </div>

        {/* Language + Fee */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="languageSpoken" className="text-lg font-semibold">
              Language Spoken
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="languageSpoken"
              placeholder="Languages you speak"
              value={data.languageSpoken}
              onChange={(e) => handleChange("languageSpoken", e.target.value)}
            />
            {errors.languageSpoken && (
              <p className="text-sm text-red-500">{errors.languageSpoken}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultationFee" className="text-lg font-semibold">
              Consultation Fee
            </Label>
            <Input
              className="py-5 !text-base placeholder:!text-base"
              id="consultationFee"
              placeholder="Your consultation fee"
              value={data.consultationFee}
              onChange={(e) => handleChange("consultationFee", e.target.value)}
            />
            {errors.consultationFee && (
              <p className="text-sm text-red-500">{errors.consultationFee}</p>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
});

export default ContactBookingInformation;
