import API from "./axios";

export const getUsers = (token) =>
	API.get("/users", token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);

export const createUser = (data) => API.post("/users", data);