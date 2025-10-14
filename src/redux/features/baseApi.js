import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8111/',
        prepareHeaders: (headers, { endpoint }) => {
            const authEndpoints = [
                "createUser",
                "loggedInUser",
                "forgetPassword",
                "otpVerification",
                "resetPassword",
            ];

            if (!authEndpoints.includes(endpoint)) {
                const token = localStorage.getItem("access_token");
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),

    tagTypes: ["user"],

    endpoints: (builder) => ({


        getUserProfile: builder.query({
            query: () => "auth/user_profile/"
        })
    }),
})

export const {
    useGetUserProfileQuery,
} = baseApi