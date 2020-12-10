import axios from "axios";
import { getUsers } from "./actions";
export const getUsersThunk = (perPage, page) => (dispatch, _getState) => {
  axios
    .get(`https://kenziehub.me/users?perPage=${perPage}&page=${page}`)
    .then((res) => {
      console.log("oi");
      console.log(res);
      dispatch(getUsers(res.data));
    })
    .catch((err) => console.error(err));
};
