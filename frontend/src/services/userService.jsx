import { myAxios } from "./config";
export const signUp=(user)=>{

    return myAxios
     .post("/users/signup", user)
     .then((response)=> response.data);
};

export const loginUser = async (loginDetail) => {
    try {
      const response = await myAxios.post('/users/signin', loginDetail); // Use the baseURL defined in myAxios
      return response.data; // Return the response data, which should contain the token
    } catch (error) {
      // Handle errors, you can also add more specific error handling here
      throw error;
    }
  };
// import { myAxios } from "./config";

// export const signUp = (user) => {
//   return myAxios
//     .post("/users/signup", user)
//     .then(response => response.data)
//     .catch(error => {
//       console.error("Sign-up error:", error);
//       throw error;
//     });
// };

// export const loginUser = async (loginDetail) => {
//   try {
//     const response = await myAxios.post('/users/signin', loginDetail);
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };


// export const fetchUsers = async () => {
//   try {
//     const response = await myAxios.get('/api/users'); // Ensure the endpoint is correct
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
