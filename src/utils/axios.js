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

// Axios patch profile
export const patchProfile = (body ,token) => {
  return axios.patch(`${URL}/users/profile`, body, {
    headers: {
      'x-access-token' : token
    }
  });
};

// Axios add category kontrakan
export const categoryKontrakanadd = (body, token) => {
  return axios.post(`${URL}/kontrakan/category`, body , {
    headers: {
      'Content-Type' : 'multipart/form-data',
      'x-access-token': token
    }
  });
};

// Axios get category kontrakan
export const categoryKontrakanGet = (id) => {
  return axios.get(`${URL}/kontrakan/category/${id}`);
};

// Axios add detail kontrakan
export const detailKontrakanadd = (body, token) => {
  return axios.post(`${URL}/kontrakan/detail`, body , {
    headers: {
      'x-access-token': token
    }
  });
};


// Axios get detail kontrakan
export const detailKontrakanGet = (id) => {
  return axios.get(`${URL}/kontrakan/detail/${id}`);
};



