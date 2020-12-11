import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import tryLoginThunk from "../../store/modules/login/thunks";

import { Form, Input, Button } from "antd";

//verificar state global \/
import { useSelector } from "react-redux";

import { isTokenThunk } from "../../store/modules/token/thunks";

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

const Login_form = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //verificar state global \/
  const usertest = useSelector((state) => state.user);
  const token = useSelector((state) => state.booleanToken);

  useEffect(() => {
    // const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }
    if (token) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      dispatch(tryLoginThunk(user));
      history.push("/profile");
    }
    //verificar state global \/
    console.log(usertest);
  }, []);

  const schema = yup.object().shape({
    email: yup.string().required("Campo necessário."),
    password: yup.string().required("Campo necessário."),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [isAuthenticated, setAuthentication] = useState(undefined);

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
  //antd
  const [form] = Form.useForm();

  return (
    <div>
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
              message: "Por favor insira seu e-mail.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <label>Email</label>
        <input name="email" ref={register}></input>
        {errors.email?.message} */}
        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: "Por favor insira sua senha.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* <label>Senha</label>
        <input name="password" ref={register}></input>
        {errors.password?.message} */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        {isAuthenticated === false ? (
          <span>Login ou senha inválidos.</span>
        ) : (
          <span> </span>
        )}
        {/* <button type="submit">Entrar</button> */}
      </Form>
    </div>
  );
};

export default Login_form;
