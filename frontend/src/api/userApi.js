import API from "./axios";
export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);