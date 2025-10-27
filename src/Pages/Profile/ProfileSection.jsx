import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUserEdit } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";

const ProfileSection = ({
  profileData,
  isEditing,
  setIsEditing,
  handleInputChange,
  handleProfileSave,
  setIsPasswordDialogOpen,
}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className="">
      <Toaster />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 font-semibold  text-[#3D3B3B]">
              <IoCameraOutline size={24} />
              Profile Picture
            </CardTitle>
            <p className="text-lg text-muted-foreground mb-4">
              Update your profile picture that patients will see
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Button
                  variant="outline"
                  className="text-orange-500 hover:cursor-pointer border-orange-500 hover:bg-orange-50"
                >
                  <IoCameraOutline size={24} />
                  Change Profile Picture
                </Button>
                <p className="text-base text-gray-500 py-2">
                  Recommended Square image at least 400x400px
                </p>
                <button
                  onClick={() => setIsPasswordDialogOpen(true)}
                  className="text-tagline font-semibold text-base hover:underline"
                >
                  Want to change your password?
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
                <FiUsers size={24} />
                Personal Information
              </CardTitle>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-orange-500 hover:text-orange-600"
              >
                <FaUserEdit size={24} />
                Edit Details
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="mt-1 font-semibold"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {profileData.fullName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {profileData.email}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {profileData.phoneNumber}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleProfileSave}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLogOut}
            variant="outline"
            className="text-red-500 w-[150px] font-bold text-lg border-red-500 hover:text-red-500 cursor-pointer"
          >
            Log Out
            <RiLogoutCircleRLine size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
