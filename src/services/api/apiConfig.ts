import axios from "axios";

const stands = {
  dev: "http://192.168.0.101:5000/",
  prod: "/",
};

export const StandUrl = process.env.NODE_ENV !== "production" ? stands.dev : stands.prod;

const http = axios.create({
  baseURL: StandUrl + "api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
