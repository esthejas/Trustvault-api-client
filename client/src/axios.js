import axios from "axios";
const token = sessionStorage.getItem("token");
console.log(token);
const API = axios.create({
    baseURL:" http://localhost:4000",
    
});

export default API;