import React from "react";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const Delete = ({ user, onDelete, users }) => {
  const DeleteUser = async () => {
    try {
      await axios.delete(`${USERS_URL}/${user.id}`);
      onDelete(user.id); // Notify the parent about the deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <button onClick={DeleteUser}>Delete</button>
    </div>
  );
};

export default Delete;
