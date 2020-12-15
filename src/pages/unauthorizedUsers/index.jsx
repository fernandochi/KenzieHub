import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { Empty, Select, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CardUser from "../../components/cardUser";
import { AppButton, BodyDiv, NavigationDiv, PageDiv } from "../users/style";
import axios from "axios";

const { Option } = Select;

const UnauthorizedUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [thereAreUsers, setThereAreUsers] = useState(false);

  const [page, setPage] = useState(Number(params.page));
  const [perPage, setPerPage] = useState(Number(params.perPage));
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
    dispatch(getUsersThunk(params.perPage, params.page));
  }, [params, nextUrl]);

  const previousPage = () => {
    setPage(page - 1);
    dispatch(getUsersThunk(perPage, page - 1));
    history.push(`/unauthorized-users/${perPage}/${page - 1}`);
  };
  const previousStepPage = () => {
    setPage(page - 3);
    dispatch(getUsersThunk(perPage, page - 3));
    history.push(`/unauthorized-users/${perPage}/${page - 3}`);
  };

  const nextPage = () => {
    setPage(page + 1);
    dispatch(getUsersThunk(perPage, page + 1));
    history.push(`/unauthorized-users/${perPage}/${page + 1}`);
  };
  const nextStepPage = () => {
    setPage(page + 3);
    dispatch(getUsersThunk(perPage, page + 3));
    history.push(`/unauthorized-users/${perPage}/${page + 3}`);
  };

  const handleChange = (values) => {
    setPerPage(Number(values.key));
    dispatch(getUsersThunk(values.key, 1));
    history.push(`/unauthorized-users/${values.key}/${page}`);
  };

  return (
    <BodyDiv>
      <NavigationDiv>
        <AppButton onClick={previousPage} disabled={page === 1 ? true : false}>
          {" "}
          {`<`}{" "}
        </AppButton>
        <AppButton
          onClick={previousStepPage}
          disabled={page <= 3 ? true : false}
        >
          {" "}
          {`<<`}{" "}
        </AppButton>
        <PageDiv>{page}</PageDiv>
        <AppButton onClick={nextStepPage} disabled={thereAreUsers}>
          {" "}
          {`>>`}{" "}
        </AppButton>
        <AppButton onClick={nextPage} disabled={thereAreUsers}>
          {" "}
          {`>`}{" "}
        </AppButton>
        <Select
          size="large"
          labelInValue
          defaultValue={{ value: perPage }}
          style={{ width: 80, marginLeft: "9px" }}
          onChange={handleChange}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
      </NavigationDiv>
      {!!userList.length ? (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
          {userList.map((item, idx) => (
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              key={idx}
              style={{
                paddingBottom: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardUser userList={item} key={item.id} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty style={{ marginTop: 100 }} />
      )}
    </BodyDiv>
  );
};

export default UnauthorizedUsers;
