import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { Pagination, Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CardUser from "../../components/cardUser";
import axios from "axios";

const { Option } = Select;

const User = () => {
  const params = useParams();
  const [page, setPage] = useState(params.page);
  const [perPage, setPerPage] = useState(params.perPage);
  const [search, setSearch] = useState("");
  const [thereAreUsers, setThereAreUsers] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  let userList = useSelector((state) => state.userList);
  let nextUrl = useSelector((state) => state.nextUrl);

  const thereAreMoreUsers = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        if (response.data.length === 0) {
          return setThereAreUsers(true);
        }
        setThereAreUsers(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    thereAreMoreUsers();
    setPage(Number(params.page));
    dispatch(getUsersThunk(params.perPage, params.page, search));
  }, [params, search, nextUrl]);

  const previousPage = () => {
    setPage(page - 1);
    dispatch(getUsersThunk(perPage, page - 1));
    history.push(`/users/${perPage}/${page - 1}`);
  };
  const previousStepPage = () => {
    setPage(page - 3);
    dispatch(getUsersThunk(perPage, page - 3));
    history.push(`/users/${perPage}/${page - 3}`);
  };

  const nextPage = () => {
    setPage(page + 1);
    dispatch(getUsersThunk(perPage, page + 1));
    history.push(`/users/${perPage}/${page + 1}`);
  };
  const nextStepPage = () => {
    setPage(page + 3);
    dispatch(getUsersThunk(perPage, page + 3));
    history.push(`/users/${perPage}/${page + 3}`);
  };

  const handleChange = (values) => {
    setPerPage(Number(values.key));
    dispatch(getUsersThunk(values.key, 1));
    history.push(`/users/${values.key}/${1}`);
  };

  return (
    <>
      <form>
        <input onChange={(e) => setSearch(e.target.value)} />
      </form>
      <div>
        <Button onClick={previousPage} disabled={page === 1 ? true : false}>
          {" "}
          {`<`}{" "}
        </Button>
        <Button onClick={previousStepPage} disabled={page <= 3 ? true : false}>
          {" "}
          {`<<`}{" "}
        </Button>
        {page}
        <Button onClick={nextStepPage} disabled={thereAreUsers}>
          {" "}
          {`>>`}{" "}
        </Button>
        <Button onClick={nextPage} disabled={thereAreUsers}>
          {" "}
          {`>`}{" "}
        </Button>
        <Select
          labelInValue
          defaultValue={{ value: perPage }}
          style={{ width: 80 }}
          onChange={handleChange}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
      </div>
      {!!userList.length ? (
        userList.map((item, idx) => <CardUser userList={item} key={idx} out />)
      ) : (
        <div>Sem dados</div>
      )}
    </>
  );
};

export default User;
