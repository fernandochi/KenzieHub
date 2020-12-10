import { isToken } from "./actions";

export const isTokenThunk = (booleanToken) => (dispatch, _getState) => {
  dispatch(isToken(booleanToken));
};
