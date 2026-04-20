import API from "./axios";
export const getProduce = () => API.get("/produce");
export const addProduce = (data) => API.post("/produce", data);