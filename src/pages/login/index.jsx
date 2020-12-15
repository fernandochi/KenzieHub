import { Form, Input, Button } from "antd";

import axios from "axios";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTokenThunk } from "../../store/modules/token/thunks";
import tryLoginThunk from "../../store/modules/userLogged/thunks";

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

const Login = () => {
  const [isAuthenticated, setAuthentication] = useState(undefined);

  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const tryLogin = (data) => {
    axios
      .post("https://kenziehub.me/sessions", { ...data })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(tryLoginThunk(res.data.user));
        dispatch(setTokenThunk(res.data.token));
        history.push("/profile");
      })
      .catch((err) => setAuthentication(false));
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={tryLogin}
      scrollToFirstError
      className="centerForm"
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Insira um e-mail válido!",
          },
          {
            required: true,
            message: "Por favor, insira seu e-mail.",
            whitespace: true,
          },
        ]}
      >
        <Input autoComplete="username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Senha"
        rules={[
          {
            required: true,
            message: "Por favor, insira sua senha.",
          },
        ]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      {isAuthenticated === false && <span>Login ou senha inválidos.</span>}
    </Form>
  );
};

export default Login;
