import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
