// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const lightSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light', // Default theme is light
  },
  reducers: {
    lightTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'; // Toggle between 'light' and 'dark'
    },
  },
});

export const { lightTheme } = lightSlice.actions;
export default lightSlice.reducer;
