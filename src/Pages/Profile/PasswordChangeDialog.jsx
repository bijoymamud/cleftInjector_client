// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// const PasswordChangeDialog = ({
//   isPasswordDialogOpen,
//   setIsPasswordDialogOpen,
//   passwordData,
//   setPasswordData,
//   handlePasswordChange,
// }) => {
//   return (
//     <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
//       <DialogContent className="">
//         <DialogHeader>
//           <DialogTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
//             Change Password
//           </DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 pt-4">
//           <div>
//             <Label
//               htmlFor="newPassword"
//               className="text-lg font-semibold text-[#3D3B3B] mb-1"
//             >
//               Current Password
//             </Label>
//             <Input
//               id="current_password"
//               type="password"
//               placeholder="Type your new password"
//               value={passwordData.current_password}
//               onChange={(e) =>
//                 setPasswordData((prev) => ({
//                   ...prev,
//                   current_password: e.target.value,
//                 }))
//               }
//               className="py-5 !text-base placeholder:!text-base "
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="new_password"
//               className="text-lg font-semibold text-[#3D3B3B] mb-1"
//             >
//               New Password
//             </Label>
//             <Input
//               id="new_password"
//               type="password"
//               placeholder="Enter new password"
//               value={passwordData.new_password}
//               onChange={(e) =>
//                 setPasswordData((prev) => ({
//                   ...prev,
//                   new_password: e.target.value,
//                 }))
//               }
//               className="py-5 !text-base placeholder:!text-base "
//             />
//           </div>

//           <Button
//             onClick={handlePasswordChange}
//             className="w-full bg-[#FF792C] py-5 text-base hover:cursor-pointer hover:bg-orange-500 mt-2"
//           >
//             Save Change
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PasswordChangeDialog;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChangePasswordMutation } from "@/redux/features/baseApi";
import { toast, Toaster } from "sonner";

const passwordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(6, "New password must be at least 6 characters"),
});

const PasswordChangeDialog = ({
  isPasswordDialogOpen,
  setIsPasswordDialogOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
    },
  });

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await changePassword(data).unwrap();
      console.log(response, "change pass data");

      toast.success(response?.detail || "Password changed successfully");
      setIsPasswordDialogOpen(false);
      reset();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error?.data?.detail || "Failed to change password. Please try again."
      );
    }
  };

  return (
    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
      <Toaster />
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Current Password */}
          <div>
            <Label
              htmlFor="current_password"
              className="text-lg font-semibold text-[#3D3B3B] mb-1"
            >
              Current Password
            </Label>
            <Input
              id="current_password"
              type="password"
              placeholder="Type your current password"
              {...register("current_password")}
              className="py-5 !text-base placeholder:!text-base"
            />
            {errors.current_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <Label
              htmlFor="new_password"
              className="text-lg font-semibold text-[#3D3B3B] mb-1"
            >
              New Password
            </Label>
            <Input
              id="new_password"
              type="password"
              placeholder="Enter new password"
              {...register("new_password")}
              className="py-5 !text-base placeholder:!text-base"
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF792C] py-5 text-base hover:cursor-pointer hover:bg-orange-500 mt-2"
          >
            {isSubmitting ? "Saving..." : "Save Change"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeDialog;
