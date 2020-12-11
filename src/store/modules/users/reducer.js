export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "@users/GET":
      const { usersList } = action;
      return [...usersList];
    default:
      return state;
  }
};

export const nextUrlReducer = (state = "", action) => {
  switch (action.type) {
    case "@nextUrl/GET":
      const { nextUrl } = action;
      return nextUrl;
    default:
      return state;
  }
};
