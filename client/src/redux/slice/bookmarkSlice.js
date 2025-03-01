import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "sonner";
// import { getCookie , setCookie , removeCookie} from "../../utils/utils";


const initialState = {
    loading : false ,
    bookmarks : [] ,
    error : null 
}

export const addBookmark = createAsyncThunk('bookmark/add', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const getBookmark = createAsyncThunk('bookmark/get', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`);
        return res.data;  // Return fetched data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const removeBookmark = createAsyncThunk('bookmark/remove', async ({ id, articleId }, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks/${articleId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});





const bookmarkSlice = createSlice({
    name : "bookmark" ,
    initialState ,

    extraReducers : (builder) => {
        builder.addCase(addBookmark.pending , (state) =>{
            state.loading = true
        }).addCase(addBookmark.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        }).addCase(addBookmark.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        })
        .addCase(getBookmark.pending , (state) =>{
            state.loading = true
        }).addCase(getBookmark.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
            state.bookmarks = action.payload.bookmarks;
            console.log(action.payload.bookmarks);
            
        }).addCase(getBookmark.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action);
        })
        .addCase(removeBookmark.pending , (state) =>{
            state.loading = true
        }).addCase(removeBookmark.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        }).addCase(removeBookmark.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        })

    }

})

export default bookmarkSlice.reducer
