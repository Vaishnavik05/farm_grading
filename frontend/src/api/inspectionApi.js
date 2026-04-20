import API from "./axios";
export const getInspections = () => API.get("/inspections");
export const addInspection = (data) => API.post("/inspections", data);