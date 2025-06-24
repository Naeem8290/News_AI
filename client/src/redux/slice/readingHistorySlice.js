import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "sonner";
import { getCookie, setCookie, removeCookie } from "../../utils/utils";


const initialState = {
  loading: false,
  readingHistory: [],
}


export const addReadingHistory = createAsyncThunk(
  '/reading-history',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getReadingHistory = createAsyncThunk(
  '/getreading-history',
  async (_, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const clearReadingHistory = createAsyncThunk('/reading-history-clear', async ({ id, articleId }, { rejectWithValue }) => {
  // const id = getCookie('id');

  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history/${articleId}`)
    return { articleId };
    // return res.data

  } catch (error) {
    return rejectWithValue()
  }

});



const readingHistorySlice = createSlice({
  name: "readingHistory",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReadingHistory.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.readingHistory = action.payload.data;
        state.loading = false;
      })
      .addCase(getReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(clearReadingHistory.pending, (state) => {
        state.loading = true
      }).addCase(clearReadingHistory.fulfilled, (state, action) => {
        state.loading = false
        state.readingHistory = state.readingHistory.filter(
          (article) => article._id !== action.payload.articleId
        );
        console.log(action.payload);
      }).addCase(clearReadingHistory.rejected, (state, action) => {
        state.loading = false
        console.log(action.payload);
      })

  }

})

export default readingHistorySlice.reducer
