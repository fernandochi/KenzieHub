import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

const { Option } = Select;

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
  const [createdAccount, setCreatedAccount] = useState(undefined);

  const formRef = React.createRef();
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    axios
      .post("https://kenziehub.me/users", { ...values })
      .then((res) => {
        history.push("/login");
      })
      .catch((res) => {
        setCreatedAccount(false);
      });
  };

  const onCourseChange = (value) => {
    switch (value) {
      case "first":
        formRef.current.setFieldsValue({
          course_module: "Primeiro módulo (Introdução ao Frontend)",
        });
        return;
      case "second":
        formRef.current.setFieldsValue({
          course_module: "Segundo módulo (Frontend Avançado)",
        });
        return;
      case "three":
        formRef.current.setFieldsValue({
          course_module: "Terceiro módulo (Introdução ao Backend)",
        });
        return;
      case "four":
        formRef.current.setFieldsValue({
          course_module: "Quarto módulo (Backend Avançado)",
        });
        return;
      default:
        return;
    }
  };

  return (
    <>
      <motion.div animate={{ scale: 0.99 }} transition={{ duration: 1 }}>
        <Form
          ref={formRef}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <h1>Faça seu Cadastro</h1>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome.",
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
                message: "Por favor, insira seu e-mail.",
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
                message: "Por favor, insira sua senha!",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar Senha"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor, confirme sua senha!",
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
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="contact"
            label="LinkedIn"
            rules={[
              {
                required: true,
                message: "Por favor, insira o link do seu perfil LinkedIn",
              },
              {
                type: "url",
                message: "Insira uma forma de contato válida.",
              },
            ]}
          >
            <Input placeholder="https://www.linkedin.com/in/usuario/" />
          </Form.Item>

          <Form.Item
            name="course_module"
            label="Módulo do Curso"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o módulo que você está cursando",
              },
            ]}
          >
            <Select
              placeholder="Selecione uma opção"
              onChange={onCourseChange}
              allowClear
            >
              <Option value="first">
                Primeiro módulo (Introdução ao Frontend)
              </Option>
              <Option value="second">Segundo módulo (Frontend Avançado)</Option>
              <Option value="three">
                Terceiro módulo (Introdução ao Backend)
              </Option>
              <Option value="four">Quarto módulo (Backend Avançado)</Option>
            </Select>
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
            {createdAccount && "Conta criada"}
            {createdAccount === false && "Não foi possível criar sua conta"}
          </h5>
        </Form>
      </motion.div>
    </>
  );
};

export default UserRegistration;
