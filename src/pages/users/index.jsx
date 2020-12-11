import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import CardUsers from "../../components/cardUsers";
const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const total = useSelector((state) => state.userList) || 100;
  const params = useParams();

  useEffect(() => {
    dispatch(getUsersThunk(params.perPage, params.page));
  }, [params]);

  const handlUserPagination = (page, perPage) => {
    dispatch(getUsersThunk(perPage, page));
    history.push(`/users/${perPage}/${page}`);
  };

  console.log(total);
  return (
    <>
      {total.map((item, idx) => (
        <CardUsers userList={item} key={idx} out />
      ))}
      <Pagination
        current={params.page}
        total={total.length}
        showSizeChanger
        onShowSizeChange={() => console.log("oi")}
        onChange={handlUserPagination}
      />
    </>
  );
};

export default User;
