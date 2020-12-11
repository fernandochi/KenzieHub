import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Profile from "../pages/profile";
import Login from "../pages/login";
import Technologies from "../pages/technologies";
import UserRegistration from "../pages/userRegistration";
import Users from "../pages/users";
import UsersList from "../pages/usersList";
import HomePage from "../pages/homePage";
import Portfolio from "../pages/portfolio";

import { useDispatch, useSelector } from "react-redux";
import { isTokenThunk } from "../store/modules/token/thunks";

const URL_AUTHORIZED = ["/profile", "/portfolio", "/technologies"];

const MainRoutes = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.booleanToken);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(location.pathname);
    if (token) {
      axios
        .get("https://kenziehub.me/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          dispatch(isTokenThunk(true));
        })
        .catch(() => {
          localStorage.clear();
          dispatch(isTokenThunk(false));
        });
    } else {
      dispatch(isTokenThunk(false));
      if (URL_AUTHORIZED.includes(location.pathname)) {
        history.push("/");
      }
      if (location.pathname.includes("/users/")) {
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
      <Route exact path="/users-list">
        <UsersList />
      </Route>
    </Switch>
  );
};

export default MainRoutes;
