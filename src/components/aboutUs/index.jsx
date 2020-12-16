import { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import DevCard from "../devCard";

import devInfo from "./aboutUs";

const AboutUs = () => {
  const [visible, setVisible] = useState(false);

  function info() {
    Modal.info({
      title: "Sobre os devs",
      content: (
        <Carousel autoplay>
          {devInfo.map(
            ({ name, img, title, bio, linkedin, github, email }, idx) => {
              return (
                <DevCard
                  key={idx}
                  name={name}
                  img={img}
                  title={title}
                  bio={bio}
                  linkedin={linkedin}
                  github={github}
                  email={email}
                />
              );
            }
          )}
        </Carousel>
      ),
      onOk() {},
    });
  }

  return (
    <>
      <Button type="primary" onClick={info}>
        Sobre os Devs
      </Button>
      <Modal
        title="Integrantes do Projeto"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={350}
      >
        <Carousel autoplay>
          {devInfo.map(
            ({ name, img, title, bio, linkedin, github, email }, idx) => {
              return (
                <DevCard
                  key={idx}
                  name={name}
                  img={img}
                  title={title}
                  bio={bio}
                  linkedin={linkedin}
                  github={github}
                  email={email}
                />
              );
            }
          )}
        </Carousel>
      </Modal>
    </>
  );
};

export default AboutUs;
