import { Menu, Avatar, Divider, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';
import { LogOut, User, Mail, Bookmark, Book } from 'lucide-react';
import { useState } from 'react';

function ProfileDropDown() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  return (
    <div className="relative z-[9999] w-full md:mx-5">
      <Menu opened={opened} onChange={setOpened}  >
        <Menu.Target>
          <Avatar
            className="cursor-pointer"
          />
        </Menu.Target>

        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className=" mt-2.5 p-4 backdrop-blur bg-gradient-to-r from-gray-700/70 via-gray-800/70 to-gray-900/70 border-b border-white/10 absolute right-0 h-auto font-bold rounded-xl shadow-lg  w-60"
          >
            <Menu.Label>User</Menu.Label>

            <Link to="/profile">
              <Menu.Item color="lavender"
                leftSection={<User size={16} />}>Profile</Menu.Item>
            </Link>
            <Link to="/bookmarks">
              <Menu.Item color="lavender"
                leftSection={<Bookmark size={16} />}>Bookmark</Menu.Item>
            </Link><Link to="/reading-history">
              <Menu.Item color="lavender"
                leftSection={<Book size={16} />}>Reading History</Menu.Item>
            </Link>

            <Divider className="my-2" />

            <Menu.Item
              leftSection={<LogOut size={16} />}
              color="red"
              onClick={handleSignOut}
            >
              Sign Out
            </Menu.Item>

            <Text ml={20} size="sm" className="text-white/80 mt-2">
              {getCookie('email')}
            </Text>
          </motion.div>
        )}
      </Menu>
    </div>
  );
}

export default ProfileDropDown;
