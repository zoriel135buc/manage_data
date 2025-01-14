import React, { useState, useEffect } from "react";
import axios from "axios";
import OtherData from "./OtherData";
import Update from "./Update";
import Delete from "./Delete";

const URL_POSTS = "https://jsonplaceholder.typicode.com/posts";

const Users = ({ users, setUsers, onDelete }) => {
  const [updateData, setUpdateData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false); // Track if we are adding a new todo
  const [newTodoTitle, setNewTodoTitle] = useState(""); // Store the title of the new todo
  const [isAddingPost, setIsAddingPost] = useState(false); // Track if we are adding a new post
  const [newPostTitle, setNewPostTitle] = useState(""); // Store the title of the new post
  const [newPostBody, setNewPostBody] = useState(""); // Store the body of the new post

  // Fetch posts when a user is selected
  useEffect(() => {
    if (selectedUser) {
      console.log("Fetching posts for user:", selectedUser.id);

      axios
        .get(`${URL_POSTS}?userId=${selectedUser.id}`)
        .then((response) => {
          console.log("Fetched posts:", response.data);
          setUserPosts(response.data);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    console.log("User clicked:", user);
    setSelectedUser(user);
    setSidebarOpen(true);
  };

  // Function to handle "Mark Completed" for Todos
  const markTodoCompleted = (todoId) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      todos: prevUser.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: true } : todo
      ),
    }));
  };

  // Function to add new Todo
  const addNewTodo = () => {
    if (!newTodoTitle.trim()) return; // Don't add empty todos

    const newTodo = {
      id: selectedUser.todos.length + 1, // Generating an id for the new todo
      title: newTodoTitle,
      completed: false,
      userId: selectedUser.id,
    };

    setSelectedUser((prevUser) => ({
      ...prevUser,
      todos: [...prevUser.todos, newTodo],
    }));

    // Reset input field and toggle back to showing todos
    setNewTodoTitle("");
    setIsAddingTodo(false);
  };

  // Function to cancel adding a new Todo
  const cancelAddTodo = () => {
    setIsAddingTodo(false);
    setNewTodoTitle("");
  };

  // Function to add new Post
  const addNewPost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return; // Don't add empty posts

    const newPost = {
      id: userPosts.length + 1, // Generating an id for the new post
      title: newPostTitle,
      body: newPostBody,
      userId: selectedUser.id,
    };

    setUserPosts((prevPosts) => [...prevPosts, newPost]);

    // Reset input fields and toggle back to showing posts
    setNewPostTitle("");
    setNewPostBody("");
    setIsAddingPost(false);
  };

  // Function to cancel adding a new Post
  const cancelAddPost = () => {
    setIsAddingPost(false);
    setNewPostTitle("");
    setNewPostBody("");
  };

  return (
    <div className="users-container">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-card"
          style={{
            border: `3px solid ${user.hasUncompleted ? "red" : "green"}`,
            backgroundColor: selectedUser?.id === user.id ? "orange" : "black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>ID:</strong>
            <button onClick={() => handleUserClick(user)}>{user.id}</button>
          </p>
          <p>
            <strong>Name:</strong>
            <input
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
              placeholder={user.name}
            />
          </p>
          <p>
            <strong>Email:</strong>
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
        </div>
      ))}

      {/* Sidebar */}
      {sidebarOpen && selectedUser && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            X
          </button>

          {/* Todos section before posts */}
          <h3>{selectedUser.name}'s Todos</h3>
          <button onClick={() => setIsAddingTodo(true)}>Add Todo</button>

          {/* Show Add Todo form if we're in the "add" mode */}
          {isAddingTodo ? (
            <div>
              <input
                type="text"
                placeholder="Enter new todo title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
              <button onClick={addNewTodo}>Add</button>
              <button onClick={cancelAddTodo}>Cancel</button>
            </div>
          ) : (
            <ul>
              {selectedUser.todos && selectedUser.todos.length > 0 ? (
                selectedUser.todos.map((todo) => (
                  <li key={todo.id}>
                    <strong>Title: {todo.title}</strong>
                    <br />
                    <strong>
                      Completed: {todo.completed ? "✅ Yes" : "❌ No"}
                    </strong>
                    <br />
                    {!todo.completed && (
                      <button onClick={() => markTodoCompleted(todo.id)}>
                        Mark Completed
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <p>No todos available.</p>
              )}
            </ul>
          )}

          {/* Posts section after todos */}
          <h3>{selectedUser.name}'s Posts</h3>
          <button onClick={() => setIsAddingPost(true)}>Add Post</button>

          {/* Show Add Post form if we're in the "add" mode */}
          {isAddingPost ? (
            <div>
              <input
                type="text"
                placeholder="Enter post title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <textarea
                placeholder="Enter post body"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
              />
              <button onClick={addNewPost}>Add</button>
              <button onClick={cancelAddPost}>Cancel</button>
            </div>
          ) : (
            <ul>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <li key={post.id}>
                    <strong>Title: {post.title}</strong>
                    <br />
                    <p>Body: {post.body}</p>
                  </li>
                ))
              ) : (
                <p>Loading posts...</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
