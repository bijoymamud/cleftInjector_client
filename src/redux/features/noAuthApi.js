import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noAuthApi = createApi({
    reducerPath: 'noAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8000/',

    }),
    endpoints: (builder) => ({


        //getinjectors
        getFeaturedInjectors: builder.query({
            query: () => "injector/list/"
        }),

        //get review
        getReview: builder.query({
            query: () => "dashboard/reviews/list/",
            providesTags: ["review"]
        })




    }),
});

export const {
    useGetFeaturedInjectorsQuery,
    useGetReviewQuery,

} = noAuthApi;
