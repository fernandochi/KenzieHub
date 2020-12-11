import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [errorRegister, setErrorRegister] = useState(undefined);
  const [isImgAvailable, setImg] = useState(undefined);

  const dispatch = useDispatch();
  const { register } = useForm({});
  const [form] = Form.useForm();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    dispatch(tryLoginThunk(user));
  }, []);

  const handleAvatar = (ev) => {
    ev.preventDefault();

    const data = new FormData();

    if (ev.target.files[0].name.includes(" ")) {
      setImg(false);
      return;
    }

    data.append("avatar", ev.target.files[0]);

    axios
      .patch("https://kenziehub.me/users/avatar1", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(tryLoginThunk(res.data));
        setImg(true);
      })
      .catch((err) => setImg(false));
  };

  const handleForm = (data) => {
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
        window.localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(tryLoginThunk(res.data));
        setErrorRegister(true);
      })
      .catch((err) => {
        setErrorRegister(false);
      });
  };
  return (
    <>
      <div>
        {errorRegister && <span>Dados Atualizados!</span>}
        {errorRegister === false && <span>Erro</span>}
      </div>
      <Form
        {...formItemLayout}
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
