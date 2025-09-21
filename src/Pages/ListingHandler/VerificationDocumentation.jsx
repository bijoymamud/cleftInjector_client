

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

const VerificationDocumentation = forwardRef((props, ref) => {
  const [data, setData] = useState({
    certificates: null,
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false,
  });
  const [errors, setErrors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("getListedFormData");
    if (savedData) {
      setData((prev) => ({ ...prev, ...JSON.parse(savedData).step4 }));
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("getListedFormData") || "{}"
    );
    localStorage.setItem(
      "getListedFormData",
      JSON.stringify({ ...savedData, step4: data })
    );
  }, [data]);

  const validate = () => {
    const newErrors = {};
    if (!data.certificates)
      newErrors.certificates = "Certificates are required";
    if (!data.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";
    if (!data.agreeToPrivacy)
      newErrors.agreeToPrivacy = "You must agree to the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange("certificates", file);
    }
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
          Verification & Documentations
        </h3>
      </div>

      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <h1 className="text-lg text-muted-foreground mb-4">
            Upload your certificate and training program
          </h1>
          <div className="border-2 border-dashed my-5 border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">
              Upload your certificate and training program
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              className="hidden"
              id="certificateUpload"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("certificateUpload").click()
              }
              className="text-orange-500 border-orange-500 hover:bg-orange-50"
            >
              Choose file
            </Button>
            <p className="text-xs text-gray-500 mt-2">PDF or JPG files only</p>
          </div>
          {errors.certificates && (
            <p className="text-sm text-red-500">{errors.certificates}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={data.agreeToTerms}
              onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="agreeToTerms" className="text-base text-gray-700">
              I consent to Beautifying Me featuring my injection for full
              uplisted on my Safe Injekt platform to help patients find
              qualified injectors.
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToPrivacy"
              checked={data.agreeToPrivacy}
              onChange={(e) => handleChange("agreeToPrivacy", e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="agreeToPrivacy" className="text-base text-gray-700">
              I agree to the{" "}
              <span className="text-orange-500 underline">Privacy Policy</span>{" "}
              and{" "}
              <span className="text-orange-500 underline">Terms of Use</span>.
            </label>
          </div>
          {errors.agreeToPrivacy && (
            <p className="text-sm text-red-500">{errors.agreeToPrivacy}</p>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToMarketing"
              checked={data.agreeToMarketing}
              onChange={(e) =>
                handleChange("agreeToMarketing", e.target.checked)
              }
              className="mt-1"
            />
            <label
              htmlFor="agreeToMarketing"
              className="text-base text-gray-700"
            >
              I would like to receive updates about Safe Injekt events,
              promotions and opportunities to connect with patients. Optimized.
            </label>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-800">
            <strong>
              Your application will be reviewed by our team to verify your
              training certifications.
            </strong>{" "}
            We'll contact you with 2-5 business days with the status of your
            application.
          </p>
        </div>
      </div>
    </CardContent>
  );
});

export default VerificationDocumentation;
