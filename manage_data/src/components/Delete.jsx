import React from "react";

const Delete = ({ user, setUsers }) => {
  const handleDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };
  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
