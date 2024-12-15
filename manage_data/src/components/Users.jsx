import React from "react";
import { useState } from "react";
import OtherData from "./OtherData";
import Update from "./Update";
import Delete from "./Delete";

const Users = ({ users, setUsers }) => {
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
              <strong>ID:</strong> <input placeholder={user.id} />
            </p>
            <p>
              <strong>Name:</strong> <input placeholder={user.name} />
            </p>
            <p>
              <strong>Email:</strong> <input placeholder={user.email} />
            </p>
            {/* <h4>Tasks:</h4>
            <ul>
              {user.todos.map((todo) => (
                <li
                  key={todo.id}
                  style={{ color: todo.completed ? "green" : "red" }}
                >
                  {todo.title} - {todo.completed ? "Completed" : "Uncompleted"}
                </li>
              ))}
            </ul> */}
            <OtherData user={user} />
            <Update />
            <Delete user={user} setUsers={setUsers} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
