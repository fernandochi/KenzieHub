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

const MainRoutes = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.booleanToken);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://kenziehub.me/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          dispatch(isTokenThunk(true));
        })
        .catch(() => {
          dispatch(isTokenThunk(false));
        });
    } else {
      dispatch(isTokenThunk(false));
    }
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/user-registration">
        <UserRegistration />
      </Route>
      <Route exact path="/users-list">
        <UsersList />
      </Route>
      <Route
        exact
        path="/users/:perPage/:page"
        render={(props) =>
          isAuthorized ? (
            <Users {...props} />
          ) : (
            history.push("/user-registration")
          )
        }
      />
      <Route
        path="/profile"
        render={(props) =>
          isAuthorized ? (
            <Profile {...props} />
          ) : (
            history.push("/user-registration")
          )
        }
      />
      <Route
        path="/portfolio"
        render={(props) =>
          isAuthorized ? (
            <Portfolio {...props} />
          ) : (
            history.push("user-registration")
          )
        }
      />
      <Route
        path="/technologies"
        render={(props) =>
          isAuthorized ? (
            <Technologies {...props} />
          ) : (
            history.push("user-registrarion")
          )
        }
      />
    </Switch>
  );
};

export default MainRoutes;
