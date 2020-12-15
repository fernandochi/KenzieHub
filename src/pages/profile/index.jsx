import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import tryLoginThunk from "../../store/modules/userLogged/thunks";
import CardUser from "../../components/cardUser";

import axios from "axios";
import { useHistory } from "react-router-dom";

import "./styles.css";

import { Form, Input, Button, Select, message, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

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
  message.success("Dados Atualizados");
};

const error = (err) => {
  message.error("Erro: " + err);
};

const Profile = () => {
  const [errorRegister, setErrorRegister] = useState(undefined);
  const [isImgAvailable, setImg] = useState(undefined);

  const dispatch = useDispatch();
  const { register } = useForm({});

  const formRef = React.createRef();
  const [form] = Form.useForm();
  const history = useHistory();

  const token = useSelector((state) => state.token);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAvatar = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    // console.log(ev);

    // if (!ev.target.files) {
    //   console.log(ev.target.files);
    //   if (ev.target.files[0].name.includes(" ") || !!!ev.target.files[0].name) {
    //     console.log(ev.target.files[0]);
    //     setImg(false);
    //     return;
    //   }
    // }

    data.append("avatar", ev.target.files[0]);
    console.log(ev);
    axios
      .patch("https://kenziehub.me/users/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(tryLoginThunk(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        success();
      })
      .catch((err) => error(err.message));
  };

  const handleForm = (data) => {
    const isPassword = data.password;
    console.log(data);
    axios
      .put(
        "https://kenziehub.me/profile",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(tryLoginThunk(res.data));
        setErrorRegister(true);
        success();

        if (!!isPassword) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          history.push("/login");
        }
      })
      .catch((err) => {
        setErrorRegister(false);
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
      {/* <div>
        {errorRegister && <span>Dados Atualizados!</span>}
        {errorRegister === false && <span>Erro</span>}
      </div> */}
      <div>
        <CardUser userList={user} out />

        <Form
          style={{ textAlign: "left" }}
          ref={formRef}
          {...formItemLayout}
          onFinish={handleForm}
          form={form}
          name="register"
          scrollToFirstError
        >
          <Title
            style={{ marginLeft: "33%", padding: 15, paddingLeft: 0 }}
            level={3}
          >
            Mudar dados
          </Title>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder={user.name} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Insira um e-mail válido!",
              },
              {
                required: false,
              },
            ]}
          >
            <Input autoComplete="username" placeholder={user.email} />
          </Form.Item>
          <Form.Item
            name="course_module"
            label="Módulo do Curso"
            rules={[
              {
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
            <Input.TextArea placeholder={user.bio} />
          </Form.Item>
          <Form.Item
            name="contact"
            label="LinkedIn"
            rules={[
              {
                required: false,
              },
              {
                type: "url",
                message: "Insira uma forma de contato válida!",
              },
            ]}
          >
            <Input placeholder={user.contact} />
          </Form.Item>
          <Form.Item
            name="old_password"
            label="Senha Antiga"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Nova Senha"
            rules={[
              {
                required: false,
                min: 6,
                message: "É necessário no mínimo 6 caracteres!",
              },
              {
                pattern: /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
                message: "Mínimo 1 caracter especial.",
              },
              {
                pattern: /^((?=.*[A-Z]){1}).*$/,
                message: "Mínimo 1 caracter maiúscula.",
              },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Atualizar Dados
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Form
          // ref={formRef}
          {...formItemLayout}
          // form={form}
          name="avatarRegister"
        >
          <Title
            style={{ marginLeft: "33%", padding: 5, paddingLeft: 0 }}
            level={3}
          >
            Novo Avatar
          </Title>
          <Form.Item label="Novo Avatar">
            <input
              className="inputfile"
              id="avatar"
              name="avatar"
              // ref={register}
              type="file"
              onChange={handleAvatar}
            ></input>
            {/* {isImgAvailable === false && <Space>{error()}</Space>} */}
            {/* {isImgAvailable === true && <Space>{success()}</Space>} */}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Profile;
