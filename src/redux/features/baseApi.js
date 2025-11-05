import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseUrlToBackend = "http://10.10.13.75:8000/"

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

    tagTypes: ["user", "appointment", "patientProfile"],

    endpoints: (builder) => ({


        //for logged in data showing
        getUserProfile: builder.query({
            query: () => "auth/user_profile/",
        }),


        //booking api
        bookAppointment: builder.mutation({
            query: ({ data, id }) => ({
                url: `patient/create/${id}/`,
                method: 'POST',
                body: data,
            }),

        }),

        //my booking list
        getMyBookingList: builder.query({
            query: () => "patient/my-bookings/"
        }),

        //review
        postReview: builder.mutation({
            query: ({ data, id }) => ({
                url: `injector/reviews/create/${id}/`,
                method: "POST",
                body: { data }
            })
        }),

        //change password
        changePassword: builder.mutation({
            query: (data) => ({
                url: "auth/change-password/",
                method: "POST",
                body: data
            })
        }),

        //profile update
        // profileUpdate: builder.mutation({
        //     query: (userData) => ({
        //         url: "patient/profile/update/",
        //         method: "PATCH",
        //         body: userData
        //     }),
        //     invalidatesTags: ["userProfile"]
        // })


        //patient profile
        getPatientData: builder.query({
            query: () => "/patient/profile/"
        }),

        //patient profile update
        profileUpdate: builder.mutation({
            query: (formData) => ({
                url: 'patient/profile/update/',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['patientProfile'],
        }),


    }),
})

export const {
    useGetUserProfileQuery,
    useBookAppointmentMutation,
    useGetMyBookingListQuery,
    usePostReviewMutation,
    useChangePasswordMutation,
    useProfileUpdateMutation,
    useGetPatientDataQuery
} = baseApi