import axios from 'axios';

const baseURL = 'https://ux3ilugrb2.execute-api.us-east-1.amazonaws.com/api';

const httpCommon = axios.create({
  baseURL: baseURL,
});

export default httpCommon;
