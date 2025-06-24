import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "sonner";
import { getCookie, setCookie, removeCookie } from "../../utils/utils";


const initialState = {
  loading: false,
  bookmarks: [],
  // error : null ,
  //   bookmarkHistory: [],

}


export const addBookmark = createAsyncThunk(
  '/addBookmarks',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const removeBookmark = createAsyncThunk(
  '/removeBookmarks',
  async ({ id, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        {
          data: { articleId } // ✅ Send articleId in request body
        }
      );
      return { articleId }; // manually return for reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getBookmark = createAsyncThunk(
  '/getBookmarks',
  async (_, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addBookmark.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        console.log(action.payload);
        const deletedId = action.payload.articleId;
        state.bookmarks = state.bookmarks.filter(b => b._id !== deletedId);
        state.loading = false;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      }).addCase(getBookmark.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.bookmarks = action.payload.data
      })

  }

})

export default bookmarkSlice.reducer
