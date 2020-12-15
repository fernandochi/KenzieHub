import { Card, Avatar, Carousel } from "antd";
import { useState } from "react";

const { Meta } = Card;

const tabList = [
  {
    key: "Works",
    tab: "Works",
  },
  {
    key: "Techs",
    tab: "Techs",
  },
];

const CardUser = ({ userList, out = false }) => {
  const [key, setKey] = useState("Works");

  const contentList = {
    Works: (
      <Carousel autoplay>
        {userList.works.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>
                <a
                  href={item.deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </p>
            </div>
          );
        })}
      </Carousel>
    ),
    Techs: (
      <Carousel autoplay>
        {userList.techs.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.status}</p>
            </div>
          );
        })}
      </Carousel>
    ),
  };

  const onTabChange = (key, type) => {
    setKey(key);
  };

  return (
    <Card style={{ width: 550, borderRadius: "15px" }}>
      <Meta
        avatar={<Avatar src={userList.avatar_url} />}
        title={userList.name}
        description={userList.bio}
      />

      <Card style={{ marginTop: 10 }} type="inner" title="Inner Card title">
        <ul>
          <li>Email: {userList.email}</li>
          <li>Course Module: {userList.course_module}</li>
          <li>
            <span title={userList.contact}>Contact: {userList.contact}</span>
          </li>
        </ul>
      </Card>
      {out && (
        <Card
          style={{ width: "100%" }}
          tabList={tabList}
          activeTabKey={key}
          onTabChange={(key) => {
            onTabChange(key, "key");
          }}
        >
          {contentList[key]}
        </Card>
      )}
    </Card>
  );
};

export default CardUser;
