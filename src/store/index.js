import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./modules/userLogged/reducers";
import tokenReducer from "./modules/token/reducer";
import { usersReducer, nextUrlReducer } from "./modules/users/reducer";
import favoritesReducer from "./modules/favoritesUsers/reducer";

const reducers = combineReducers({
  user: loginReducer,
  token: tokenReducer,
  userList: usersReducer,
  nextUrl: nextUrlReducer,
  listFavorites: favoritesReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
