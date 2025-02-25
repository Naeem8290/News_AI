import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils";
import Preferences from "../../pages/Preferences";



const initialState = {
    loading : true

}

const id = getCookie('id')
export const setPreferences = createAsyncThunk('/preferences' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/preferences/${id}` , data)
        return res.json
        
    } catch (error) {
        return rejectWithValue()
        
    }

})



const newsSlice = createSlice({
    name : "news" ,
    initialState ,

    extraReducers : (builder) => {
        builder.addCase(setPreferences.pending , (state) =>{
            state.loading = true
        }).addCase(setPreferences.fulfilled , (state , action) => {
            state.loading = false
            // console.log(Preferences);
            toast.success(action.payload.message)

            
        }).addCase(setPreferences.rejected , (state , action) => {
            state.loading = false
            // console.log(Preferences);
            toast.success(action.payload.message)

        })

    }

})


export default newsSlice.reducer