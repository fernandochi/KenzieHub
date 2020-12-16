import { tryLogin } from "./actions";

const tryLoginThunk = (data) => {
  return (dispatch, getState) => {
    dispatch(tryLogin(data));
  };
};

export default tryLoginThunk;
