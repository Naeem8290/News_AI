import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {Button} from '@mantine/core'
import {X , Menu , Bell} from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfileDropDown from './ProfileDropDown'

const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    // console.log(import.meta.env.VITE_API_URL)

    const {authenticated} = useSelector((state)=>state.auth)

    return (
        <nav className='h-16 p-2'>

            <div className=' flex item-center justify-between mx-6'>
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className='text-2xl font-semibold'>NEWSAI</motion.h1>

                <ul className='hidden md:flex gap-4'>
                    {
                        ['Home', 'Categories', 'Channels', 'About'].map((item) =>
                        (
                            <motion.li whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 100 }} className='hover:text-gray-600' key={item}>
                                <Link to={`/${item.toLowerCase()}`}>{item}</Link></motion.li>
                        )
                        )
                    }

                </ul>

                <div className='flex space-x-4 item-center justify-center'>
                  {authenticated && <div className='flex gap-6'>
                      
                    <button className="relative text-gray-600 hover:text-gray-800">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  3
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
                    <button onClick={handleClick} className='md:hidden'>{isOpen ? <X/> : <Menu/>}</button>
                </div>
            </div>





          
            
            
            {isOpen && (
        <motion.div className="md:hidden mt-4 p-4 bg-gray-100 absolute top-16 left-0 right-0 z-50 h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
          <ul className="space-y-4">
            {['Home', 'Categories', 'Channels', 'About'].map((item) => (
              <li key={item} className="hover:text-gray-700">
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
            {!authenticated && <div>
            <li>
              <Link to="/login" className="block py-2">
              <Button variant='white'>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/register" className="block py-2">
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
