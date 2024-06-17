import styled from "styled-components";
import personicon from "../../img/loginImg/person-icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const IconDiv = styled.div`
  width: 418px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${personicon});
  background-size: cover;
`;

const LoginDiv = styled.div`
  width: 418px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const InputDiv = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  border: none;
  border-bottom: 2px solid gray;
  background-color: transparent;
  font-size: 16px;
  font-weight: bolder;
  outline: none;
  &::placeholder {
    text-align: center;
    font-size: 16px;
    color: #b44a4a;
    font-weight: bolder;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FindDiv = styled.div`
  width: 418px;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  & > div {
    display: flex;
  }
`;
const Signin = styled.div`
  width: 70px;
  height: 30px;
  font-size: 16px;
  color: #b44a4a;
  font-weight: bolder;
  cursor: pointer;
`;
const ForgotId = styled.div`
  width: 70px;
  height: 20px;
  font-size: 16px;
  color: #b44a4a;
  cursor: pointer;
`;
const ForgotPassword = styled.div`
  width: 70px;
  height: 20px;
  font-size: 16px;
  color: #b44a4a;
  cursor: pointer;
`;
const ButtonDiv = styled.div`
  width: 418px;
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
const SigninDiv = styled.div`
  display: flex;
`;
const LoginPage = () => {
  return (
    <>
      <IconDiv>
        <Icon />
      </IconDiv>
      <LoginDiv>
        <InputContainer>
          <IconWrapper>
            <MdOutlineMailOutline size={24} color="gray" />
          </IconWrapper>
          <InputDiv type="text" placeholder="Email ID" />
        </InputContainer>
        <InputContainer>
          <IconWrapper>
            <MdLockOutline size={24} color="gray" />
          </IconWrapper>
          <InputDiv type="password" placeholder="Password" />
        </InputContainer>
      </LoginDiv>
      <FindDiv>
        <div>
          <Link to="/signup-page" style={{ textDecoration: "none" }}>
            <SigninDiv>
              <MdOutlineMailOutline size={24} color="gray" />
              <Signin>&nbsp;Sign in</Signin>
            </SigninDiv>
          </Link>
        </div>
        <div>
          <Link to="/find-email" style={{ textDecoration: "none" }}>
            <ForgotId>Forgot ID</ForgotId>
          </Link>
          <Link to="/find-password" style={{ textDecoration: "none" }}>
            <ForgotPassword>/Password?</ForgotPassword>
          </Link>
        </div>
      </FindDiv>
      <ButtonDiv>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LoginButton>Login</LoginButton>
        </Link>
      </ButtonDiv>
    </>
  );
};

export default LoginPage;
