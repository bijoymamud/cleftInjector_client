import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import { authApi } from './features/authApi'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [authApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseApi.middleware)
            .concat(authApi.middleware)
})

