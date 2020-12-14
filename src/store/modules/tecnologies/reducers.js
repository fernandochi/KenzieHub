const tecnologyReducer = (state = {}, action) => {
  switch (action.type) {
    case "feature/add/tecnology":
      //como trazer o state global do usuario pra cá, pra depois adicionar a tecnologia nova no array 'techs'?
      const { data } = action;
      return data;

    default:
      return state;
  }
};

export default tecnologyReducer;
