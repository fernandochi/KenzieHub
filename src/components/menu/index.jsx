import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MenuUl, MenuLi } from "./style";

const Menu = () => {
  const [token, setToken] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    if (getToken) {
    }
  }, [location.pathname]);
  const history = useHistory();

  const handleLogin = () => {
    if (token) {
      localStorage.clear();
      history.push("/login");
    }
    history.push("/login");
  };

  const handlUser = () => {
    if (token) {
      return history.push("/users");
    }
    history.push("/users-list");
  };

  const handlePath = (event, path) => {
    history.push(`/${path}`);
  };

  return (
    <div>
      <MenuUl>
        <MenuLi onClick={handleLogin}>{token ? "Logout" : "Login"}</MenuLi>
        <MenuLi onClick={(event) => handlePath(event, "user-registration")}>
          Cadastro
        </MenuLi>
        <MenuLi onClick={handlUser}>Usuários</MenuLi>
        {token && (
          <>
            <MenuLi onClick={(event) => handlePath(event, "profile")}>
              Edição de Perfil
            </MenuLi>
            <MenuLi onClick={(event) => handlePath(event, "portifolio")}>
              Portfólio
            </MenuLi>
            <MenuLi onClick={(event) => handlePath(event, "technologies")}>
              Tecnologias
            </MenuLi>
          </>
        )}
      </MenuUl>
    </div>
  );
};

export default Menu;
