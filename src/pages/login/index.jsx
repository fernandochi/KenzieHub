import { Form, Input, Button } from "antd";

import axios from "axios";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isTokenThunk } from "../../store/modules/token/thunks";
import tryLoginThunk from "../../store/modules/login/thunks";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 7,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 7,
    },
    sm: {
      span: 5,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 4,
    },
  },
};

const Login = () => {
  const [isAuthenticated, setAuthentication] = useState(undefined);
  const token = useSelector((state) => state.booleanToken);

  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!token) {
      return;
    }
    const user = JSON.parse(window.localStorage.getItem("user"));
    dispatch(tryLoginThunk(user));
    history.push("/profile");
  }, [history, dispatch, token]);

  const tryLogin = (data) => {
    axios
      .post("https://kenziehub.me/sessions", { ...data })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(tryLoginThunk(res.data.user));
        dispatch(isTokenThunk(true));
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
    >
      <Form.Item
        name="email"
        label="E-Mail"
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
          Register
        </Button>
      </Form.Item>
      {isAuthenticated === false && <span>Login ou senha inválidos.</span>}
    </Form>
  );
};

export default Login;
