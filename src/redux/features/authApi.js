import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8111/',
        // prepareHeaders: (headers, { endpoint }) => {
        //     const authEndpoints = [
        //         "createUser",
        //         "loggedInUser",
        //         "forgetPassword",
        //         "otpVerification",
        //         "resetPassword",
        //     ];

        //     if (!authEndpoints.includes(endpoint)) {
        //         const token = localStorage.getItem("access_token");
        //         if (token) {
        //             headers.set("Authorization", `Bearer ${token}`);
        //         }
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({

        //signup
        createUser: builder.mutation({
            query: (userData) => ({
                url: "auth/normal_signup/",
                method: "POST",
                body: userData,
            })
        }),

        //otp
        otpVerification: builder.mutation({
            query: (payload) => ({
                url: "auth/verify_otp/",
                method: "POST",
                body: payload,
            })
        }),

        //resend otp
        resendOTP: builder.mutation({
            query: (email) => ({
                url: "auth/resend_otp/",
                method: "POST",
                body: email
            })
        }),

        //login
        logIn: builder.mutation({
            query: (userData) => ({
                url: "auth/login/",
                method: "POST",
                body: userData,
            })
        }),

        //forget password
        //email verification
        emailVerification: builder.mutation({
            query: (email) => ({
                url: "auth/forgot-password/",
                method: "POST",
                body: email,
            })
        }),

        //reset password
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: "auth/reset-password/",
                method: "POST",
                body: payload,
            })
        }),



    }),
});

export const {
    useCreateUserMutation,
    useOtpVerificationMutation,
    useResendOTPMutation,
    useLogInMutation,
    useEmailVerificationMutation,
    useResetPasswordMutation,
} = authApi;
