const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "@users/GET":
      const { usersList } = action;
      return [...usersList];
    default:
      return state;
  }
};

export default usersReducer;
