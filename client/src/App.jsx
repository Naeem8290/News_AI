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
const Profile = lazy(() => import('./pages/Profile'));
const Category = lazy(() => import('./components/Category'))
const Footer = lazy(() => import('./components/Footer'))
const HeroSection = lazy(() => import('./components/HeroSection'))
const Trending = lazy(() => import('./components/Trending'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))




import LoadingSpinner from './components/LoadingSpinner';
import PreferenceProtectRoute from './components/PreferenceProtectRoute';
import Channels from './components/Channels';
import ForgetPassword from './components/ForgetPassword';
// import AboutUs from './components/AboutUs';
// import Profile from './pages/Profile';

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
        <Route path='/profile' element={<Profile/>}/>
        <Route element={<PreferenceProtectRoute/>}>
        <Route path='/preferences' element={<Preferences/>}/>
        </Route>
        </Route>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/home' element={<HeroSection/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/channels' element={<Channels/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>}/>





        <Route path='/terms' element={<Reduxt/>}/>
        <Route path='/privacy' element={<Thunkapi/>}/>
      </Routes>
      </Suspense>
      <Footer/>
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
