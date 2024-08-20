import axios from "axios";
import { isLoggedIn, getCurrentUserDetail } from '../auth/index';

export const BASE_URL = 'https://localhost:8080';

export const myAxios = axios.create({
  baseURL: BASE_URL
});

// Add a request interceptor to include the JWT token if the user is logged in
// myAxios.interceptors.request.use(
//   config => {
//     // Check if the user is logged in
//     if (isLoggedIn()) {
//       // Get the current user details
//       const user = getCurrentUserDetail();
//       if (user && user.jwt) {
//         // Include the token in the Authorization header
//         config.headers['Authorization'] = `Bearer ${user.jwt}`;
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

