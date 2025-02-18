// src/redux/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk to fetch users from a public API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json(); // Return the users data
});

// Create a slice to handle the users' state
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Set status to loading
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded
        state.users = action.payload; // Set the fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed
        state.error = action.error.message; // Store the error message
      });
  },
});

export default usersSlice.reducer;
