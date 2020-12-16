import { Modal, Button } from "antd";
import { useState } from "react";
// import { RightColorButtons } from "./styles";

const ProjectDetails = () => {
  const [visible, setVisible] = useState(false);
  function info() {
    Modal.info({
      title: "Sobre o Projeto",
      content: (
        <div>
          <p>
            O <b>KenzieHub</b> é uma rede social para desenvolvedores. Aqui você
            encontra profissionais e as informações sobre suas carreiras.
          </p>
        </div>
      ),
      onOk() {},
    });
  }
  return (
    <>
      <Button type="primary" onClick={info}>
        Sobre o projeto
      </Button>
      <Modal
        title="Sobre o Projeto"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>
          O <b>KenzieHub</b> é uma rede social para desenvolvedores. Aqui você
          encontra profissionais e as informações sobre suas carreiras.
        </p>
      </Modal>
    </>
  );
};

export default ProjectDetails;
