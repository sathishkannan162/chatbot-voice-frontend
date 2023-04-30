// import axios and set base url
import axios from 'axios';

// const baseURL = 'http://localhost:8080/api';
const baseURL = "https://chatbot-voice-backend.sathishkannan16.repl.co/api";

const httpCommon = axios.create({
  baseURL: baseURL,
});

export default httpCommon;
