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

    tagTypes: ["user", "appointment", "patientProfile", "review", "bookingList"],

    endpoints: (builder) => ({


        //for logged in data showing
        getUserProfile: builder.query({
            query: () => "auth/user_profile/",
            providesTags: ["patientProfile"]
        }),


        //booking api
        bookAppointment: builder.mutation({
            query: ({ data, id }) => ({
                url: `patient/create/${id}/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["bookingList"]

        }),

        //my booking list
        getMyBookingList: builder.query({
            query: () => "patient/my-bookings/",
            providesTags: ["bookingList"]
        }),

        //review
        postReview: builder.mutation({
            query: ({ payload, id }) => ({
                url: `injector/reviews/create/${id}/`,
                method: "POST",
                body: payload
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

        //injector search
        searchInjector: builder.query({
            query: ({ search = '' }) => ({
                url: 'injector/list/',
                params: { search: search?.trim() },
            }),
        }),

        //injector search from home page
        searchInjectorsFromHome: builder.query({
            query: (search) => `/injector/list/?search=${encodeURIComponent(search)}`,
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
    useGetPatientDataQuery,
    useSearchInjectorQuery,
    useSearchInjectorsFromHomeQuery,

} = baseApi