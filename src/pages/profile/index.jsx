import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import tryLoginThunk from "../../store/modules/userLogged/thunks";
import CardUser from "../../components/cardUser";

import axios from "axios";

import { Form, Input, Button, Select } from "antd";

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

const Profile = () => {
  const [errorRegister, setErrorRegister] = useState(undefined);
  const [isImgAvailable, setImg] = useState(undefined);

  const dispatch = useDispatch();
  const { register } = useForm({});

  const formRef = React.createRef();
  const [form] = Form.useForm();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const handleAvatar = (ev) => {
    ev.preventDefault();

    const data = new FormData();

    if (ev.target.files[0].name.includes(" ")) {
      setImg(false);
      return;
    }

    data.append("avatar", ev.target.files[0]);

    axios
      .patch("https://kenziehub.me/users/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(tryLoginThunk(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        setImg(true);
      })
      .catch((err) => setImg(false));
  };

  const handleForm = (data) => {
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
      <div>
        {errorRegister && <span>Dados Atualizados!</span>}
        {errorRegister === false && <span>Erro</span>}
      </div>
      <div>
        <CardUser userList={user} out />

        <motion.div animate={{ scale: 0.99 }} transition={{ duration: 1 }}>
          <Form
            ref={formRef}
            {...formItemLayout}
            onFinish={handleForm}
            form={form}
            name="register"
            scrollToFirstError
          >
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
              <Input />
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
              <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
              name="course_module"
              label="Módulo do Curso"
              rules={[
                {
                  message:
                    "Por favor, selecione o módulo que você está cursando",
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
                <Option value="second">
                  Segundo módulo (Frontend Avançado)
                </Option>
                <Option value="three">
                  Terceiro módulo (Introdução ao Backend)
                </Option>
                <Option value="four">Quarto módulo (Backend Avançado)</Option>
              </Select>
            </Form.Item>
            <Form.Item name="bio" label="Sobre mim">
              <Input.TextArea />
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
              <Input />
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
        </motion.div>
      </div>
      <form>
        <label>Novo Avatar</label>
        <input
          type="file"
          ref={register}
          name="avatar"
          id="avatar"
          onChange={handleAvatar}
        ></input>
        {/*usar botao para atualizar o avatar, nao atualizar sozinho?*/}
        {isImgAvailable === false && (
          <>
            <br />
            <span>O nome da imagem nao deve conter espaços!</span>
          </>
        )}
        {isImgAvailable === true && (
          <>
            <br />
            <span>Dados Atualizados!</span>
          </>
        )}
      </form>
    </>
  );
};

export default Profile;
