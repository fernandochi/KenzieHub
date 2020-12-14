import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Páginas do SPA
import Profile from "../pages/profile";
import Portfolio from "../pages/portfolio";
import Technologies from "../pages/technologies";
import Users from "../pages/users";

import HomePage from "../pages/homePage";
import UnauthorizedUsers from "../pages/unauthorizedUsers";
import Login from "../pages/login";
import UserRegistration from "../pages/userRegistration";

// State global do Token
import { useDispatch, useSelector } from "react-redux";
import { setTokenThunk } from "../store/modules/token/thunks";
import tryLoginThunk from "../store/modules/userLogged/thunks";

const URL_AUTHORIZED = ["/profile", "/portfolio", "/technologies"];

const MainRoutes = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.token);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    const userLogged = localStorage.getItem("user");
    if (tokenLocalStorage && userLogged) {
      axios
        .get("https://kenziehub.me/profile", {
          headers: { Authorization: `Bearer ${tokenLocalStorage}` },
        })
        .then((data) => {
          dispatch(setTokenThunk(tokenLocalStorage));
          dispatch(tryLoginThunk(JSON.parse(userLogged)));
        })
        .catch((err) => {
          console.log("Local foi apagado");
          console.log(err);
          localStorage.clear();
          dispatch(setTokenThunk(""));
        });
    } else {
      dispatch(setTokenThunk(""));
      if (URL_AUTHORIZED.includes(location.pathname)) {
        history.push("/");
      }
      if (location.pathname.includes("/users")) {
        history.push("/");
      }
    }
  }, [location.pathname]);

  if (isAuthorized) {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/user-registration">
          <UserRegistration />
        </Route>
        <Route exact path="/users/:perPage/:page">
          <Users />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/technologies">
          <Technologies />
        </Route>
        <Route>
          <div>Não existe esta página</div>
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/user-registration">
        <UserRegistration />
      </Route>
      <Route exact path="/unauthorized-users">
        <UnauthorizedUsers />
      </Route>
      <Route>
        <div>Não existe esta página</div>
      </Route>
    </Switch>
  );
};

export default MainRoutes;
