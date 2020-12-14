import axios from "axios";
import { getUsers, nextUrl } from "./actions";
export const getUsersThunk = (perPage, page, tech = "") => (
  dispatch,
  _getState
) => {
  axios
    .get(
      `https://kenziehub.me/users?perPage=${perPage}&page=${page}&tech=${tech}`
    )
    .then((res) => {
      dispatch(nextUrl(res.headers.nexturl));
      dispatch(getUsers(res.data));
    })
    .catch((err) => console.error(err));
};
