import { Link } from "react-router-dom";
import Menu from "./components/menu";
import MainRoutes from "./router";

const App = () => {
  return (
    <>
      <Menu />
      <MainRoutes />
    </>
  );
};

export default App;
