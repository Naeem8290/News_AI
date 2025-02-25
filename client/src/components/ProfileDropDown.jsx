import React from 'react'
import { Avatar, Menu } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/slice/authSlice'
import { LogOut, User } from 'lucide-react'

const ProfileDropDown = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
        const handleSignOut = () => {
            dispatch(signOut())
            navigate(
                '/login'
            )
        }    

  return (
    <div>


      <Menu shadow="md" width={150}>
      <Menu.Target>
          <Avatar/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Link to='/profile'>
        <Menu.Item leftSection={<User size={16}/>} >
          Profile
        </Menu.Item>
        </Link>
        <Menu.Item leftSection={<LogOut size={16}/>} color='red' onClick={handleSignOut}>
       Sign Out
        </Menu.Item>
      


       
       
      </Menu.Dropdown>
    </Menu>
    </div>
  )
}

export default ProfileDropDown
