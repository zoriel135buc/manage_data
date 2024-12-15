import React from "react";
import { useState } from "react";
import OtherData from "./OtherData";
import Update from "./Update";
import Delete from "./Delete";

const URL_TODOS = `https://jsonplaceholder.typicode.com/todos`;

const Users = ({ users }) => {
  const [completed, setCompleted] = useState(true);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id} style={{ marginBottom: "20px" }}>
            id:{user.id}
            <br />
            name:{user.name}
            <br />
            email:{user.email}
            <br />
            <OtherData />
            <Update />
            <Delete />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
