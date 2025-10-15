import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noAuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.75:8111/',

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
