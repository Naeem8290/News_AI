import React from 'react'
import Navbar from './components/Navbar'
import '@mantine/core/styles.css';
import { Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
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
