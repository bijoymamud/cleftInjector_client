import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noAuthApi = createApi({
    reducerPath: 'noAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8000/',

    }),
    endpoints: (builder) => ({

        //get list of injectors

        //getinjectors
        getFeaturedInjectors: builder.query({
            query: () => "injector/list/"
        })



    }),
});

export const {
    useGetFeaturedInjectorsQuery
} = noAuthApi;
