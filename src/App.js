import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import UserRegistration from "./components/userRegistration";
import UsersList from "./components/usersList";
const App = () => {
  return (
    <div>
      Hello world!
      <Link to="/login">Login </Link>
      <Link to="/user-registration">Cadastro</Link>
      <Link to="/user-list">Usuários cadastrados</Link>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/user-registration">
          <UserRegistration />
        </Route>
        <Route exact path="/user-list">
          <UsersList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
