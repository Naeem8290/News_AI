import React from 'react'
import { motion } from "motion/react"

const App = () => {
  return (
    <div>
      <motion.h2 animate={{rotate:360}} className='text-3xl text-red-500'>Hello World</motion.h2>
    </div>
  )
}

export default App
