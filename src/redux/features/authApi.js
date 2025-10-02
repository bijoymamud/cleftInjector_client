import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
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
    endpoints: (builder) => ({

        //signup
        createUser: builder.mutation({
            query: (userData) => ({
                url: "auth/normal_signup/",
                method: "POST",
                body: userData,
            })
        })

    }),
});

export const {
    useCreateUserMutation

} = authApi;
