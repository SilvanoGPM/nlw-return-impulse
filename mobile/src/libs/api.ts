import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.21.48.1:3333",
});
