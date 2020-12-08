import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().required("Campo necessário."),
    password: yup.string().required("Campo necessário."),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [isAuthenticated, setAuthentication] = useState(undefined);

  const tryLogin = (data) => {
    axios
      .post("https://kenziehub.me/sessions", { ...data })
      .then((res) => {
        // window.localStorage.setItem("token", res.data.token);
        // history.push para o perfil
        console.log(res);
      })
      .catch((err) => setAuthentication(false));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(tryLogin)}>
        <label>Email</label>
        <input name="email" ref={register}></input>
        {errors.email?.message}
        <label>Senha</label>
        <input name="password" ref={register}></input>
        {errors.password?.message}
        {isAuthenticated === false ? (
          <span>Login ou senha inválidos.</span>
        ) : (
          <span> </span>
        )}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
