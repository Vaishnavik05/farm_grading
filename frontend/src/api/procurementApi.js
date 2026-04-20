import API from "./axios";
export const getOrders = () => API.get("/procurement");
export const createOrder = (data) => API.post("/procurement", data);