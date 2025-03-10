import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "sonner";
import { getCookie , setCookie , removeCookie} from "../../utils/utils";


const initialState = {
    loading: false,
    data: null,
    error: null,
    news: [],
    totalPages: 0,
    totalCount: 0,
    totalItem: 0,
    readingHistory : []
}


export const fetchAllNews = createAsyncThunk(
    '/fetchallnews',
    async ({ currentPage, search }, { rejectWithValue }) => {
      console.log(search);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/news?page=${currentPage}&keyword=${search}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );


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


export const clearReadingHistory = createAsyncThunk('/reading-history-clear' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history` , data)
        return res.data
        
    } catch (error) {
        return rejectWithValue()
    }

});





const readingHistorySlice = createSlice({
    name : "readingHistory" ,
    initialState ,

    extraReducers : (builder) => {
        builder
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
        .addCase(addReadingHistory.pending, (state) => {
            state.loading = true;
          })
          .addCase(addReadingHistory.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload?.data) {
              state.readingHistory.push(action.payload.data);
            }
          })
                 
          .addCase(addReadingHistory.rejected, (state, action) => {
            console.log(action.payload);
          })
          .addCase(getReadingHistory.pending, (state) => {
            state.loading = true;
          })
          .addCase(getReadingHistory.fulfilled, (state, action) => {
            console.log("Fetched History:", action.payload);
            state.readingHistory = action.payload?.data || [];
          })
          
          
          .addCase(getReadingHistory.rejected, (state, action) => {
            console.log(action.payload);
          })
        .addCase(clearReadingHistory.pending , (state) =>{
            state.loading = true
        }).addCase(clearReadingHistory.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        }).addCase(clearReadingHistory.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        })

    }

})

export default readingHistorySlice.reducer
