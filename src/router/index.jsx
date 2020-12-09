import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../pages/profile";
import Login from "../pages/login";
import Technologies from "../pages/technologies";
import UserRegistration from "../pages/userRegistration";
import Portifolio from "../pages/portfolio";
import Users from "../pages/users";
import UsersList from "../pages/usersList";
import HomePage from "../pages/homePage";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
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
      <Route exact path="/users">
        <Users />
      </Route>
      <Route exact path="/users-list">
        <UsersList />
      </Route>
    </Switch>
  );
};

export default MainRoutes;
