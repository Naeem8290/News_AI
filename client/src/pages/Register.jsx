import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User} from 'lucide-react';
import { Button } from '@mantine/core';

const Login = () => {
    const [isEyeClick, setIsEyeClick] = useState(false);
    const [isEyeClicks, setIsEyeClicks] = useState(false);

    const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
    };
    const handleEyeClicks = () => {
        setIsEyeClicks(!isEyeClicks);
    };
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-96 rounded-2xl p-6 shadow-md bg-white"
            >
                <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
                <form className="space-y-6 w-full">
                <div className="flex gap-2 relative  ">
                        <User className="text-gray-500 absolute left-2" />
                        <input
                            type="text"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Username..."
                        />
                    </div>
                    <div className="flex gap-2 relative  ">
                        <Mail className="text-gray-500 absolute left-2" />
                        <input
                            type="email"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Email..."
                        />
                    </div>
                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClick} className="absolute right-2">
                            {isEyeClick ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClick ? 'text' : 'password'}
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Password..."
                        />
                    </div>

                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClicks} className="absolute right-2">
                            {isEyeClicks ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClicks ? 'text' : 'password'}
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Confirm Password..."
                        />
                    </div>
                    


                    {/* <p className='text-sm'>By signing up, you agree to our <a href="/terms" className='text-blue-300'>Terms</a>, <a href="/privacy" className='text-blue-300'>Privacy Policy</a> and <a href="/policy" className='text-blue-300'>Cookies Policy</a>.</p> */}
                    <Button fullWidth>Register</Button>
                    {/* <p className='flex justify-center'>Have an account? <a href="/login" className='text-blue-500'>Log in</a></p> */}
                </form>
            </motion.div>
        </div>
    )
}

export default Login
