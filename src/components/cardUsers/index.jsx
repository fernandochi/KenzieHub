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
    Works: <p>{JSON.stringify(userList.works)}</p>,
    Techs: <p>{JSON.stringify(userList.techs)}</p>,
  };

  const onTabChange = (key, type) => {
    console.log(key, type);
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

// "id": "8b8e50a6-50c2-4718-b817-2d38cad0c8f4",
// "name": "Gabriel Araujo",
// "email": "gabriel@gmail.com",
// "course_module": "2o Módulo (Frontend avançado)",
// "bio": "Lorem ipsum dolor emet",
// "contact": "linkedin/araujooj",
// "techs": [
//   {
//     "id": "55126701-18ac-40df-aab9-3a88657db446",
//     "title": "React",
//     "status": "Avançado",
//     "created_at": "2020-11-30T16:26:53.953Z",
//     "updated_at": "2020-11-30T16:26:53.953Z"
//   },
//   {
//     "id": "af06a853-c1fb-4a94-960d-1c6caa8d2b5c",
//     "title": "Typescript",
//     "status": "Avançado",
//     "created_at": "2020-11-30T18:40:08.316Z",
//     "updated_at": "2020-11-30T18:40:08.316Z"
//   }
// ],
// "works": [
//   {
//     "id": "0cd019b5-10c5-4eb4-9781-5dff577cfd9e",
//     "title": "KenzieHub",
//     "description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
//     "deploy_url": "https://kenziehub.me",
//     "created_at": "2020-12-03T01:13:44.720Z",
//     "updated_at": "2020-12-03T01:13:44.720Z"
//   }
// ],
// "created_at": "2020-11-27T00:01:13.789Z",
// "updated_at": "2020-12-05T13:59:22.632Z",
// "avatar_url": "https://kenziehub.s3.amazonaws.com/4ff1e3c6c082ff67af7c-IMG_20200610_110518_522.jpg"
// }
