import { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import DevCard from "../devCard";

import devInfo from "./aboutUs";

const AboutUs = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
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
