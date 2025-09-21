

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ProfessionalBackground = forwardRef((props, ref) => {
  const [data, setData] = useState({
    jobTitle: "",
    qualifications: "",
    experience: "",
  });
  const [errors, setErrors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("getListedFormData");
    if (savedData) {
      setData((prev) => ({ ...prev, ...JSON.parse(savedData).step2 }));
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("getListedFormData") || "{}"
    );
    localStorage.setItem(
      "getListedFormData",
      JSON.stringify({ ...savedData, step2: data })
    );
  }, [data]);

  const validate = () => {
    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!data.qualifications)
      newErrors.qualifications = "Qualifications are required";
    if (!data.experience) newErrors.experience = "Experience is required";
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
      <CardHeader className="px-0 pt-0 mb-4">
        <CardTitle className="text-2xl font-semibold text-[#3D3B3B]">
          Professional Background
          <p className="text-lg text-muted-foreground mt-2 font-normal">
            Share your experience & qualifications
          </p>
        </CardTitle>
      </CardHeader>

      <div className="space-y-6">
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-lg font-semibold">
            Job Title
          </Label>
          <Input
            className="py-5 !text-base placeholder:!text-base"
            id="jobTitle"
            type="text"
            placeholder="Your job title"
            value={data.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
          {errors.jobTitle && (
            <p className="text-sm text-red-500">{errors.jobTitle}</p>
          )}
        </div>

        {/* Qualifications */}
        <div className="space-y-2">
          <Label htmlFor="qualifications" className="text-lg font-semibold">
            Qualifications & Certifications
          </Label>
          <Textarea
            className="py-5 !text-base placeholder:!text-base"
            id="qualifications"
            placeholder="List your medical degrees, certifications and relevant training"
            value={data.qualifications}
            onChange={(e) => handleChange("qualifications", e.target.value)}
          />
          {errors.qualifications && (
            <p className="text-sm text-red-500">{errors.qualifications}</p>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-lg font-semibold">
            Years of Experience
          </Label>
          <Input
            className="py-5 !text-base placeholder:!text-base"
            id="experience"
            type="number"
            placeholder="Your experience"
            value={data.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
          />
          {errors.experience && (
            <p className="text-sm text-red-500">{errors.experience}</p>
          )}
        </div>
      </div>
    </CardContent>
  );
});

export default ProfessionalBackground;
