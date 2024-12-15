import "./App.css";
import { useEffect, useState } from "react";
import { getUsers } from "./utils";
import Users from "./components/Users";
import Search from "./components/Search";
import Select from "./components/Select";
import AddTask from "./components/AddTask";
import axios from "axios";
import Update from "./components/Update";
import Delete from "./components/Delete";

const URL_USERS = `https://jsonplaceholder.typicode.com/users`;
const URL_TODOS = `https://jsonplaceholder.typicode.com/todos`;

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: name } = await axios.get(URL_USERS);
        const { data: todos } = await axios.get(URL_TODOS);

        const usersWithTodos = name.map((user) => {
          const userTodos = todos.filter((todo) => todo.userId === user.id);
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

  const handleSearch = (searchText) => {
    const lowerCaseQuery = searchText.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="App">
      <Search onSearch={handleSearch} />
      <Users users={filteredUsers} setUsers={setUsers} />

      <AddTask />
    </div>
  );
}

export default App;
