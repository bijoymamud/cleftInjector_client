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
const Home = React.lazy(() => import("../Pages/Home/Home"));

const Directory = React.lazy(() => import("../Pages/Directory/Directory"));
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
        path: "/about_us",
        element: <About_us />,
      },
    ],
  },
  //authentication
  {
    path: "/sign_in",
    element: <SignIn />,
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
