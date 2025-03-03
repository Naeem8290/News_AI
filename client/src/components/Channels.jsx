import { Button } from '@mantine/core';
import React from 'react'

const Channels = () => {

    const fetchUsers = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/users"); // Make sure this is correct
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      
  return (
    <div>
                  <Button onClick={fetchUsers}>Crud</Button>
        
      
    </div>
  )
}

export default Channels
