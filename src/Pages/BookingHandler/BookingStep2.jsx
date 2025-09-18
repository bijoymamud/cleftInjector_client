// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// const steps = [
//   { number: 1, label: "Date & Time", icon: "📅" },
//   { number: 2, label: "Your Details", icon: null },
//   { number: 3, label: "Confirmation", icon: null },
// ];

// export function BookingStep2({ onNext, onBack, initialData, isConfirmed }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       firstName: initialData?.firstName || "",
//       lastName: initialData?.lastName || "",
//       email: initialData?.email || "",
//       phone: initialData?.phone || "",
//       reason: initialData?.reason || "",
//     },
//   });

//   const onSubmit = (data) => {
//     onNext(data);
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader className="text-center">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
//             📅
//           </div>
//           <span className="text-orange-500 font-medium">
//             Book a Consultation
//           </span>
//         </div>
//         <CardTitle className="text-sm text-muted-foreground">
//           Schedule your appointment with our Sarah Johnson
//         </CardTitle>

//         <div className="flex items-center justify-center gap-8 mt-6">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex items-center gap-2">
//               <div
//                 className={`w-8 h-8 ${
//                   step.number === 1
//                     ? "bg-green-500 text-white"
//                     : step.number === 2
//                     ? "bg-orange-500 text-white"
//                     : step.number === 3 && isConfirmed
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 } rounded-full flex items-center justify-center text-sm font-medium`}
//               >
//                 {step.number === 1 || (step.number === 3 && isConfirmed)
//                   ? "✓"
//                   : step.icon && step.number === 2
//                   ? step.icon
//                   : step.number}
//               </div>
//               <span
//                 className={`text-sm ${
//                   step.number === 1
//                     ? "text-green-600"
//                     : step.number === 2
//                     ? "text-orange-600 font-medium"
//                     : step.number === 3 && isConfirmed
//                     ? "text-green-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {step.label}
//               </span>
//               {index < steps.length - 1 && (
//                 <div className="w-8 h-px bg-gray-300"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Your Information</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Please provide your details for the appointment
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="firstName">First Name</Label>
//               <Input
//                 id="firstName"
//                 placeholder="Your first name"
//                 {...register("firstName", {
//                   required: "First name is required",
//                 })}
//               />
//               {errors.firstName && (
//                 <p className="text-sm text-red-500">
//                   {errors.firstName.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input
//                 id="lastName"
//                 placeholder="Your last name"
//                 {...register("lastName", { required: "Last name is required" })}
//               />
//               {errors.lastName && (
//                 <p className="text-sm text-red-500">
//                   {errors.lastName.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="your.email@example.com"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               type="tel"
//               placeholder="+1 (555) 123-4567"
//               {...register("phone", { required: "Phone number is required" })}
//             />
//             {errors.phone && (
//               <p className="text-sm text-red-500">{errors.phone.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="reason">Reason For Visit</Label>
//             <Textarea
//               id="reason"
//               placeholder="Please describe the reason for your consultation..."
//               className="min-h-[100px]"
//               {...register("reason", {
//                 required: "Please provide a reason for your visit",
//               })}
//             />
//             {errors.reason && (
//               <p className="text-sm text-red-500">{errors.reason.message}</p>
//             )}
//           </div>

//           <div className="flex justify-between pt-4">
//             <Button type="button" variant="outline" onClick={onBack}>
//               ← Back
//             </Button>
//             <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
//               Next →
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { number: 1, label: "Date & Time", icon: "📅" },
  { number: 2, label: "Your Details", icon: null },
  { number: 3, label: "Confirmation", icon: null },
];

export function BookingStep2({ onNext, onBack, initialData, isConfirmed }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      reason: initialData?.reason || "",
    },
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            📅
          </div>
          <span className="text-orange-500 font-medium">
            Book a Consultation
          </span>
        </div>
        <CardTitle className="text-sm text-muted-foreground">
          Schedule your appointment with our Sarah Johnson
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Information</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide your details for the appointment
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason For Visit</Label>
            <Textarea
              id="reason"
              placeholder="Please describe the reason for your consultation..."
              className="min-h-[100px]"
              {...register("reason", {
                required: "Please provide a reason for your visit",
              })}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Next →
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
