import axios from "axios";

const API_URL = "https://api.punkapi.com/v2";

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export { plainAxiosInstance };
