import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import tryLoginThunk from "../../store/modules/userLogged/thunks";

import CardUserWork from "../../components/cardUserWork";

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

const Portfolio = () => {
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [errorWork, setErrorWork] = useState(false);

  const onFinish = (values) => {
    axios
      .post(
        "https://kenziehub.me/users/works",
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
            setErrorWork(false);
          });
      })
      .catch((err) => setErrorWork(true));
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
          <h1>Adicione uma nova Profissão</h1>
          <Form.Item
            name="title"
            label="Título"
            rules={[
              {
                required: true,
                message: "Por favor, insira um título para o trabalho.",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              {
                required: true,
                message: "Por favor, insira uma descrição para o trabalho.",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="deploy_url"
            label="Deploy URL"
            rules={[
              {
                required: true,
                message: "Por favor, insira a URL do trabalho.",
                whitespace: true,
              },
              {
                type: "url",
                message: "Insira uma forma de URL válida.",
              },
            ]}
          >
            <Input placeholder="https://kenziehub.me" />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Tech
            </Button>
          </Form.Item>
        </Form>
        <div></div>
        {errorWork && (
          <p style={{ color: "red" }}>Houve algum erro de requisição.</p>
        )}
        <Card>
          <h2>Profissões Cadastradas</h2>
        </Card>
        {!!userLogged.works &&
          userLogged.works.map((work, index) => (
            <CardUserWork work={work} key={index} />
          ))}
      </motion.div>
    </>
  );
};

export default Portfolio;
