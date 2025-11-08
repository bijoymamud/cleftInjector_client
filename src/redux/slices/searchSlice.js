import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = '';
        },
    },
});

// Export actions
export const { setSearchQuery, clearSearch } = searchSlice.actions;

// Export reducer (required!)
export default searchSlice.reducer;