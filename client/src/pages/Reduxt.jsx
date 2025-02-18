// Example of Counter app with useState :-

// import React, { useState } from 'react'
// import { Button } from '@mantine/core'

// const Reduxt = () => {
//     const [count , setCount] = useState(0)
//   return (
//     <div>
//         <h1>{count}</h1>
//         <Button onClick={()=>setCount(count+1)}>Increment</Button>
//         <Button onClick={()=>count > 0 && setCount(count-1)}>Decrement</Button>
//         <Button onClick={()=>setCount(0)}>Reset</Button>
//     </div>
//   )
// }

// export default Reduxt



// --------------------------------------------------------------------------------------------

// Example of Counter app with Redux :-

// import React from "react";
// import { Button } from "@mantine/core";
// import { useSelector , useDispatch } from "react-redux";
// import { increment , decrement , reset } from "../redux/slice/counterSlice";

// const ReduxT = () => {

//     const {count} = useSelector((state)=>state.count)

//     const Dispatch = useDispatch()

//     return (
//         <div>
//             <h1>{count}</h1>
//             <Button onClick={() => Dispatch(increment())}>Increment</Button>
//             <Button onClick={() => Dispatch(decrement())}>Decrement</Button>
//             <Button onClick={() => Dispatch(reset())}>Reset</Button>
//         </div>
//     )
// }

// export default ReduxT

 


//------------------------------------------------------


// Light/Dark Theme

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme } from '../redux/slice/lightSlice';

const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode); // Get the current mode from the store

  // Define classes for light and dark modes
  const appClass = mode === 'light' ? 'bg-white text-black' : 'bg-black text-white';

  return (
    <div className={`h-100 w-100 grid rounded-full border-4 border-indigo-500 ${appClass}`}>
      <div className="flex items-center justify-center h-100  ">
        <div className="text-center p-8 bg-gray-200 rounded-lg shadow-md mt-150 ">
          <h1 className="text-3xl mb-4">Light/Dark Mode</h1>
          <button
            onClick={() => dispatch(lightTheme())}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
