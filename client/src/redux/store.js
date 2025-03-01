// import { configureStore } from "@reduxjs/toolkit";
// import countReducer from './slice/counterSlice.js'

// const store = configureStore({
//     reducer : {
//         count : countReducer,
//     }
// })

// export default store

//--------------------------------------------


// import { configureStore } from '@reduxjs/toolkit';
// import themeReducer from './slice/lightSlice';

// const store = configureStore({
//   reducer: {
//     theme: themeReducer, // Add the theme reducer to the store
//   },
// });

// export default store;



//=---------------------------------------------------------

// src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './slice/usersSlice.js';

// const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });

// export default store;




//---------------------------------------------------------------

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slice/usersSlice.js';
import themeReducer from './slice/lightSlice.js';
import countReducer from './slice/counterSlice.js';
import loadingReducer from './slice/LoadingSlice.js';
import productReducer from './slice/productSlice.js';
import authReducer from './slice/authSlice.js';
import newsReducer from './slice/newsSlice.js';
import bookmarkReducer from './slice/bookmarkSlice.js';
import readingHistoryReducer from './slice/readingHistorySlice.js';

const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,
    count: countReducer,
    laoding: loadingReducer,
    product: productReducer,
    auth: authReducer,
    news: newsReducer,
    bookmark: bookmarkReducer,
    readingHistory: readingHistoryReducer,
  },

});

export default store

