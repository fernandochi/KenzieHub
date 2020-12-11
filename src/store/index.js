import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./modules/userLogged/reducers";
import tokenReducer from "./modules/token/reducer";
import usersReducer from "./modules/users/reducer";

const reducers = combineReducers({
  user: loginReducer,
  booleanToken: tokenReducer,
  userList: usersReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
