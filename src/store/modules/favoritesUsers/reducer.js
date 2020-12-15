const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "@favorites/UPDATE":
      return [...action.list];
    default:
      return state;
  }
};

export default favoritesReducer;
