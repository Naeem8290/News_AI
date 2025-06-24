import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  error: null,
  news: [],
  totalPages: 0,
  totalCount: 0,
  totalItem: 0,
  readingHistory: [],
  bookmarks: [],
  summaries: [],

  bookmarkHistory: [],
};


export const setPreferences = createAsyncThunk(
  'preferences/setPreferences',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/preferences/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const fetchAllNews = createAsyncThunk(
  '/fetchallnews',
  async ({ currentPage, search }, { rejectWithValue }) => {
    console.log(search);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/api/news?page=${currentPage}&keyword=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const getSummary = createAsyncThunk(
  'news/fetchSummaries',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/summary`);
      return res.data; // assuming it's an array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalPages = action.payload.totalPages;
        state.news = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalItem = action.payload.length;
        state.loading = false;
      })
      .addCase(getSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = newsSlice.actions;
export default newsSlice.reducer;