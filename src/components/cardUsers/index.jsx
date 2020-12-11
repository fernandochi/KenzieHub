import { Card, Avatar } from "antd";
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

const CardUsers = ({ userList, out = false }) => {
  const [key, setKey] = useState("Works");

  const contentList = {
    Works: <p>{userList.works}</p>,
    Techs: <p>{userList.tech}</p>,
  };

  const onTabChange = (key, type) => {
    setKey(key);
  };

  return (
    <Card style={{ width: 550 }}>
      <Meta
        avatar={<Avatar src={userList.avatar_url} />}
        title={userList.name}
        description={userList.bio}
      />

      <Card style={{ marginTop: 10 }} type="inner" title="Inner Card title">
        <ul>
          <li>Email: {userList.email}</li>
          <li>Course Module: {userList.course_module}</li>
          <li>Contact: {userList.contact}</li>
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

export default CardUsers;
