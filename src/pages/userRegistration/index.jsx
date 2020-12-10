import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

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

const UserRegistration = () => {
  const [form] = Form.useForm();

  const history = useHistory();

  const [createdAccount, setCreatedAccount] = useState(undefined);

  const onFinish = (values) => {
    console.log("Valores recebidos do formulario: ", values);

    axios
      .post("https://kenziehub.me/users", { ...values })
      .then((res) => {
        history.push("/login");
        console.log(res);
      })
      .catch((res) => {
        setCreatedAccount(false);
        console.log(res);
      });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Nome"
        rules={[
          {
            required: true,
            message: "Por favor insira seu nome.",
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
            message: "Insira um e-mail valido!",
          },
          {
            required: true,
            message: "Por favor insira seu e-mail.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Senha"
        rules={[
          {
            required: true,
            message: "Por favor insira sua senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password"
        label="Confirmar Senha"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor confirme sua senha!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("As senhas devem ser iguais.");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="contact"
        label="LinkedIn"
        rules={[
          {
            required: true,
            message: "Por favor insira o link do seu perfil LinkedIn",
          },
          {
            type: "url",
            message: "Insira uma forma de contato válida.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="course_module"
        label="Modulo do Curso"
        rules={[
          {
            required: true,
            message:
              "Por favor informe em qual modulo você esta cursando neste momento, ex: Segundo Módulo (Front-end avançado) ou Q2.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="bio" label="Sobre mim">
        <Input.TextArea />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <h5>
        {createdAccount === true ? "Conta criada" : ""}
        {createdAccount === false ? "Não foi possível criar sua conta" : ""}
      </h5>
    </Form>
  );
};

export default UserRegistration;
