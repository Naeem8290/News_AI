import React, { lazy, Suspense, useEffect } from 'react'
import '@mantine/core/styles.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'sonner';

import Navbar from './components/Navbar'
import Login from './pages/Login';
import Register from './pages/Register'
import Preferences from './pages/Preferences';
import ProtectedRoutes from './components/ProtectedRoutes';


const Homepage = lazy(() => import('./pages/Homepage'));
const Profile = lazy(() => import('./pages/Profile'));
const Category = lazy(() => import('./components/Category'))
const Footer = lazy(() => import('./components/Footer'))
const HeroSection = lazy(() => import('./components/HeroSection'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
// import OpenRoutes from './components/OpenRoutes';

import LoadingSpinner from './components/LoadingSpinner';
import PreferenceProtectRoute from './components/PreferenceProtectRoute';
import Channels from './components/Channels';
import ForgetPassword from './components/ForgetPassword';
import NewsPage from './pages/NewsPage';
import Adminpage from './pages/Adminpage';
import Contact from './components/Contact';
import NotFound from './pages/NotFound';
import ReadingHistory from './pages/ReadingHistory';
import NewsSummary from './pages/NewsSummary';
import ScrollToTop from './components/ScrollToTop';

const App = () => {

  // const {loading , products} = useSelector((state)=>state.product)
  // // console.log(loading,products)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, []);

  return (
    <div>
      <Navbar />
      <Toaster />
       <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/reading-history' element={<ReadingHistory />} />
            <Route path='/categories' element={<Category />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/admin' element={<Adminpage />} />
            <Route path='/channels' element={<Channels />} />
            <Route element={<PreferenceProtectRoute />}>
              <Route path='/preferences' element={<Preferences />} />
            </Route>
          </Route>

          <Route path='/' element={<HeroSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/summary' element={<NewsSummary />} />
          <Route path='/news' element={<NewsPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
