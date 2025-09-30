import { createBrowserRouter, RouterProvider } from "react-router";

import Main from "../Layout/Main";
import React, { Suspense } from "react";
import SignIn from "@/Pages/Authentication/SignIn";
import SignUp from "@/Pages/Authentication/SignUp";
import MailVerification from "@/Pages/Authentication/MailVerification";
import OTPVerification from "@/Pages/Authentication/OTPVerification";
import ResetPassowrd from "@/Pages/Authentication/ResetPassowrd";
import LoadingScreen from "@/LoadingPages/LoadingScreen";
import About_us from "@/Pages/AboutUs/About_us";
import BookConsultationPage from "@/Pages/BookingHandler/BookingHandler";
import GetListedController from "@/Pages/ListingHandler/GetListedController";
import PrivacyPolicy from "@/Pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "@/Pages/TermsConditions/TermsConditions";
import MedicalDesclaimer from "@/Pages/MedicalDisclaimer/MedicalDesclaimer";
import Dashboard from "@/Layout/DashboardLayout/Dashboard";
import Consultation from "@/Layout/DashboardLayout/Consultation";
import Review from "@/Layout/DashboardLayout/Review";
import Setting from "@/Layout/DashboardLayout/Setting";
import ConsultationDetails from "@/Layout/DashboardLayout/ConsultationDetails";
const Home = React.lazy(() => import("../Pages/Home/Home"));
const Directory = React.lazy(() => import("../Pages/Directory/Directory"));
const UserProfile = React.lazy(() => import("../Pages/Profile/UserProfile"));
const Profile = React.lazy(() => import("../Pages/Directory/Profile"));
const ProviderHome = React.lazy(() =>
  import("../Layout/DashboardLayout/ProviderHome")
);
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/directory",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Directory />
          </Suspense>
        ),
      },
      {
        path: "/doctor-profile/:id",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Profile />
          </Suspense>
        ),
      },

      {
        path: "/book-consultation/:id",
        element: <BookConsultationPage />,
      },
      {
        path: "/get-listed",
        element: <GetListedController />,
      },

      //userprofile
      {
        path: "/user_profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/about_us",
        element: <About_us />,
      },
      {
        path: "/privacy_policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms_conditions",
        element: <TermsConditions />,
      },
      {
        path: "/medical_disclaimer",
        element: <MedicalDesclaimer />,
      },
    ],
  },
  //authentication
  {
    path: "/sign_in",
    element: <SignIn />,
  },

  //dashboard
  {
    path: "provider",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ProviderHome />,
      },
      {
        path: "provider_home",
        element: <ProviderHome />,
      },
      {
        path: "consultation",
        element: <Consultation />,
      },
      {
        path: "consultation_details/:id",
        element: <ConsultationDetails />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },

  {
    path: "/sign_up",
    element: <SignUp />,
  },
  {
    path: "/email_verification",
    element: <MailVerification />,
  },
  {
    path: "/otp_verification",
    element: <OTPVerification />,
  },
  {
    path: "/reset_password",
    element: <ResetPassowrd />,
  },
]);
