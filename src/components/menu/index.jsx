import { useHistory } from "react-router-dom";
import { MenuUl, MenuLi } from "./style";
import { useSelector } from "react-redux";

const Menu = () => {
  const token = useSelector((state) => state.booleanToken);
  const history = useHistory();

  const handleLogin = () => {
    if (token) {
      localStorage.clear();
      return history.push("/");
    }
    history.push("/login");
  };

  const handlUser = () => {
    if (token) {
      return history.push("/users/10/1");
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
            <MenuLi onClick={(event) => handlePath(event, "portfolio")}>
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
