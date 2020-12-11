import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CardUsers from "../../components/cardUsers";
const User = () => {
  const params = useParams();
  const [page, setPage] = useState(Number(params.page));
  const [perPage, setPerPage] = useState(Number(params.perPage));
  const dispatch = useDispatch();
  const history = useHistory();
  const total = useSelector((state) => state.userList);

  useEffect(() => {
    if (total.length === 0) {
      console.log("até");
      setPage(page - 1);
      dispatch(getUsersThunk(params.perPage, page - 1));
    }
    dispatch(getUsersThunk(params.perPage, params.page));
  }, [params]);

  const previousPage = () => {
    console.log("previous");
    if (page === 1) {
      return;
    }
    setPage(page - 1);
    history.push(`/users/${perPage}/${page - 1}`);
  };

  const nextPage = () => {
    if (total.length !== perPage) {
      return previousPage();
    }
    setPage(page + 1);
    history.push(`/users/${perPage}/${page + 1}`);
  };

  const handlePage = (e) => {
    setPerPage(e.target.value);
    history.push(`/users/${e.target.value}/${page}`);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <button onClick={previousPage}>`{"<"}`</button>
          {page}
          <button disabled={!!total.length ? false : true} onClick={nextPage}>
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
