// store/listingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Structure to hold data from all steps
    step1: {},
    step2: {},
    step3: {},
    step4: { certifications: [{ title: "", document: null }] },
    step5: {},
    // Separate state for files/complex objects
    fileStore: {
        profile_image: null,
        certifications: [], // Array of File objects for each certification
    },
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        // Action to save non-file data for a specific step
        saveStepData: (state, action) => {
            const { step, data } = action.payload;
            state[`step${step}`] = { ...data };
        },
        // Action to save files/complex data
        saveFileStore: (state, action) => {
            state.fileStore = { ...state.fileStore, ...action.payload };
        },
        // Action to reset the entire form
        clearAllData: (state) => {
            Object.assign(state, initialState);
        },
        // Optional: for Step 4's dynamic fields
        setCertifications: (state, action) => {
            state.step4.certifications = action.payload;
        }
    },
});

export const { saveStepData, saveFileStore, clearAllData, setCertifications } = listingSlice.actions;

export default listingSlice.reducer;