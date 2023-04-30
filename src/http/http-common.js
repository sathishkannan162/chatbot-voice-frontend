// import axios and set base url
import axios from 'axios';

// const baseURL = 'http://localhost:8080/api';
const baseURL = "https://q8ete8xxul.execute-api.us-east-1.amazonaws.com/"

const httpCommon = axios.create({
  baseURL: baseURL,
});

export default httpCommon;
