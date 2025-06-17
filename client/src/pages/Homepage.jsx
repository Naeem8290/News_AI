import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import EditorialsSection from '../components/EditorialsSection'
import NewsletterSubscription from '../components/NewsletterSubscription'


const Homepage = () => {
  return (

    <div  id='homediv'>
        <HeroSection/>
        <Category/>
        <EditorialsSection/>
        <NewsletterSubscription/>
      
    </div>
  )
}

export default Homepage
