import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./modules/login/reducers";
import tokenReducer from "./modules/token/reducer";
import { usersReducer, nextUrlReducer } from "./modules/users/reducer";

const reducers = combineReducers({
  user: loginReducer,
  booleanToken: tokenReducer,
  userList: usersReducer,
  nextUrl: nextUrlReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
