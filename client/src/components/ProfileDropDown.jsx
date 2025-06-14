import { Avatar, Menu, Divider, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';
import { LogOut, User, Bookmark, Book, Mail } from 'lucide-react';
function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };
  return (
    <div>
      <Menu shadow="md" width={250}>
        <Menu.Target>
          <Avatar className="cursor-pointer" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>

          <Link to="/profile">
            {' '}
            <Menu.Item leftsection={<User size={16} />}>Profile</Menu.Item>
          </Link>
          <Menu.Item
            leftsection={<Bookmark size={16} />}
          >
            Bookmarks
          </Menu.Item>
          <Menu.Item leftsection={<Book size={16} />} >
            Reading History
          </Menu.Item>

          <Divider />
          <Menu.Item
            leftsection={<LogOut size={16} />}
            color="red"
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>
          <Text leftsection={<Mail size={16} />} ml={20} size="sm">
            {getCookie('email')}
          </Text>          
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default ProfileDropDown;