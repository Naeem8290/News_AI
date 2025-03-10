import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base API URL
const API_URL = "http://localhost:3000/api/users";

// 1. Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
});

// 2. Create a new user
export const createUser = createAsyncThunk("users/createUser", async (userData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
});

// 3. Update a user
export const updateUser = createAsyncThunk("users/updateUser", async ({ _, userData }) => {
      const id = getCookie('id');
  
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
});

// 4. Delete a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (_) => {
      const id = getCookie('id');
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return id; // Return only the ID for filtering in the state
});




const initialState= {
  loading: false,
  data: [],
  status: "idle",
  error: null,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex(user => user.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload);
      });
  }
});

export default userSlice.reducer;
