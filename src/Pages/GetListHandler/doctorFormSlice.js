import { createSlice } from '@reduxjs/toolkit';

// --- INITIAL STATE ---
// We will store all text/structured data in one place and the actual
// File objects separately, as File objects are not serializable and
// should not be stored directly in the Redux store (though RTK can
// handle it if you ignore the warning, it's safer to manage them
// outside the core state if possible, but for simplicity here we
// will keep them in the slice and rely on the RTK's non-serializable
// value check to be ignored for File objects).

const initialState = {
  // --- Step Data (Serializable) ---
  step1: {
    designation: '',
    clinic_name: '',
    country: '',
    city: '',
    about: '',
  },
  step2: {
    specialties: '',
    qualifications_certifications: '',
    awards_recognitions: '',
    years_of_experience: '',
  },
  step3: {
    contactPhone: '',
    contactEmail: '',
    website: '',
    whatsapp_number: '',
    languages_spoken: '',
    consultation_fee: '',
  },
  step4: {
    certifications: [], // Array of { title: string, document: File }
    confirm1: false,
    confirm2: false,
    confirm3: false,
  },

  // --- File Objects (Non-Serializable) ---
  // We'll store the actual File object for the single image here
  profileImageFile: null,
};

// --- SLICE DEFINITION ---
const multiStepFormSlice = createSlice({
  name: 'multiStepForm',
  initialState,
  reducers: {
    // Reducer to update Step 1 text fields
    updateStep1: (state, action) => {
      state.step1 = { ...state.step1, ...action.payload };
    },
    // Reducer to store the actual File object for the profile image
    setProfileImageFile: (state, action) => {
      // action.payload is expected to be a JavaScript 'File' object
      state.profileImageFile = action.payload;
    },

    // Reducer to update Step 2 fields
    updateStep2: (state, action) => {
      state.step2 = { ...state.step2, ...action.payload };
    },

    // Reducer to update Step 3 fields
    updateStep3: (state, action) => {
      state.step3 = { ...state.step3, ...action.payload };
    },

    // Reducer to add, remove, or update certification entries
    updateCertifications: (state, action) => {
        // action.payload is expected to be an array of { title, document: File }
        state.step4.certifications = action.payload;
    },
    
    // Reducer for Step 4 confirmation checkboxes
    updateStep4Confirm: (state, action) => {
      state.step4 = { ...state.step4, ...action.payload };
    },

    // Optional: Reset the entire form state
    resetForm: () => initialState,
  },
});

export const {
  updateStep1,
  setProfileImageFile,
  updateStep2,
  updateStep3,
  updateCertifications,
  updateStep4Confirm,
  resetForm,
} = multiStepFormSlice.actions;

export default multiStepFormSlice.reducer;