import axios from "axios";

export const getUsersThunk = (page, perPage) => (dispatch, _getState) => {
  axios
    .get(`https://kenziehub.me//users?perPage=${perPage}&page=${page}`)
    .then((res) => console.log(res));
};
