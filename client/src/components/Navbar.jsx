import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {Button} from '@mantine/core'
import {X , Menu} from 'lucide-react'

const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
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
                    <Link to='/login' className='hidden md:block'>
                    <Button variant='white'>Login</Button>
                    </Link>
                    <Link to='/register' className='hidden md:block'>
                    <Button variant='white'>Register</Button>
                    </Link>
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
          </ul>
        </motion.div>
      )}

        </nav>

    )
}

export default Navbar
