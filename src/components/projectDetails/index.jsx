import { Modal, Button } from "antd";
import { useState } from "react";

const ProjectDetails = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Sobre o projeto
      </Button>
      <Modal
        title="Integrantes do Projeto"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, quasi.
          A, enim accusamus! Reprehenderit ullam beatae facilis excepturi
          molestias et autem, commodi, molestiae eius qui hic quasi! Eius,
          doloribus voluptate.
        </p>
      </Modal>
    </>
  );
};

export default ProjectDetails;
