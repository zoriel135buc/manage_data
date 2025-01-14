import "./App.css";
import AddUserForm from "./components/AddUserForm";
import { useEffect, useState } from "react";
import { getUsers } from "./utils";
import Users from "./components/Users";
import Search from "./components/Search";
import Select from "./components/Select";
import axios from "axios";
import Update from "./components/Update";
import Delete from "./components/Delete";

const URL_USERS = `https://jsonplaceholder.typicode.com/users`;
const URL_TODOS = `https://jsonplaceholder.typicode.com/todos`;
const URL_POSTS = `https://jsonplaceholder.typicode.com/posts`;

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch data for users and todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: usersData } = await axios.get(URL_USERS);
        const { data: todosData } = await axios.get(URL_TODOS);

        const usersWithTodos = usersData.map((user) => {
          const userTodos = todosData.filter((todo) => todo.userId === user.id);
          const hasUncompleted = userTodos.some((todo) => !todo.completed);
          return {
            ...user,
            todos: userTodos,
            hasUncompleted,
          };
        });

        setUsers(usersWithTodos);
        setFilteredUsers(usersWithTodos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (searchText) => {
    const lowerCaseQuery = searchText.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  const handleUpdateUser = (userId) => {
    const updatedUser = {
      ...selectedUser,
      name: updateData.name || selectedUser.name,
      email: updateData.email || selectedUser.email,
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? updatedUser : user))
    );
    setSelectedUser(updatedUser);
    setUpdateData({});
  };

  const addNewTodo = () => {
    if (!newTodoTitle.trim()) return;
    const newTodo = {
      id: selectedUser.todos.length + 1,
      title: newTodoTitle,
      completed: false,
      userId: selectedUser.id,
    };

    setSelectedUser((prevUser) => ({
      ...prevUser,
      todos: [...prevUser.todos, newTodo],
    }));
    setNewTodoTitle("");
  };

  const addNewPost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return; // Don't add empty posts
    const newPost = {
      id: selectedUser.posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
      userId: selectedUser.id,
    };

    setSelectedUser((prevUser) => ({
      ...prevUser,
      posts: [...prevUser.posts, newPost],
    }));
    setNewPostTitle("");
    setNewPostBody("");
  };
  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFilteredUsers((prevUsers) => [...prevUsers, newUser]);
    setShowAddForm(false); // Close form after adding
  };

  return (
    <div className="App">
      <div className="search-container">
        <h3>Search</h3>
        <Search onSearch={handleSearch} />
        <button onClick={() => setShowAddForm(true)}>Add User</button>
      </div>
      {showAddForm && <AddUserForm onAddUser={handleAddUser} />}
      <Users
        users={filteredUsers}
        setUsers={setUsers}
        onDelete={handleDelete}
        setUpdateData={setUpdateData}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default App;
