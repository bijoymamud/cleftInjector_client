import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUserEdit } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast, Toaster } from "sonner";

import {
  useGetPatientDataQuery,
  useProfileUpdateMutation,
} from "@/redux/features/baseApi";
import { useNavigate } from "react-router";

const ProfileSection = ({ setIsPasswordDialogOpen }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // RTK-Query
  const {
    data: userInfo,
    isLoading: loadingProfile,
    refetch,
  } = useGetPatientDataQuery();
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();

  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ full_name: "", phone: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Sync server data
  useEffect(() => {
    if (userInfo) {
      setEditValues({
        full_name: userInfo.full_name || "",
        phone: userInfo.phone || "",
      });
      setImagePreview(userInfo.profile_image || "");
    }
  }, [userInfo]);

  // Input change
  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  // Image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Build FormData for updates
  const buildFormData = (includeImage = true) => {
    const fd = new FormData();
    fd.append("full_name", editValues.full_name);
    fd.append("phone", editValues.phone);
    if (includeImage && selectedImage) {
      fd.append("profile_image", selectedImage);
    }
    return fd;
  };

  // Save image only
  const handleSaveImageOnly = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profile_image", selectedImage);

    try {
      await profileUpdate(formData).unwrap();
      toast.success("Profile picture updated!");
      setSelectedImage(null);
      refetch(); // Force refetch to ensure UI updates
    } catch (err) {
      toast.error(err?.data?.detail || "Failed to upload image");
    }
  };

  const handleProfileSave = async () => {
    const formData = buildFormData(true);

    try {
      const response = await profileUpdate(formData).unwrap();
      toast.success(response?.detail || "Profile updated successfully!");
      setIsEditing(false);
      setSelectedImage(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.detail || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValues({
      full_name: userInfo?.full_name || "",
      phone: userInfo?.phone || "",
    });
    setSelectedImage(null);
    setImagePreview(userInfo?.profile_image || "");
  };

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out");
    setTimeout(() => navigate("/sign_in"), 1000);
  };

  if (loadingProfile) {
    return <p className="text-center py-8">Loading profile...</p>;
  }

  return (
    <div>
      <Toaster />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
              <IoCameraOutline size={24} />
              Profile Picture
            </CardTitle>
            <p className="text-lg text-muted-foreground mb-4">
              Update your profile picture that patients will see
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={
                    imagePreview ||
                    "https://via.placeholder.com/80?text=No+Image"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-orange-500 border-orange-500 hover:bg-orange-50"
                  disabled={isUpdating}
                >
                  <IoCameraOutline size={24} className="mr-2" />
                  {selectedImage ? "Change Photo" : "Upload Photo"}
                </Button>

                {selectedImage && (
                  <Button
                    onClick={handleSaveImageOnly}
                    disabled={isUpdating}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    {isUpdating ? "Uploading..." : "Save Image"}
                  </Button>
                )}

                <p className="text-sm text-gray-500">
                  Square image, min 400×400 px
                </p>

                {selectedImage && (
                  <p className="text-xs text-green-600 truncate max-w-[200px]">
                    {selectedImage.name}
                  </p>
                )}

                <button
                  onClick={() => setIsPasswordDialogOpen(true)}
                  className="text-tagline font-semibold text-base hover:underline mt-2"
                >
                  Want to change your password?
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-[#3D3B3B]">
              <FiUsers size={24} />
              Personal Information
            </CardTitle>

            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-orange-500 hover:text-orange-600"
              >
                <FaUserEdit size={24} className="mr-1" />
                Edit Details
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Full Name */}
            <div>
              <Label
                htmlFor="full_name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  value={editValues.full_name}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                  className="mt-1 font-semibold"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {userInfo?.full_name}
                </p>
              )}
            </div>

            {/* Email */}
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
                  value={userInfo?.email || ""}
                  readOnly
                  className="mt-1 cursor-not-allowed bg-gray-100"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {userInfo?.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 font-semibold text-gray-900">
                  {userInfo?.phone}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleProfileSave}
                  disabled={isUpdating}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logout */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLogOut}
            variant="outline"
            className="text-red-500 w-[150px] font-bold text-lg border-red-500 hover:text-red-500"
          >
            Log Out
            <RiLogoutCircleRLine size={24} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
