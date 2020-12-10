import { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import DevCard from "../devCard";

const lorem = "lorem ipsum";

const devInfo = [
  {
    name: "Amanda",
    img: "./images/fotos-dev/Amanda.jpg",
    bio: "Linguista apaixonada por comunicação, estudando a linguagem das máquinas.",
    title: "Quality Assurance",
    linkedin: "https://www.linkedin.com/in/amanda-gon%C3%A7alves-6a9a82a3/",
    github: "https://gitlab.com/amandapergon",
    email: "amandapergon@gmail.com",
  },
  {
    name: "Davi",
    img: "./images/fotos-dev/Davi.jpg",
    bio: lorem,
    title: "Scrum Master",
    linkedin: "https://www.linkedin.com/in/davi-andrade-2366661a7/",
    github: "https://gitlab.com/davi_coffee",
    email: "davi.coffe01@gmail.com",
  },
  {
    name: "Fernando",
    img: "./images/fotos-dev/Fernando.jpg",
    bio: lorem,
    title: "Tech Leader",
    linkedin: "https://www.linkedin.com/in/fernando-l-santos/",
    github: "https://github.com/fernandochi",
    email: "fernandosantos511@yahoo.com.br",
  },
  {
    name: "Klebson",
    img: "./images/fotos-dev/Klebson.jpg",
    bio: lorem,
    title: "Desenvolvedor",
    linkedin: " https://www.linkedin.com/in/klebsonferreira",
    github: "https://gitlab.com/klebsonFerreira",
    email: "klebsonllopes@gmail.com",
  },
  {
    name: "Lucas",
    img: "./images/fotos-dev/Lucas.jpg",
    bio: lorem,
    title: "Product Owner",
    linkedin: "https://www.linkedin.com/in/lucasfsilva2310/",
    github: "https://github.com/lucasfsilva2310",
    email: " lucasfsilva2310@gmail.com",
  },
];

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
