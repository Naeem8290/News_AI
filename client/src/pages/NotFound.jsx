import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-10 gap-10">
            <div className='w-full md:w-1/2 text-center'>
                <h1 className='text-red-500 text-9xl font-bold pb-5'>404</h1>
                <p className='text-3xl font-bold pb-2'>Page Not Found</p>
                <p className='text-yellow-600 font-bold'>It looks like you're lost...</p>
                <p className='text-gray-600 font-bold'>The page you are looking for didn't exit</p>
                <p className='text-gray-600 font-bold'>Go Back To The Home Page Again</p>
                <p className='mt-2 text-3xl'>👇</p>
                <Link to="/">
                    <Button className="p-6 mt-2 text-white bg-blue-600 hover:bg-blue-700" size='md' type="button">Home</Button>
                </Link>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
                <img src="/NotFound.png" alt="404" />
            </div>

        </div>
    )
}

export default NotFound
