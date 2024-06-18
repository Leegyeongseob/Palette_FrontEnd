import styled from "styled-components";
import findglass from "../../img/loginImg/findglass.png";
import { Link } from "react-router-dom";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const IconDiv = styled.div`
  width: 24.6vw;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${findglass});
  background-size: cover;
`;
const InputDiv = styled.div`
  width: 24.6vw;
  height: 250px;
  background-color: red;
`;
const ButtonDiv = styled.div`
  width: 450px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginButton = styled.div`
  width: 180px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  font-size: 23px;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: border;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
const FindEmail = () => {
  return (
    <Contain>
      <IconDiv>
        <Icon />
      </IconDiv>
      <InputDiv></InputDiv>
      <ButtonDiv>
        <Link to="/login-page" style={{ textDecoration: "none" }}>
          <LoginButton>찾기</LoginButton>
        </Link>
      </ButtonDiv>
    </Contain>
  );
};

export default FindEmail;
