import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../redux/slice/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isEyeClick, setIsEyeClick] = useState(false);
    const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
    };


    const Dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)


    const loginSchema = z.object({
        email: z
            .string()
            .min(1, { message: ('This field has to be filled') })
            .email('This is not a valid email'),

        password: z
            .string()
            .min(1, { message: ('Password is required') }),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // console.log(register("email"));
    // console.log(errors);


    const onSubmit = (data) => {
        // console.log(data)
        Dispatch(login(data))
    }


    const { authenticated , preferences } = useSelector((state) => state.auth)
    console.log(authenticated)
    console.log(preferences);
    console.log(preferences.length<=0);
    console.log(preferences.length);

    
    
    const navigate = useNavigate()

    useEffect(() => {
        if (authenticated && preferences.length > 0) {
            navigate('/') ;
        } else if (authenticated && preferences.length <= 0) {
            navigate('/preferences') ;

        }
    }, [authenticated]) ;



    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-96 rounded-2xl p-6 shadow-md bg-white"
            >
                <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
                <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 relative  ">
                        <Mail className="text-gray-500 absolute left-2" />
                        <input
                            type="email"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Email..."
                            {...register("email")}
                        />
                    </div>
                    {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClick} className="absolute right-2">
                            {isEyeClick ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClick ? 'text' : 'password'}
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Password..."
                            {...register("password")}
                        />
                    </div>
                    {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
                    <p className='text-sm'>Don't have an account? <a href="/register" className='text-blue-600'>Register</a></p>
                    <Button fullWidth type='submit'>{loading ? <Loader size={16} color='white' /> : 'Login'}</Button>
                    <p><a href="/forgot" className='flex justify-center'>Forgot password?</a></p>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
