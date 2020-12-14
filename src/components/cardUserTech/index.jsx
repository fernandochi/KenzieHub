import React from "react";
import axios from "axios";
import { Form, Input, Button, Select } from "antd";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
          });
      })
      .catch((err) => console.log(err));
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
          });
      })
      .catch((err) => {
        setClickUpdate(false);
      });
  };

  return (
    <div>
      <div key={tech.id}>
        <span>{tech.title}</span>
      </div>
      <div>
        <span>{tech.status}</span>
        <button onClick={(evt) => setClickUpdate(!clickUpdate)}>Update</button>
        {clickUpdate && (
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
        )}
      </div>
      <button onClick={(evt) => onDelete(evt, tech.id)}>Deletar</button>
      <br />
    </div>
  );
};

export default CardUserTech;
