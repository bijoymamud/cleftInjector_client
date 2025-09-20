import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function ProfessionalBackground({ formData, updateFormData }) {
  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold mb-2">
          Professional Background
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Share your experience & qualifications
        </p>
      </CardHeader>

      <div className="space-y-6">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="Professional title/role"
            value={formData.jobTitle}
            onChange={(e) => updateFormData("jobTitle", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="qualifications">
            Qualifications & Certifications
          </Label>
          <Textarea
            id="qualifications"
            placeholder="List your qualifications, certifications, and relevant credentials"
            className="min-h-[100px]"
            value={formData.qualifications}
            onChange={(e) => updateFormData("qualifications", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            placeholder="Number of years in practice"
            value={formData.experience}
            onChange={(e) => updateFormData("experience", e.target.value)}
          />
        </div>
      </div>
    </CardContent>
  );
}
