import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import { authApi } from './features/authApi'
import { noAuthApi } from './features/noAuthApi'
import listingSlice from './slices/listingSlice'


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [noAuthApi.reducerPath]: noAuthApi.reducer,
        listingSlice: listingSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseApi.middleware)
            .concat(authApi.middleware)
            .concat(noAuthApi.middleware)
})

