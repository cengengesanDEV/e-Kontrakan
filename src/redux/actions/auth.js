import ACTION_STRING from './actionStrings';
// import { } from '../../utils/axios'


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

const authAction = {
  logoutThunk,
};

export default authAction;