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

    tagTypes: ["user", "appointment", "patientProfile", "review", "bookingList", "consultation", "injectorProfile"],

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
            query: (search) => `injector/list/?search=${encodeURIComponent(search)}`,
        }),



        // implementation baki ache 


        // provider section

        //provider dashboard data
        getDashboardData: builder.query({
            query: () => "/dashboard/"
        }),

        //consultation list
        getAllConsultation: builder.query({
            query: () => "dashboard/consultations/",
            providesTags: ["consultation"]
        }),

        //consultation details
        getConsultationDetails: builder.query({
            query: (id) => `dashboard/consultations/${id}`,

        }),

        //cancel consultation
        cancelConsultation: builder.mutation({
            query: ({ id, status }) => ({
                url: `dashboard/consultations/${id}/update-status/`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["consultation"]
        }),

        //accept consultation
        acceptConsultation: builder.mutation({
            query: ({ id, status }) => ({
                url: `dashboard/consultations/${id}/update-status/`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["consultation"]
        }),

        //reviews

        getReviews: builder.query({
            query: () => "dashboard/reviews"
        }),

        //settings section

        //get providers data

        getProviderProfile: builder.query({
            query: () => "injector/",
            providesTags: ["injectorProfile"]
        }),

        profileSettings: builder.mutation({
            query: (providerData) => ({
                url: "injector/settings/",
                method: "PATCH",
                body: providerData
            }),
            invalidatesTags: ["injectorProfile"]
        }),


        //chatbot
        sendMessage: builder.mutation({
            query: (body) => ({
                url: 'api/chat/',
                method: 'POST',
                body: body,
            }),
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

    //dashboard data
    useGetDashboardDataQuery,
    useGetAllConsultationQuery,
    useGetConsultationDetailsQuery,

    //cancel consultation
    useCancelConsultationMutation,
    //accept consultation
    useAcceptConsultationMutation,

    useGetReviewsQuery,

    //settings
    useGetProviderProfileQuery,
    useProfileSettingsMutation,


} = baseApi