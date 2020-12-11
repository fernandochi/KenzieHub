const loginReducer = (state = [], action) => {
  switch (action.type) {
    case "feature/login":
      const { data } = action;
      return data;

    default:
      return state;
  }
};

export default loginReducer;
