import { saveTecnology } from "./actions";

const saveTecnologyThunk = (data) => {
  return (dispatch, getState) => {
    const { user } = getState(); // dados do usuario
    //inserir tecnologia nova no usuario
    console.log("testeTechnology", user);
    dispatch(saveTecnology(data));
  };
};

export default saveTecnologyThunk;
