import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTokenThunk } from "../../store/modules/token/thunks";
import { Menu } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const MainMenu = () => {
  const [current, setCurrent] = useState("/");
  const token = useSelector((state) => state.token);

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.includes("/unauthorized-users")) {
      setCurrent("/unauthorized-users/10/1");
    } else if (pathname.includes("/users")) {
      setCurrent("/users/10/1");
    } else if (pathname === "/") {
      setCurrent("menu");
    } else {
      setCurrent(pathname);
    }
  }, [pathname, token]);

  const handleClick = (evt) => {
    if (evt.key === "logout") {
      console.log("aqui");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrent("menu");
      dispatch(setTokenThunk(""));
      return history.push("/");
    } else if (evt.key === "menu") {
      setCurrent("menu");
      return history.push("/");
    }
    setCurrent(evt.key);
    history.push(evt.key);
  };

  if (!!token) {
    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="menu" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>

        <SubMenu
          key="SubMenu"
          icon={<ContactsOutlined />}
          title="Desenvolvedores"
        >
          <Menu.Item key="/users/10/1">Lista de desenvolvedores</Menu.Item>
          <Menu.Item key="/favorites-users">
            Desenvolvedores favoritos
          </Menu.Item>
        </SubMenu>

        <SubMenu key="personal" icon={<UserOutlined />} title="Usuário">
          <Menu.Item key="/profile">Profile</Menu.Item>
          <Menu.Item key="/portfolio">Portfólio</Menu.Item>
          <Menu.Item key="/technologies">Tecnologia</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="menu" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="/login" icon={<LoginOutlined />}>
        Login
      </Menu.Item>

      <Menu.Item key="/user-registration" icon={<FileDoneOutlined />}>
        Cadastro
      </Menu.Item>

      <Menu.Item key="/unauthorized-users/10/1" icon={<ContactsOutlined />}>
        Usuários
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;
