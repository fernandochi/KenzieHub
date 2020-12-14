import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const Error404 = () => {
  const history = useHistory();

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você visitou não existe."
      extra={
        <Button type="primary" onClick={(evt) => handleClick(evt)}>
          Voltar para Home
        </Button>
      }
    />
  );
};

export default Error404;
