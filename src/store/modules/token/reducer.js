const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "@token/SET":
      return action.token;
    default:
      return state;
  }
};

export default tokenReducer;
