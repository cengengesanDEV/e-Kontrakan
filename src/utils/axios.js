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

// axios get history
export const getHistory = (status, token) => {
  return axios.get(`${URL}/transaction/history/${status}`, {
    headers: {
      "x-access-token" : token
    }
  });
};


// axios payment
export const paymentUser = (token, body) => {
  return axios.patch(`${URL}/transaction/payment`, body, {
    headers: {
      "x-access-token" : token
    }
  });
};

// axios history delete
export const deletehistoryuser = (id,token) => {
  return axios.patch(`${URL}/transaction/delete/customer/${id}`, {}, {
    headers: {
      "x-access-token" : token
    }
  });
};


// axios data pemsanan
export const getPemesanan = (token,body) => {
  return axios.get(`${URL}/transaction/paid/${body}`, {
    headers: {
      "x-access-token" : token
    }
  });
};

// axios change status acc
export const pemesananACC = (id,token, body) => {
  return axios.patch(`${URL}/transaction/acc/${id}`, body, {
    headers: {
      "x-access-token" : token
    }
  });
};

export const finishOrder = (id,token) => {
  return axios.patch(`${URL}/transaction/finish/${id}`, {}, {
    headers: {
      "x-access-token" : token
    }
  });
};

// axios data pemsanan
export const getHistoryowner = (token, status) => {
  return axios.get(`${URL}/transaction/${status}`, {
    headers: {
      "x-access-token" : token
    }
  });
};


// axios edit password
export const editPassword = (token, body) => {
  return axios.patch(`${URL}/users/editpass`, body ,{
    headers: {
      "x-access-token" : token
    }
  });
};

// forgot password
export const forgotPassword = (email) => {
  return axios.patch(`${URL}/users/forgot/${email}`);
};

// change password forgot
export const changeforgotPassword = (body) => {
  return axios.patch(`${URL}/users/changePwd/`,body);
};

export const uploadKTP = (body ,token) => {
  return axios.patch(`${URL}/users/ktp`, body, {
    headers: {
      'x-access-token' : token
    }
  });
};