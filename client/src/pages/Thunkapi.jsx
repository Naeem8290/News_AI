// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/usersSlice.js';

const Thunkapi = () => {
  const dispatch = useDispatch();
  
  // Select the data and status from the Redux store
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Users List</h1>
      {content}
    </div>
  );
};

export default Thunkapi;
