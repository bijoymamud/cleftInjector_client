import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PasswordChangeDialog = ({
  isPasswordDialogOpen,
  setIsPasswordDialogOpen,
  passwordData,
  setPasswordData,
  handlePasswordChange,
}) => {
  return (
    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label
              htmlFor="newPassword"
              className="text-lg font-semibold text-[#3D3B3B] mb-1"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Type your new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="py-5 !text-base placeholder:!text-base "
            />
          </div>

          <div>
            <Label
              htmlFor="newEmail"
              className="text-lg font-semibold text-[#3D3B3B] mb-1"
            >
              Confirm Password
            </Label>
            <Input
              id="newEmail"
              type="email"
              placeholder="Re-type your password"
              value={passwordData.newEmail}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newEmail: e.target.value,
                }))
              }
              className="py-5 !text-base placeholder:!text-base "
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            className="w-full bg-[#FF792C] py-5 text-base hover:cursor-pointer hover:bg-orange-500 mt-2"
          >
            Save Change
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeDialog;
