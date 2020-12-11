import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CardUsers from "../../components/cardUsers";
const User = () => {
  const params = useParams();
  const [page, setPage] = useState(params.page);
  const [perPage, setPerPage] = useState(params.perPage);
  const [search, setSearch] = useState("");
  const [thereAreUsers, setThereAreUsers] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const total = useSelector((state) => state.userList);
  const nextUrl = useSelector((state) => state.nextUrl);

  const thereAreMoreUsers = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        console.log("tudo OK", response);
        if (response.data.length === 0) {
          console.log("tem zero usuários na próxima página");
          return setThereAreUsers(true);
        }
        setThereAreUsers(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    thereAreMoreUsers();
    dispatch(getUsersThunk(perPage, page, search));
  }, [page, perPage, search, nextUrl]);

  const previousPage = () => {
    if (page === "1") {
      return;
    }
    setPage(String(Number(page) - 1));
    history.push(`/users/${perPage}/${String(Number(page) - 1)}`);
  };

  const nextPage = () => {
    setPage(String(Number(page) + 1));
    history.push(`/users/${perPage}/${String(Number(page) + 1)}`);
  };

  const handlePage = (e) => {
    setPerPage(e.target.value);
    history.push(`/users/${perPage}/${page}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    // history.push(`/users/${perPage}/${page}/${search}`);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <button onClick={previousPage}>`{"<"}`</button>
          {page}
          <button disabled={thereAreUsers} onClick={nextPage}>
            `{">"}`
          </button>
        </div>
        <div>
          <select onChange={handlePage} value={perPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </form>
      {total.map((item, idx) => (
        <CardUsers userList={item} key={idx} out />
      ))}
    </>
  );
};

export default User;
