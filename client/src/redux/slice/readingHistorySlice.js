import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "sonner";
// import { getCookie , setCookie , removeCookie} from "../../utils/utils";


const initialState = {
    loading : false ,
}

export const addReadingHistory = createAsyncThunk('/reading-history-add' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history` , data)
        return res.json
        
    } catch (error) {
        return rejectWithValue()  
    }

});


export const getReadingHistory = createAsyncThunk('/reading-history-get' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history` , data)
        return res.json
        
    } catch (error) {
        return rejectWithValue()   
    }

});


export const clearReadingHistory = createAsyncThunk('/reading-history-clear' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history` , data)
        return res.json
        
    } catch (error) {
        return rejectWithValue()
    }

});





const readingHistorySlice = createSlice({
    name : "bookmark" ,
    initialState ,

    extraReducers : (builder) => {
        builder.addCase(addReadingHistory.pending , (state) =>{
            state.loading = true
        }).addCase(addReadingHistory.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        }).addCase(addReadingHistory.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        })
        .addCase(getReadingHistory.pending , (state) =>{
            state.loading = true
        }).addCase(getReadingHistory.fulfilled , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
        }).addCase(getReadingHistory.rejected , (state , action) => {
            state.loading = false
            // toast.success(action.payload.message)
            console.log(action.payload.message);
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
