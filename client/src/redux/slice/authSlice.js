import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' ;
import axios from 'axios' ;
import { toast } from 'sonner';
import { getCookie, removeCookie, setCookie } from '../../utils/utils';
import { auth , googleAuthProvider } from '../../config/firebase.js';
import { signInWithPopup } from 'firebase/auth';



const initialState = {
    loading: false ,
    authenticated: getCookie('isAuthenticated') || false ,
    name: getCookie('name') || null ,
    id: getCookie('id') || null ,
    email: getCookie('email') || null,
    preferences: JSON.parse(localStorage.getItem('preferences')) || [] ,
}


export const signUp = createAsyncThunk('/register', async (data, {rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,
            data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
        //  // Log the error details for debugging
        //  console.error("Error in signUp:", error.response?.data || error.message);

        //  // Return error message from server response, or fallback to a general error
        //  return { error: error.response?.data?.message || error.message || "An unknown error occurred" };

    }
})







export const login = createAsyncThunk('/login', async (data, {rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
            data , {withCredentials : true});
            const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,
                {withCredentials : true});
        return {...res.data , ...verifyres.data}
    } catch (error) {
        return rejectWithValue(error)

    }
})



export const signInWithGoogle = createAsyncThunk('/google-login', async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      console.log(idToken);
  
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { idToken }
      );
  
      return res.data;
    } catch (err) {
        console.error('Google Sign-In Error.' , err)
        throw err;
    }
  });



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut : function(state){
            state.authenticated = false ,
            state.name = null ,
            state.id = null ,
            state.email = null ,
            removeCookie('isAuthenticated')
            removeCookie('name')
            removeCookie('id')
            removeCookie('email')

        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending , (state) => {
            state.loading = true
        }).addCase(signUp.fulfilled , (state , action) => {
            state.loading = false
            // console.log(action.payload.message);
            toast.success(action.payload.message);   
        }).addCase(signUp.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            toast.error(action.payload.response.data.message);
          })
          .addCase(login.pending , (state) => {
            state.loading = true
          }).addCase(login.fulfilled , (state , action) => {
            state.loading = false
            state.authenticated = action.payload.authenticated
            state.name = action.payload.name
            state.id = action.payload.id
            state.email = action.payload.email
            setCookie('isAuthenticated' , action.payload.authenticated)
            setCookie('name' , action.payload.name)
            setCookie('id' , action.payload.id)
            setCookie('email' , action.payload.email)
            state.preferences = action.payload.preferences
            localStorage.setItem('preferences' , JSON.stringify(action.payload.preferences))
            // console.log(action.payload);
            toast.success(action.payload.message)
          }).addCase(login.rejected , (state , action) => {
            state.loading = false
            // console.log(action.payload);
            toast.error(action.payload.response.data.message)

          })
          .addCase(signInWithGoogle.pending, (state, action) => {
            // state.loading = true;
          })
          .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.authenticated = action.payload.authenticated;
            state.name = action.payload.name;
            state.id = action.payload.id;
            setCookie('isAuthenticated', action.payload.authenticated);
            setCookie('email', action.payload.email);
            setCookie('name', action.payload.name);
            setCookie('id', action.payload.id);
            state.preferences = action.payload.preferences;
            localStorage.setItem(
              'preferences',
              JSON.stringify(action.payload.preferences)
            );
            console.log(action.payload);
            toast.success(action.payload.message);
          });
    }
})



export default authSlice.reducer
export const {signOut} = authSlice.actions 