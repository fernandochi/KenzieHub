import { Link } from "react-router-dom";
import Router from "./router";
import { MainPageLayout } from "./styles";
import logo from "./images/kenzie_logo.png";
import ProjectDetails from "./components/projectDetails";
import AboutUs from "./components/aboutUs";

const App = () => {
  return (
    <MainPageLayout>
      <header>
        <Link to="/login">Login </Link>
        <Link to="/user-registration">Cadastro</Link>
        <Link to="/users-list">Usuários cadastrados</Link>
      </header>
      <h1>KenzieHub</h1>
      <br />
      <img src={logo} alt="Kenzie Logo" width="100px" height="100px" />
      <Router />
      <footer>
        <ProjectDetails />
        <AboutUs />
      </footer>
    </MainPageLayout>
  );
};

export default App;
