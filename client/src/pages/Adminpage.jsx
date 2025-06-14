import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { getCookie } from '../utils/utils';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = getCookie('user');
    if (!userCookie) {
      navigate('/login'); // If no user, redirect to login
      return;
    }

    console.log('userCookie:', userCookie); // Check what the cookie contains
    
    let user = null;
    
    if (userCookie) {
      try {
        user = JSON.parse(userCookie); // Try parsing it only if it's a valid JSON string
      } catch (error) {
        console.error('Error parsing user cookie:', error); // If parsing fails, log the error
      }
    }
    
    console.log('User from cookie:', user);
    console.log('User role from cookie:', user?.role); // Access the role from the parsed object
    
    if (user?.role !== 'admin') {
      navigate('/not-authorized'); // If the role is not admin, redirect
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Your admin page content */}
    </div>
  );
};

export default AdminPage;
