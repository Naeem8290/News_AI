import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { signUp } from '../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const Register = () => {
    const [isEyeClick, setIsEyeClick] = useState(false);
    const [isEyeClicks, setIsEyeClicks] = useState(false);

    const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
    };
    const handleEyeClicks = () => {
        setIsEyeClicks(!isEyeClicks);
    };


    const Dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)





    const passwordSchema = z.string().min(4, { message: 'Password should be at least 8 character long' }).superRefine((value, ctx) => {
        // console.log(value)
        if (!/[A-Z]/.test(value)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Must required at least one uppercase case",
            });
        }
        if (!/[a-z]/.test(value)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Must required at least one lowercase case",
            });
        }
        if (!/[0-9]/.test(value)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Must required at least one digit",
            });
        }
    })




    const registerSchema = z.object({
        name: z
            .string()
            .min(1, { message: ('This field has to be filled') }),

        email: z
            .string()
            .min(1, { message: ('This field has to be filled') })
            .email('This is not a valid email'),

        password: passwordSchema,

        confirmPassword: z.string(),
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Password do not match',
            path: ['confirmPassword'],
        });
        
        

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    // console.log(errors.confirmPassword);


    // const [pimg, setPImg] = useState("")


    const onSubmit = (data) => {
        console.log(data);
        Dispatch(signUp(data))
    }

    // const onSubmit = async (data) => {
    //     const formData = new FormData();
    //     formData.append("name", data.name);
    //     formData.append("email", data.email);
    //     formData.append("password", data.password);
    //     formData.append("pimg", pimg);
    
    //     const response = await Dispatch(signUp(formData));
    //     if (response.payload?.pimg) {
    //         document.cookie = `pimg=${response.payload.pimg}; path=/;`;
    //     }
    // };
    
    




    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-96 rounded-2xl p-6 shadow-md bg-white"
            >
                <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
                <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 relative  ">
                        <User className="text-gray-500 absolute left-2" />
                        <input
                            type="text"
                            name="name"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Full Name"
                            {...register("name")}
                        />
                    </div>
                    {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

                    <div className="flex gap-2 relative  ">
                        <Mail className="text-gray-500 absolute left-2" />
                        <input
                            type="email"
                            name="email"
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
                            name="password"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Password..."
                            {...register("password")}
                        />
                    </div>
                    {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}

                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClicks} className="absolute right-2">
                            {isEyeClicks ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClicks ? 'text' : 'password'}
                            name="confirmPassword"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Confirm Password..."
                            {...register("confirmPassword")}
                        />
                    </div>
                    {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}





                    {/* <input id="form1" type="file" className="form-control mt-2" onChange={(e) => { setPImg(e.target.files[0]) }} /> */}



                    <p className='text-sm'>By signing up, you agree to our <a href="/terms" className='text-blue-400'>Terms</a>, <a href="/privacy" className='text-blue-400'>Privacy Policy</a> and <a href="/policy" className='text-blue-400'>Cookies Policy</a>.</p>
                    <Button type='submit' fullWidth>{loading ? <Loader size={16} color='white' /> : 'SignUp'}</Button>
                    <p className='flex justify-center'>Have an account? <a href="/login" className='text-blue-500'>Log in</a></p>
                </form>
            </motion.div>
        </div>
    )
}

export default Register
