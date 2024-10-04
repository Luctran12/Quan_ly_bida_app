import axios from "axios";

const request = axios.create({
  baseURL: "https://quan-ly-bida-backend.onrender.com",
});
export default request;
