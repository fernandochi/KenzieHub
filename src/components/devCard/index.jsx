import { Card, Avatar } from "antd";

const DevCard = ({ name, img, title, bio, key, linkedin, github, email }) => {
  const { Meta } = Card;
  return (
    <Card
      key={key}
      style={{ width: 300 }}
      cover={<img alt={`${name} foto`} src={img} style={{ width: "100%" }} />}
      actions={[
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <p>Linkedin</p>
        </a>,
        <a href={github} target="_blank" rel="noopener noreferrer">
          <p>Repositório</p>
        </a>,
        <a href={`mailto:${email}`}>
          <p>E-mail</p>
        </a>,
      ]}
      extra={title}
    >
      <Meta avatar={<Avatar src={img} />} title={name} description={bio} />
    </Card>
  );
};

export default DevCard;
