import { tryLogin } from "./actions";

const tryLoginThunk = (data) => {
  return (dispatch, _getState) => {
    dispatch(tryLogin(data));
  };
};

export default tryLoginThunk;
