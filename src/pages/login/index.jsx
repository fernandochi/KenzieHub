import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import tryLoginThunk from "../../store/modules/login/thunks";

//verificar state global \/
import { useSelector } from "react-redux";

import { isTokenThunk } from "../../store/modules/token/thunks";

const Login_form = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //verificar state global \/
  const usertest = useSelector((state) => state.user);
  const token = useSelector((state) => state.booleanToken);

  useEffect(() => {
    // const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }
    if (token) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      dispatch(tryLoginThunk(user));
      history.push("/profile");
    }
    //verificar state global \/
    console.log(usertest);
  }, []);

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
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(tryLoginThunk(res.data.user));
        dispatch(isTokenThunk(true));
        history.push("/profile");
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

export default Login_form;
