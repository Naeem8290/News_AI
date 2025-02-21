import React, { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import '@mantine/core/styles.css';
import { Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import Preferences from './pages/Preferences';
import Reduxt from './pages/Reduxt';
import Thunkapi from './pages/Thunkapi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from './redux/slice/productSlice';
import { Toaster } from 'sonner';
// import Homepage from './pages/Homepage';
import ProtectedRoutes from './components/ProtectedRoutes';

const Homepage = lazy(() => import('./pages/Homepage'));

import LoadingSpinner from './components/LoadingSpinner';

const App = () => {

  // const {loading , products} = useSelector((state)=>state.product)
  // // console.log(loading,products)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, []);

  return (
    <div>
      <Navbar/>
      <Toaster/>
      <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/preferences' element={<Preferences/>}/>
        </Route>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/terms' element={<Reduxt/>}/>
        <Route path='/privacy' element={<Thunkapi/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App






// import React from 'react'
// import { motion } from "motion/react"

// const App = () => {
//   return (
//     <div>
//       <motion.h2 animate={{ rotate: 360 }} className='text-3xl text-red-500'>Hello World</motion.h2>
//     </div>
//   )
// }

// export default App
