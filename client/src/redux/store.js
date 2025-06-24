import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slice/usersSlice.js';
import loadingReducer from './slice/LoadingSlice.js';
import authReducer from './slice/authSlice.js';
import newsReducer from './slice/newsSlice.js';
import bookmarkReducer from './slice/bookmarkSlice.js';
import readingHistoryReducer from './slice/readingHistorySlice.js';

const store = configureStore({
  reducer: {
    users: usersReducer,
    laoding: loadingReducer,
    auth: authReducer,
    news: newsReducer,
    bookmark: bookmarkReducer,
    readingHistory: readingHistoryReducer,
  },

});

export default store
