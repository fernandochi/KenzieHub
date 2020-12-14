import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import CardUser from "../../components/cardUser";
const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let userList = useSelector((state) => state.userList);
  const params = useParams();

  useEffect(() => {
    dispatch(getUsersThunk(params.perPage, params.page));
  }, [params]);
  console.log("userListvindo do state global:", userList);

  const handlUserPagination = (page, perPage) => {
    dispatch(getUsersThunk(perPage, page));
    history.push(`/users/${perPage}/${page}`);
  };

  return (
    <>
      {userList.map((item, idx) => (
        <CardUser userList={item} key={idx} />
      ))}
      <Pagination
        current={params.page}
        total={userList.length}
        showSizeChanger
        onShowSizeChange={() => console.log("oi")}
        onChange={handlUserPagination}
      />
    </>
  );
};

export default User;
