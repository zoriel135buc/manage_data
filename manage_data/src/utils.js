import axios from "axios";

const getUsers = (url) => axios.get(url);

export { getUsers };
