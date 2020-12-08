import { Link } from "react-router-dom";
<<<<<<< HEAD
import Menu from "./components/menu";
import MainRoutes from "./router";

const App = () => {
  return (
    <>
      <Menu />
      <MainRoutes />
    </>
=======
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
>>>>>>> 172f3ee3cc2e7b5a169737d083fca54721d9caa4
  );
};

export default App;
