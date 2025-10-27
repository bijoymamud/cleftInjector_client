import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8000/',
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

    tagTypes: ["user", "appointment"],

    endpoints: (builder) => ({


        getUserProfile: builder.query({
            query: () => "auth/user_profile/"
        }),

        //booking api
        bookAppointment: builder.mutation({
            query: ({ data, id }) => ({
                url: `patient/create/${id}/`,
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ["appointment"]
        })


    }),
})

export const {
    useGetUserProfileQuery,
    useBookAppointmentMutation,
} = baseApi