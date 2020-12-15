import { Card, Avatar, Rate, Carousel } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteThunk } from "../../store/modules/favoritesUsers/thunks";

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

const CardUser = ({ userList, out = false, favorited = false }) => {
  const [key, setKey] = useState("Works");
  const [countStars, setCountStars] = useState(0);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!!favorites) {
      const [isUserFavored] = favorites.filter(({ user }) => {
        return user.id === userList.id;
      });
      console.log(isUserFavored);
      isUserFavored && setCountStars(isUserFavored.starts);
    }
  }, []);

  const onTabChange = (key, type) => {
    setKey(key);
  };

  const handleChange = (value) => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    if (!!favorites) {
      const removeUser = favorites.filter(({ user }) => {
        return user.id !== userList.id;
      });

      const newFavorites = [...removeUser, { user: userList, starts: value }];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      dispatch(updateFavoriteThunk(newFavorites));
    } else {
      const newFavorites = [{ user: userList, starts: value }];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      dispatch(updateFavoriteThunk(newFavorites));
    }
    setCountStars(value);
  };

  return (
    <Card style={{ width: 550, borderRadius: "15px" }}>
      <Meta
        avatar={<Avatar src={userList.avatar_url} />}
        title={userList.name}
        description={userList.bio}
        extra="oi"
      />
      <Card
        style={{ marginTop: 10 }}
        type="inner"
        title="Informações: "
        extra={
          <Rate
            count="3"
            defaultValue="0"
            value={countStars}
            onChange={handleChange}
            disabled={favorited ? false : true}
          />
        }
      >
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
