import { MainPageLayout } from "./styles";

import ProjectDetails from "../../components/projectDetails";
import AboutUs from "../../components/aboutUs";

const HomePage = () => {
  return (
    <MainPageLayout>
      <div>
        <h1>KenzieHub</h1>
        <img
          src="./images/kenzie_logo.png"
          alt="Kenzie Academy logo"
          width="250px"
        />
      </div>
      <footer>
        <ProjectDetails />
        <AboutUs />
      </footer>
    </MainPageLayout>
  );
};

export default HomePage;
