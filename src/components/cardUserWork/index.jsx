import React from "react";
import axios from "axios";
import { Form, Input, Button, Card, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../pages/styles/antd.css";
import "../../pages/styles/form.css";
import "../../pages/styles/wholePage.css";

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

const success = (mess) => {
  message.success(mess);
};

const error = (err) => {
  message.error("Erro: " + err);
};

const CardUserWork = ({ work }) => {
  const [clickUpdate, setClickUpdate] = useState(false);
  const token = useSelector((state) => state.token);

  const formRef = React.createRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onDelete = (event, id) => {
    axios
      .delete(`https://kenziehub.me/users/works/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get("https://kenziehub.me/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(tryLoginThunk(res.data));
            setClickUpdate(false);
            success("Trabalho deletado com sucesso!");
          });
      })
      .catch((err) => error("não foi possível deletar o trabalho! "));
  };

  const onFinish = (values, info) => {
    const data = {};
    for (let key in values) {
      if (values[key]) {
        data[key] = values[key];
      }
    }
    axios
      .put(
        `https://kenziehub.me/users/works/${info.id}`,
        { ...data },
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
            setClickUpdate(false);
            success("Trabalho atualizado com sucesso!");
          });
      })
      .catch((err) => {
        setClickUpdate(false);
        error("não foi possível atualizar o trabalho!");
      });
  };

  return (
    <Card title={work.title}>
      <Card type="inner" key={work.id}>
        <span>Descrição: {work.description}</span>
      </Card>
      <Card type="inner">
        <span>Site: {work.deploy_url}</span>
      </Card>
      <Card style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={(evt) => setClickUpdate(!clickUpdate)}
          type="default"
          htmlType="submit"
        >
          Update
        </Button>
        <Modal
          title="Atualizar dados"
          visible={clickUpdate}
          onOk={() => setClickUpdate(!clickUpdate)}
          onCancel={() => setClickUpdate(!clickUpdate)}
        >
          <Form
            ref={formRef}
            initialValues=""
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={(evt) => onFinish(evt, { id: work.id })}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="Título"
              rules={[
                {
                  //   required: true,
                  message: "Por favor, insira um título para o trabalho.",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder={work.title} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                {
                  //   required: true,
                  message: "Por favor, insira uma descrição para o trabalho.",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea placeholder={work.description} />
            </Form.Item>

            <Form.Item
              name="deploy_url"
              label="Deploy URL"
              rules={[
                {
                  //   required: true,
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
                Atualizar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
      <Button
        onClick={(evt) => onDelete(evt, work.id)}
        type="default"
        htmlType="submit"
      >
        <DeleteOutlined />
      </Button>
      <br />
    </Card>
  );
};

export default CardUserWork;
