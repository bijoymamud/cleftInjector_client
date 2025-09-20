import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function ContactBookingInformation({
  formData,
  updateFormData,
}) {
  return (
    <CardContent className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold mb-2">
          Contact & Booking Information
        </CardTitle>
        <p className="text-gray-600 text-sm">
          How patients can reach and book with you
        </p>
      </CardHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData("phoneNumber", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              type="email"
              placeholder="Professional email"
              value={formData.emailAddress}
              onChange={(e) => updateFormData("emailAddress", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="Your website URL"
              value={formData.website}
              onChange={(e) => updateFormData("website", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              placeholder="WhatsApp contact"
              value={formData.whatsapp}
              onChange={(e) => updateFormData("whatsapp", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="languageSpoken">Language Spoken</Label>
            <Input
              id="languageSpoken"
              placeholder="Languages you speak"
              value={formData.languageSpoken}
              onChange={(e) => updateFormData("languageSpoken", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="consultationFee">Consultation Fee</Label>
            <Input
              id="consultationFee"
              placeholder="Your consultation fee"
              value={formData.consultationFee}
              onChange={(e) =>
                updateFormData("consultationFee", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </CardContent>
  );
}
