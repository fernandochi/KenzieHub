import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import tryLoginThunk from "../../store/modules/login/thunks";
import axios from "axios";

import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 14,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 14,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [isAuthenticated, setAuthentication] = useState(undefined);
  const [isImgAvailable, setImg] = useState(undefined);

  useEffect(() => {
    if (!token) {
      history.push("/");
      return;
    }
    const user = JSON.parse(window.localStorage.getItem("user"));
    dispatch(tryLoginThunk(user));
  }, []);

  const { register } = useForm({});

  //Processa o avatar para a URL
  const handleAvatar = (ev) => {
    ev.preventDefault();

    const data = new FormData();

    if (ev.target.files[0].name.includes(" ")) {
      console.log(ev.target.files[0].name);
      setImg(false);
      return;
    }

    data.append("avatar", ev.target.files[0]);

    axios
      .patch("https://kenziehub.me/users/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(tryLoginThunk(res.data));
        setImg(true);
        setImg(true);
      })
      .catch((err) => setImg(false));
  };

  //antd
  const [form] = Form.useForm();

  //Processa qualquer dado inserido para a API
  const handleForm = (data) => {
    const token = window.localStorage.getItem("token");
    axios
      .put(
        "https://kenziehub.me/profile",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(tryLoginThunk(res.data));
        setAuthentication(true);
      })
      .catch((err) => {
        console.log(err);
        setAuthentication(false);
      });
  };
  return (
    <>
      <div>
        {isAuthenticated === true && <span>Dados Atualizados!</span>}
        {isAuthenticated === false && <span>Erro</span>}
      </div>
      <Form
        onFinish={handleForm}
        form={form}
        name="register"
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: false,
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Insira um e-mail válido!",
            },
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="course_module"
          label="Módulo do curso"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="bio" label="Sobre mim">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="contact"
          label="LinkedIn"
          rules={[
            {
              required: false,
            },
            {
              type: "url",
              message: "Insira uma forma de contato válida!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="old_password"
          label="Senha Antiga"
          rules={[
            {
              required: false,
              // colocar comparativo de senha antiga
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="Nova Senha"
          rules={[
            {
              required: false,
              min: 6,
              message: "É necessário no mínimo 6 caracteres!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Atualizar Dados
          </Button>
        </Form.Item>
      </Form>
      <form>
        <label>Novo Avatar</label>
        <input
          type="file"
          ref={register}
          name="avatar"
          id="avatar"
          onChange={handleAvatar}
        ></input>
        {/*usar botao para atualizar o avatar, nao atualizar sozinho?*/}
        {isImgAvailable === false && (
          <>
            <br />
            <span>O nome da imagem nao deve conter espaços!</span>
          </>
        )}
        {isImgAvailable === true && (
          <>
            <br />
            <span>Dados Atualizados!</span>
          </>
        )}
      </form>
    </>
  );
};

export default Profile;
