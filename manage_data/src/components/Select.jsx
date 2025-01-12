import React from "react";

const Select = ({ users, user }) => {
  return (
    <div>
      <h4>Tasks:</h4>
      <ul>
        {user.todos.map((todo) => (
          <ul
            key={todo.id}
            style={{
              border: "1px solid pink",
              marginBottom: "10px",
            }}
          >
            title: {todo.title} <br />
            completed:{todo.completed ? "Completed" : "Uncompleted"}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Select;
