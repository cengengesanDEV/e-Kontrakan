import axios from "axios"


const URL = process.env.REACT_APP_BACKEND_HOST


// Axios register
export const RegisterAccount = (body) => {
  return axios.post(`${URL}/users`, body);
};

// Axios register
export const LoginAccount = (body) => {
  return axios.post(`${URL}/auth`, body);
};

// Axios get user by id
export const GetUser = (token) => {
  return axios.get(`${URL}/users`,{
    headers: {
      'x-access-token' : token
    }
  });
};