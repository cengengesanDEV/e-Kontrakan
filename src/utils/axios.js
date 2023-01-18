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

// Axios logout
export const LogoutAccount = (token) => {
  return axios.delete(`${URL}/auth`, {
    headers: {
      'x-access-token' : token
    }
  });
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


// Axios get detail location (page = Kontrakan detail location)
export const locationDetail = (id) => {
  return axios.get(`${URL}/kontrakan/kontrakan/${id}`);
};



// Axios get category by id (page = kontrakan category)
export const getCategoryKontrakanID = (id) => {
  return axios.get(`${URL}/kontrakan/kontrakan/category/${id}`);
};

// Axios patch category by id (page = kontrakan category)
export const patchCategoryKontrakanID = (id, body, token) => {
  return axios.patch(`${URL}/kontrakan/category/${id}`, body, {
    headers: {
      'x-access-token': token
    }
  });
};

// Axios patch category by id (page = kontrakan category)
export const patchLocationKontrakanID = (id, body, token) => {
  return axios.patch(`${URL}/kontrakan/detail/${id}`, body, {
    headers: {
      'x-access-token': token
    }
  });
};

// Axios delete category by id (page = kontrakan category)
export const deleteCategoryKontrakanID = (id) => {
  return axios.patch(`${URL}/kontrakan/delete/category/${id}`,{});
};

// Axios delete location by id (page = kontrakan category)
export const deleteLocationKontrakanID = (id) => {
  return axios.patch(`${URL}/kontrakan/delete/detail/${id}`,{});
};

// axios suspend user
export const suspendUser = (id, token, body) => {
  return axios.patch(`${URL}/users/delete/${id}`, body, {
    headers: {
      "x-access-token" : token
    }
  });
};

// axios unsuspend
export const UnsuspendUser = (id, token) => {
  return axios.patch(`${URL}/users/unsuspend/${id}`, {}, {
    headers: {
      "x-access-token" : token
    }
  });
};

// get kontrakan by user id in page admin
export const getkontrakanuserID = (id) => {
  return axios.get(`${URL}/kontrakan/admin/detail/${id}`);
};

// axios booking transactions
export const Bookingtransactions = (token, body) => {
  return axios.post(`${URL}/transaction`, body, {
    headers: {
      "x-access-token" : token
    }
  });
};