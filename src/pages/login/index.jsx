import { Form, Input, Button, message } from "antd";

import axios from "axios";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTokenThunk } from "../../store/modules/token/thunks";
import tryLoginThunk from "../../store/modules/userLogged/thunks";

import { motion } from "framer-motion";

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

const success = () => {
  message.success("Login efetuado com sucesso!");
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
        success();
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(tryLoginThunk(res.data.user));
        dispatch(setTokenThunk(res.data.token));
        history.push("/profile");
      })
      .catch((err) => setAuthentication(false));
  };

  return (
    <motion.div animate={{ scale: 0.99 }} transition={{ duration: 1 }}>
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
            Login
          </Button>
        </Form.Item>
        {isAuthenticated === false && <span>Login ou senha inválidos.</span>}
      </Form>
    </motion.div>
  );
};

export default Login;
