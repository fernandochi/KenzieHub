import { MainPageLayout } from "./styles";

import ProjectDetails from "../../components/projectDetails";
import AboutUs from "../../components/aboutUs";
import Menu from "../../components/menu";

const HomePage = () => {
  return (
    <MainPageLayout>
      <h1>KenzieHub</h1>
      <br />
      <img
        src="./images/kenzie_logo.png"
        alt="Kenzie Academy logo"
        width="150px"
      />
      <footer>
        <ProjectDetails />
        <AboutUs />
      </footer>
    </MainPageLayout>
  );
};

export default HomePage;
