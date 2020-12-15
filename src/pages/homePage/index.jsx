import { useHistory } from "react-router-dom";
import { MainPageLayout } from "./styles";

import ProjectDetails from "../../components/projectDetails";
import AboutUs from "../../components/aboutUs";
import { Button } from "antd";

const HomePage = () => {
  const history = useHistory();
  return (
    <MainPageLayout>
      <div>
        <h1>KenzieHub</h1>
        <img
          src="./images/ka-logo.jpg"
          alt="Kenzie Academy logo"
          width="250px"
        />

        <div>
          <Button type="primary" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button
            type="primary"
            onClick={() => history.push("/user-registration")}
          >
            Cadastrar
          </Button>
        </div>
      </div>
      <footer>
        <ProjectDetails />
        <AboutUs />
      </footer>
    </MainPageLayout>
  );
};

export default HomePage;
