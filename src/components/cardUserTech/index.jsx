import React from "react";
import axios from "axios";
import { Form, Input, Button, Select, Card, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../pages/styles/antd.css";
import "../../pages/styles/form.css";
import "../../pages/styles/wholePage.css";

import tryLoginThunk from "../../store/modules/userLogged/thunks";

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

const success = (mess) => {
  message.success(mess);
};

const error = (err) => {
  message.error("Erro: " + err);
};

const CardUserTech = ({ tech }) => {
  const [clickUpdate, setClickUpdate] = useState(false);
  const token = useSelector((state) => state.token);

  const formRef = React.createRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onDelete = (event, id) => {
    axios
      .delete(`https://kenziehub.me/users/techs/${id}`, {
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
            success("Tecnologia deletada com sucesso! ");
          });
      })
      .catch((err) => error("não foi possível deletar! "));
  };

  const onUpdateChange = (value) => {
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

  const onFinish = (values, info) => {
    axios
      .put(
        `https://kenziehub.me/users/techs/${info.id}`,
        { status: values.status },
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
            success("Tecnologia atualizada com sucesso!");
          });
      })
      .catch((err) => {
        setClickUpdate(false);
        error("não foi possível atualizar!");
      });
  };

  return (
    <Card title={tech.title}>
      <Card type="inner" key={tech.id}>
        <span>Nível: {tech.status}</span>
      </Card>
      <Card>
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
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={(evt) => onFinish(evt, { id: tech.id })}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="Tecnologia"
              initialValue={tech.title}
              rules={[
                {
                  required: true,
                  message: "Por favor, insira uma tecnologia.",
                  whitespace: true,
                },
              ]}
            >
              <Input value={tech.title} disabled />
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
                onChange={onUpdateChange}
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
        </Modal>
      </Card>
      <Button
        onClick={(evt) => onDelete(evt, tech.id)}
        type="default"
        htmlType="submit"
      >
        <DeleteOutlined />
      </Button>
      <br />
    </Card>
  );
};

export default CardUserTech;
