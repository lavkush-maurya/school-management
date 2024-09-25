// src/axiosFetch.js
import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Your base API URL
});

export default axiosFetch;
