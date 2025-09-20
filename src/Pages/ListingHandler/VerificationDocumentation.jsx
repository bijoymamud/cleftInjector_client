import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";

export default function VerificationDocumentation({
  formData,
  updateFormData,
}) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    updateFormData("certificates", file);
  };

  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold mb-2">
          Verification & Documentation
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Upload your certification and review our terms
        </p>
      </CardHeader>

      <div className="space-y-6">
        <div>
          <Label>Upload your certificate and training program</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">
              Upload your certificate and training program
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="certificateUpload"
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
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I consent to Beautifying Me featuring my injection for full
              uplisted on my Safe Injekt platform to help patients find
              qualified injectors.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onChange={(e) =>
                updateFormData("agreeToPrivacy", e.target.checked)
              }
              className="mt-1"
            />
            <label htmlFor="agreeToPrivacy" className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-orange-500 underline">Privacy Policy</span>{" "}
              and{" "}
              <span className="text-orange-500 underline">Terms of Use</span>.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToMarketing"
              checked={formData.agreeToMarketing}
              onChange={(e) =>
                updateFormData("agreeToMarketing", e.target.checked)
              }
              className="mt-1"
            />
            <label htmlFor="agreeToMarketing" className="text-sm text-gray-700">
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
}
