import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@mantine/core';

const Login = () => {
    const [isEyeClick, setIsEyeClick] = useState(false);
    const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
    };
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-96 rounded-2xl p-6 shadow-md bg-white"
            >
                <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
                <form className="space-y-6 w-full">
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
                    {/* <p className='text-sm'>Don't have an account? <a href="/register" className='text-blue-600'>Register</a></p> */}
                    <Button fullWidth>Login</Button>
                    {/* <p><a href="/forgot" className='flex justify-center'>Forgot password?</a></p> */}
                </form>
            </motion.div>
        </div>
    )
}

export default Login
