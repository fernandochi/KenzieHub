const tokenReducer = (state = false, action) => {
  switch (action.type) {
    case "@token/SWITCH":
      return action.booleanToken;
    default:
      return state;
  }
};

export default tokenReducer;
