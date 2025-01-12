import React from "react";
import { useState } from "react";
import OtherData from "./OtherData";
import Update from "./Update";
import Delete from "./Delete";
import Select from "./Select";

const Users = ({ users, setUsers, onDelete }) => {
  const [updateData, setUpdateData] = useState({});
  return (
    <div className="users-container">
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="user-card"
            style={{
              border: `2px solid ${user.hasUncompleted ? "red" : "green"}`,
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>ID:</strong>
              <button>{user.id}</button>
            </p>
            <p>
              <strong>Name:</strong>{" "}
              <input
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
                placeholder={user.name}
              />
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <input
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
                placeholder={user.email}
              />
            </p>

            <OtherData user={user} />
            <Update user={user} updateData={updateData} />
            <Delete
              user={user}
              setUsers={setUsers}
              users={users}
              onDelete={onDelete}
            />
            <Select users={users} user={user} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
