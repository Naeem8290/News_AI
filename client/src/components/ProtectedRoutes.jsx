import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../utils/utils'

const ProtectedRoutes = () => {
    const isAuthenticated = getCookie('isAuthenticated')

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return <Outlet/>


}

export default ProtectedRoutes
