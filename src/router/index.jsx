import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../components/profile";
import Login from "../components/login";
import Technologies from "../components/technologies";
import UserRegistration from "../components/userRegistration";
import Portifolio from "../components/portfolio";
import Users from "../components/users";
import UsersList from "../components/usersList";

const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/portifolio">
        <Portifolio />
      </Route>
      <Route path="/technologies">
        <Technologies />
      </Route>
      <Route path="/user-registration">
        <UserRegistration />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/users-list">
        <UsersList />
      </Route>
    </Switch>
  );
};

export default MainRoutes;
