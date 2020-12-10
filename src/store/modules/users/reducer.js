const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "@users/GET":
      const { usersList } = action;
      return [...state, ...usersList];
    default:
      return state;
  }
};

export default usersReducer;
