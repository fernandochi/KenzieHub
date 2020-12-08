import { Link } from "react-router-dom";
import Router from "./router";
import { MainPageLayout } from "./styles";

import ProjectDetails from "./components/projectDetails";
import AboutUs from "./components/aboutUs";

const App = () => {

  const kenzieLogo = require ('./images/kenzie_logo.png'); 

  return (
    <MainPageLayout>
      <h1>KenzieHub</h1>
      <br/>
      <img
        src={kenzieLogo}
        alt="Kenzie Academy logo"
        width="150px"
      />
      <header>
        <Link to="/login">Login </Link>
        <Link to="/user-registration">Cadastro</Link>
        <Link to="/users-list">Usuários cadastrados</Link>
      </header>
      <Router />
      <footer>
        <ProjectDetails />
        <AboutUs />
      </footer>
    </MainPageLayout>
  );
};

export default App;
