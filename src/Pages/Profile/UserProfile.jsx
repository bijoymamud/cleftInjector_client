import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsSection from "./BookingsSection";
import PasswordChangeDialog from "./PasswordChangeDialog";
import ProfileSection from "./ProfileSection";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Sarah Johnson",
    email: "sarahjohnson@gmail.com",
    phoneNumber: "01980012351",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    newEmail: "",
  });

  const bookings = [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah",
        expertis: "Reconstructive Surgery",
        verified: true,
        image:
          "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_incoming&w=740&q=80",
      },
      date: "10:00 AM, 21 Sep 2025",
      description:
        "Recusam Lorem ipsum dolor sit amet consectetur. Nibh quis enim lorem neque fames convallis vehicula",
      appointment: {
        doctor: "Dr. Sarah Johnson",
        patient: "Robina Rahman",
        dateTime: "Tuesday, September 3, 2025\n12:30 AM",
        consultationFee: "$200",
        reasonForVisit:
          "Lorem ipsum dolor sit amet consectetur. Nibh quis enim lorem neque fames convallis vehicula",
      },
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Chen",
        expertis: "Leap Surgery",
        verified: true,
        image:
          "https://t3.ftcdn.net/jpg/03/00/22/02/360_F_300220248_VKEd3QKx31kzqHcwZfnGmWKZLYTjf8R0.jpg",
      },
      date: "2:00 PM, 15 Sep 2025",
      description:
        "Follow-up consultation for ongoing treatment and medication review",
      appointment: {
        doctor: "Dr. Michael Chen",
        patient: "Sarah Johnson",
        dateTime: "Monday, September 15, 2025\n2:00 PM",
        consultationFee: "$150",
        reasonForVisit:
          "Follow-up consultation for ongoing treatment and medication review",
      },
    },
    {
      id: 3,
      doctor: {
        name: "Dr. Emily Rodriguez",
        expertis: "Face Surgery",
        verified: true,
        image:
          "https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.jpg?s=612x612&w=0&k=20&c=n9yulMNKdIYIQC-Qns8agFj6GBDbiKyPRruaUTh4MKs=",
      },
      date: "11:30 AM, 28 Sep 2025",
      description: "Annual health checkup and preventive care consultation",
      appointment: {
        doctor: "Dr. Emily Rodriguez",
        patient: "Sarah Johnson",
        dateTime: "Sunday, September 28, 2025\n11:30 AM",
        consultationFee: "$180",
        reasonForVisit:
          "Annual health checkup and preventive care consultation",
      },
    },
  ];

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
          <BookingsSection bookings={bookings} />
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
