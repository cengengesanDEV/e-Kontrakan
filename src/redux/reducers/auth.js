import ACTION_STRING from '../actions/actionStrings';

const initialState = {
  isError: false,
  isLoading: false,
  isFulfilled: false,
  error: null,
  profile: {
    id_acc: null,
    email: null,
    phone_number: null,
    fullname: null,
    rekening: null,
    noKTP:null,
    role: null,
    gender: null,
    location: null,
    address: null,
    image_ktp : 'https://res.cloudinary.com/derghlznx/image/upload/v1673008181/E-kontrakan/userdefault_upicat.jpg',
    image: `https://res.cloudinary.com/derghlznx/image/upload/v1673008181/E-kontrakan/userdefault_upicat.jpg`,
  },
  rent: {
    id_product: null,
    price: 0,
    name_product: null,
    status: null,
    delivery: null,
    total: 0,
    image: null,
    qty: 1,
    payment_method: null,
    size: null,
    id_promo: null,
    disc: null
  },
};

const authReducer = (prevState = initialState, {type, payload}) => {
  const {product, logout, profile, pending, rejected, fulfilled} =
    ACTION_STRING;

  switch (type) {
    // profile
    case profile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case profile + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        // error: payload.error.response.data.msg,
      };
    case profile + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        profile: {
          id_acc: payload.data.data[0].id,
          email: payload.data.data[0].email,
          role: payload.data.data[0].role,
          phone_number: payload.data.data[0].phone_number,
          fullname: payload.data.data[0].full_name,
          rekening: payload.data.data[0].no_rekening,
          gender: payload.data.data[0].gender,
          location: payload.data.data[0].location,
          address: payload.data.data[0].address,
          image: payload.data.data[0].image,
          noKTP: payload.data.data[0].no_ktp,
          image_ktp: payload.data.data[0].image_ktp,
        },
      };

    // product
    case product + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        product: {
          ...prevState.product,
          ...payload.data,
        },
      };

    // logout
    case logout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case logout + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case logout + fulfilled:
      return initialState;

    default:
      return prevState;
  }
};

export default authReducer;
