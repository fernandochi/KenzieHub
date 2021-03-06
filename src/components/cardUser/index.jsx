import { Card, Avatar, Rate, Carousel } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFavoriteThunk } from "../../store/modules/favoritesUsers/thunks";
import { motion } from "framer-motion";

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

const CardUser = ({
  userList,
  out = false,
  favorited = false,
  starts = true,
}) => {
  const [key, setKey] = useState("Works");
  const [countStars, setCountStars] = useState(0);

  const dispatch = useDispatch();

  const contentList = {
    Works: (
      <Carousel autoplay>
        {userList.works.map((item) => {
          return (
            <div key={item.id}>
              <p>Título: {item.title}</p>
              <p>Descrição: {item.description}</p>
              <p>
                <a
                  href={item.deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link do projeto
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
              <p>Tecnologia: {item.title}</p>
              <p>Nível: {item.status}</p>
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
    <motion.div
      style={{
        minWidth: "254px",
        maxWidth: "90.90vw",
        width: "70%",
        margin: "0 auto",
      }}
      animate={{ scale: 0.99 }}
      transition={{ duration: 1 }}
    >
      {userList && (
        <Card
          style={{
            minWidth: "254px",
            maxWidth: "550px",
            borderRadius: "15px",
            minHeight: "100%",
          }}
        >
          <Meta
            avatar={<Avatar src={userList.avatar_url} />}
            title={userList.name}
            description={userList.bio}
          />
          <Card
            style={{ marginTop: 10 }}
            type="inner"
            title="Informações: "
            extra={
              starts ? (
                <Rate
                  count="3"
                  defaultValue="0"
                  value={countStars}
                  onChange={handleChange}
                  disabled={favorited ? false : true}
                />
              ) : null
            }
          >
            <ul>
              <li>Email: {userList.email}</li>
              <li>Course Module: {userList.course_module}</li>
              <li>Contact: {userList.contact}</li>
            </ul>
          </Card>
          {out && (
            <Card
              style={{ width: "100%", height: "100%" }}
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
      )}
    </motion.div>
  );
};

export default CardUser;
