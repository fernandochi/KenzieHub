import { BodyDiv, NavigationDiv, AppButton, PageDiv } from "./style";
import { useParams } from "react-router-dom";
import { getUsersThunk } from "../../store/modules/users/thunks";
import { Select, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CardUser from "../../components/cardUser";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import "./style.css";

const { Option } = Select;

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [page, setPage] = useState(Number(params.page));
  const [perPage, setPerPage] = useState(Number(params.perPage));
  let userList = useSelector((state) => state.userList);

  useEffect(() => {
    setPage(Number(params.page));
    dispatch(getUsersThunk(params.perPage, params.page));
  }, [params]);

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
    <BodyDiv className="background">
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
        <AppButton
          onClick={nextStepPage}
          disabled={userList.length !== perPage ? true : false}
        >
          {" "}
          {`>>`}{" "}
        </AppButton>
        <AppButton
          onClick={nextPage}
          disabled={userList.length !== perPage ? true : false}
        >
          {" "}
          {`>`}{" "}
        </AppButton>
        <div>
          <Select
            size="large"
            labelInValue
            defaultValue={{ value: perPage }}
            style={{
              width: 80,
              marginLeft: "9px",
            }}
            onChange={handleChange}
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
          </Select>
        </div>
      </NavigationDiv>

      {!!userList.length ? (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          style={{ maxWidth: "100vw" }}
        >
          {userList.map((item, idx) => (
            <Col
              span={12}
              style={{
                paddingBottom: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardUser userList={item} key={idx} out />
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          <UseAnimations animation={loading} />
        </div>
      )}
    </BodyDiv>
  );
};

export default User;
