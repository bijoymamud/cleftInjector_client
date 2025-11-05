import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsSection from "./BookingsSection";
import PasswordChangeDialog from "./PasswordChangeDialog";
import ProfileSection from "./ProfileSection";
import { useGetMyBookingListQuery } from "@/redux/features/baseApi";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    newEmail: "",
  });

  const { data: bookingsData } = useGetMyBookingListQuery();

  const handleProfileSave = () => {
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    setIsPasswordDialogOpen(false);
    setPasswordData({ newPassword: "", newEmail: "" });
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6  min-h-screen flex items-center justify-center h-screen">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-[500px] grid-cols-2 mb-8">
          <TabsTrigger value="profile" className="text-lg">
            My Profile
          </TabsTrigger>
          <TabsTrigger value="bookings" className="text-lg">
            My Bookings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection
            profileData={profileData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleInputChange={handleInputChange}
            handleProfileSave={handleProfileSave}
            setIsPasswordDialogOpen={setIsPasswordDialogOpen}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsSection bookingsData={bookingsData} />
        </TabsContent>
      </Tabs>

      <PasswordChangeDialog
        isPasswordDialogOpen={isPasswordDialogOpen}
        setIsPasswordDialogOpen={setIsPasswordDialogOpen}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        handlePasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default UserProfile;

