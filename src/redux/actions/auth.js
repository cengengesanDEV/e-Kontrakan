import ACTION_STRING from './actionStrings';
import { GetUser } from '../../utils/axios'


// action Logout
const logoutPending = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.pending),
});

const logoutRejected = error => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.rejected),
  payload: {error},
});

const logoutFulfilled = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.fulfilled),
});

const logoutThunk = token => {
  return async dispatch => {
    try {
      dispatch(logoutPending());
      // await Logout(token);
      await localStorage.removeItem('token');
      await localStorage.removeItem('role');

      dispatch(logoutFulfilled());
    } catch (error) {
      dispatch(logoutRejected(error));
      console.log(error);
    }
  };
};


// Action Get user by id
const profilePending = () => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.pending),
});

const profileRejected = error => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.rejected),
  payload: {error},
});

const profileFulfilled = data => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const profileThunk = (token, navigate) => {
  return async dispatch => {
    try {
      dispatch(profilePending());    
      const response = await GetUser(token);
      console.log(response.data)
      dispatch(profileFulfilled(response.data));
      if (typeof navigate === 'function') navigate();
    } catch (error) {
      dispatch(profileRejected(error));
      console.log(error);
    }
  };
};

const authAction = {
  logoutThunk,
  profileThunk,
};

export default authAction;