import React from "react";
import { Form, Input, Button, Select, Card } from "antd";
import { useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import tryLoginThunk from "../../store/modules/userLogged/thunks";

import CardUserTech from "../../components/cardUserTech/index";

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

const Technologies = () => {
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [errorTech, setErrorTech] = useState(false);

  const onNivelChange = (value) => {
    switch (value) {
      case "novice":
        formRef.current.setFieldsValue({
          status: "Iniciante",
        });
        return;
      case "intermediate":
        formRef.current.setFieldsValue({
          status: "Intermediário",
        });
        return;
      case "advanced":
        formRef.current.setFieldsValue({
          status: "Avançado",
        });
        return;
      default:
        return;
    }
  };

  const onFinish = (values) => {
    axios
      .post(
        "https://kenziehub.me/users/techs",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        axios
          .get("https://kenziehub.me/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(tryLoginThunk(res.data));
            setErrorTech(false);
          });
      })
      .catch((err) => setErrorTech(true));
  };

  return (
    <>
      <Form
        ref={formRef}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <h1 style={{ textAlign: "center" }}>Adicione uma nova Tecnologia</h1>
        <Form.Item
          name="title"
          label="Tecnologia"
          rules={[
            {
              required: true,
              message: "Por favor, insira uma tecnologia.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Nível"
          rules={[
            {
              required: true,
              message:
                "Por favor, selecione o nível que você possui nessa tecnologia.",
            },
          ]}
        >
          <Select
            placeholder="Selecione uma opção"
            onChange={onNivelChange}
            allowClear
          >
            <Option value="novice">Iniciante</Option>
            <Option value="intermediate">Intermediário</Option>
            <Option value="advanced">Avançado</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Tech
          </Button>
        </Form.Item>
      </Form>
      {errorTech && (
        <p style={{ color: "red" }}>Já foi adicionado essa tecnologia.</p>
      )}

      <Card>
        <h2 style={{ textAlign: "center" }}>Tecnologias Cadastradas</h2>
      </Card>
      {!!userLogged.techs &&
        userLogged.techs.map((tech, index) => (
          <CardUserTech tech={tech} key={index} />
        ))}
    </>
  );
};

export default Technologies;
