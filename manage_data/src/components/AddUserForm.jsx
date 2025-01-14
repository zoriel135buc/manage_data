import React, { useState } from "react";

const AddUserForm = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdUser = {
      ...newUser,
      id: Math.floor(Math.random() * 1000), // Generate a random ID
    };

    // Pass the new user data to the parent component
    onAddUser(createdUser);
    setNewUser({ name: "", email: "" }); // Reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
