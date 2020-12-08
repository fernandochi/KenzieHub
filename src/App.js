import { Link } from "react-router-dom";
import Router from "./router";

const App = () => {
  return (
    <div>
      Hello world!
      <Link to="/login">Login </Link>
      <Link to="/user-registration">Cadastro</Link>
      <Link to="/user-list">Usuários cadastrados</Link>
      <Router />
    </div>
  );
};

export default App;
