import "./App.css";
import { useEffect, useState } from "react";
import { getUsers } from "./utils";
import Users from "./components/Users";
import Search from "./components/Search";
import Select from "./components/Select";
import AddTask from "./components/AddTask";

const URL_USERS = `https://jsonplaceholder.typicode.com/users`;

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUsers(URL_USERS);
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Search />
      <Users users={users} />
      <Select />
      <AddTask />
    </>
  );
}

export default App;
