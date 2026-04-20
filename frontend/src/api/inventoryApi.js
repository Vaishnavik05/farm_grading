import API from "./axios";
export const getInventory = () => API.get("/inventory");