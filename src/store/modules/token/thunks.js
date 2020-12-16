import { setToken } from "./actions";

export const setTokenThunk = (token) => (dispatch, _getState) => {
  dispatch(setToken(token));
};
