import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import { authApi } from './features/authApi'
import { noAuthApi } from './features/noAuthApi'
import listingSlice from './slices/listingSlice'
import searchSlice from './slices/searchSlice'


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [noAuthApi.reducerPath]: noAuthApi.reducer,
        searchSlice: searchSlice,
        listingSlice: listingSlice,

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseApi.middleware)
            .concat(authApi.middleware)
            .concat(noAuthApi.middleware)
})

