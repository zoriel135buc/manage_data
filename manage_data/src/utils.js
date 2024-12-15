import axios from "axios";

const getUsers = (url) => axios.get(url);
const getById = (url, id) => axios.get(url / id);

export { getUsers, getById };
