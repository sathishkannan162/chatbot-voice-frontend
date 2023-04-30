// import axios and set base url
import axios from "axios";

const baseURL = "http://localhost:8080/api";

const httpCommon = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default httpCommon;

