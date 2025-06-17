import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@mantine/core'
import { X, Menu, Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfileDropDown from './ProfileDropDown'
import LiveSearch from './LiveSearch'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  // console.log(import.meta.env.VITE_API_URL)

  const { authenticated } = useSelector((state) => state.auth)

  return (
    <nav id='nav' className='bg-opacity-80 bg-white h-14 border-b border-b-gray-200 backdrop-blur-md p-4 text-black sticky top-0 z-[9999]'>

      <div className='container mx-auto h-full flex items-center justify-between px-2 relative'>
        <motion.h1 initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} 
          className='text-2xl font-semibold'>
          <img id='logo' src="/logos.png" alt="" />
          </motion.h1>

        <div className="w-1/3">
          <LiveSearch />
        </div>

        <ul className='hidden md:flex gap-4'>
          {
            ['Home', 'Categories', 'About', 'News'].map((item) =>
            (
              <motion.li whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 100 }} className='text-gray-900 hover:text-gray-600' key={item}>
                <Link to={`/${item.toLowerCase()}`}>{item}</Link></motion.li>
            )
            )
          }

        </ul>

        <div className='flex space-x-4 item-center justify-center'>
          {authenticated && <div className='flex gap-6'>

            <button className="relative text-gray-600 hover:text-gray-800"   onClick={() => alert("🔕 You haven't new notifications.")}
>
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                0
              </span>
            </button>
          </div>}
          {!authenticated && <div className='flex gap-6'>

            <Link to='/login' className='hidden md:block'>
              <Button variant='white'>Login</Button>
            </Link>
            <Link to='/register' className='hidden md:block'>
              <Button variant='white'>Register</Button>
            </Link>
          </div>}
          {authenticated && <ProfileDropDown/>}
          <button onClick={handleClick} className='md:hidden'>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </div>








      {isOpen && (
        <motion.div className="md:hidden mt-4 p-4 bg-gray-200 absolute left-0 right-0 z-[9999] h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}>
          <ul className="space-y-4">
            {['Home', 'Categories', 'About', 'News'].map((item) => (
              <li key={item} className="hover:text-gray-500">
                <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>{item}</Link>
              </li>
            ))}
            {!authenticated && <div className="hover:border-blue-500">
              <li>
                <Link to="/login" className="block py-2" onClick={() => setIsOpen(false)}>
                  <Button variant='white'>Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/register" className="block py-2" onClick={() => setIsOpen(false)}>
                  <Button variant='white'>Register</Button>
                </Link>
              </li>
            </div>}
          </ul>
        </motion.div>
      )}

    </nav>

  )
}

export default Navbar
