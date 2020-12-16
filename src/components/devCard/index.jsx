import { Card, Avatar } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const DevCard = ({ name, img, title, bio, key, linkedin, github, email }) => {
  const { Meta } = Card;
  return (
    <Card
      key={key}
      style={{ width: 300 }}
      cover={<img alt={`${name} foto`} src={img} style={{ width: "100%" }} />}
      actions={[
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <p>
            <LinkedinOutlined />
            Linkedin
          </p>
        </a>,
        <a href={github} target="_blank" rel="noopener noreferrer">
          <p>
            <GithubOutlined /> Repositório
          </p>
        </a>,
        <a href={`mailto:${email}`}>
          <p>
            <MailOutlined />
            E-mail
          </p>
        </a>,
      ]}
      extra={title}
    >
      <Meta avatar={<Avatar src={img} />} title={name} description={bio} />
    </Card>
  );
};

export default DevCard;
