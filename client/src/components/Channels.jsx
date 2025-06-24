import { Button, TextInput } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../redux/slice/usersSlice.js';
import { getCookie } from '../utils/utils.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });

  const id = getCookie("id");


  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when component loads
  }, [dispatch]);

  const handleCreate = () => {
    if (newUser.name && newUser.email) {
      dispatch(createUser(newUser)).then(() => dispatch(fetchUsers())); // Fetch updated list after adding
      setNewUser({ name: "", email: "" });
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setUpdatedUser({ name: user.name, email: user.email });
  };

  const handleUpdate = (id) => {
    dispatch(updateUser({ id, userData: updatedUser })).then(() => dispatch(fetchUsers())); // Fetch updated list
    setEditingUserId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id)).then(() => dispatch(fetchUsers())); // Fetch updated list
  };
// CRUD OPERATION
  return (
    <div>
      <h2>User List</h2>

      {/* Create User */}
      <div style={{ marginBottom: "20px" }}>
        <TextInput
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextInput
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Button onClick={handleCreate}>Add User</Button>
      </div>

      {/* Loading & Error Handling */}
      {status === "loading" && <p>Loading users...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {/* List Users */}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              {editingUserId === user.id ? (
                <>
                  <TextInput
                    placeholder="Edit Name"
                    value={updatedUser.name}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                  />
                  <TextInput
                    placeholder="Edit Email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                  <Button onClick={() => handleUpdate(user.id)}>Update</Button>
                  <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
                </>
              ) : (
                <div className='m-3'>
                  <span>{user.name} - {user.email}</span>
                  <div className="flex gap-3 ml-auto mt-1">
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user.id)}>Delete</Button>

                  </div>
                  
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Channels;
