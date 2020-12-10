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

const UserRegistration = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Valores recebidos do formulario: ", values);
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
        label={<span>Nome&nbsp;</span>}
        rules={[
          {
            required: true,
            message: "Por favor insira seu Nome!",
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
            message: "Insira um E-mail valido!",
          },
          {
            required: true,
            message: "Por favor insira seu E-mail!",
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
            message: "Por favor insira sua Senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Senha"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor confirme a sua Senha!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "As duas senhas devem ser iguais - The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="linkedin"
        label="Linkedin"
        rules={[
          {
            required: true,
            message:
              "Por favor insira seu link de perfil do linkedin! É parecido com este: linkedin/in/johndoe",
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
              "Por favor informe em qual modulo você esta cursando neste momento, ex: Segundo Módulo (Frontend avançado) ou Q2",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserRegistration;
