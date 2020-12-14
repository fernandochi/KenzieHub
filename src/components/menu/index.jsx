import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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

  useEffect(() => {
    if (pathname.includes("/unauthorized-users")) {
      setCurrent("/unauthorized-users/10/1");
    } else if (pathname.includes("/users")) {
      setCurrent("/users/10/1");
    } else {
      setCurrent(pathname);
    }
  }, [pathname]);

  const handleClick = (evt) => {
    if (evt.key === "logout") {
      localStorage.clear();
      setCurrent("/");
      return history.push("/");
    }
    setCurrent(evt.key);
    history.push(evt.key);
  };

  if (!!token) {
    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
        <Menu.Item key="/users/10/1" icon={<ContactsOutlined />}>
          Lista de usuários
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<UserOutlined />} title="Usuário">
          <Menu.Item key="/profile">Profile</Menu.Item>
          <Menu.Item key="/portfolio">Portfólio</Menu.Item>
          <Menu.Item key="/technologies">Tecnologia</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/" icon={<HomeOutlined />}>
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
