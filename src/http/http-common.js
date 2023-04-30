// import axios and set base url
import axios from 'axios';

// const baseURL = 'http://localhost:8080/api';
const baseURL = 'https://ux3ilugrb2.execute-api.us-east-1.amazonaws.com/api';

const httpCommon = axios.create({
  baseURL: baseURL,
});

export default httpCommon;
