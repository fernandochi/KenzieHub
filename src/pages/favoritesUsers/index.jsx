import { useState, useEffect } from "react";
import CardUser from "../../components/cardUser";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteThunk } from "../../store/modules/favoritesUsers/thunks";
import { Empty } from "antd";

const FavoritesUsers = () => {
  const listFavorites = useSelector((state) => state.listFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!!favorites) {
      dispatch(updateFavoriteThunk(favorites));
    }
  }, []);

  return (
    <div style={{ paddingBottom: 20 }}>
      {!!listFavorites.length ? (
        listFavorites.map(({ user }) => {
          return <CardUser userList={user} key={user.id} favorited out />;
        })
      ) : (
        <Empty style={{ marginTop: 100 }} />
      )}
    </div>
  );
};

export default FavoritesUsers;
