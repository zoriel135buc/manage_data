import { useState } from "react";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const Update = ({ updateData, user }) => {
  const updateUsers = async () => {
    try {
      const { data } = await axios.put(`${USERS_URL}/${user.id}`, updateData);
      console.log("Updated user:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div>
      <button onClick={updateUsers}>update</button>
    </div>
  );
};

export default Update;
