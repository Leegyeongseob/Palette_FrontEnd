import styled from "styled-components";
import personicon from "../../img/loginImg/person-icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import naver from "../../img/loginImg/naver.png";
import kakao from "../../img/loginImg/kakako.png";
const Contain = styled.div`
  width: auto;
  height: auto;
`;

const IconDiv = styled.div`
  width: 24.6vw;
  height: 14.69vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 5.208vw;
  height: 10.493vh;
  background-image: url(${personicon});
  background-size: cover;
`;

const LoginDiv = styled.div`
  width: 24.6vw;
  height: 18.888vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 10.417vw;
  height: 5.247vh;
  display: flex;
  align-items: center;
`;

const InputDiv = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 2.083vw;
  border: none;
  border-bottom: 0.21vh solid gray;
  background-color: transparent;
  font-size: 0.833vw;
  font-weight: bolder;
  outline: none;
  &::placeholder {
    text-align: center;
    font-size: 0.833vw;
    color: #b44a4a;
    font-weight: bolder;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  margin-left: 0.521vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FindDiv = styled.div`
  width: 24.6vw;
  height: 4.197vh;
  display: flex;
  justify-content: space-evenly;
  & > div {
    display: flex;
  }
`;

const Signin = styled.div`
  width: 3.646vw;
  height: 3.148vh;
  font-size: 0.833vw;
  color: #b44a4a;
  font-weight: bolder;
  cursor: pointer;
`;

const ForgotId = styled.div`
  width: 3.646vw;
  height: 2.099vh;
  font-size: 0.833vw;
  color: #b44a4a;
  cursor: pointer;
`;

const ForgotPassword = styled.div`
  width: 3.646vw;
  height: 2.099vh;
  font-size: 0.833vw;
  color: #b44a4a;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  width: 23.438vw;
  height: 11.962vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.div`
  width: 9.375vw;
  height: 5.247vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1.042vw;
  font-size: 1.198vw;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const SimpleLogin = styled.div`
  width: 23.438vw;
  height: 5.247vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 13.021vw;
    height: 5.247vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const SigninDiv = styled.div`
  display: flex;
`;

const CircleSide = styled.div`
  width: 2.604vw;
  height: 5.247vh;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const GoogleIcon = styled(FcGoogle)`
  width: 2.604vw;
  height: 5.247vh;
  cursor: pointer;
`;

const NaverIcon = styled.div`
  width: 2.604vw;
  height: 5.247vh;
  background-image: url(${naver});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const KakaoIcon = styled.div`
  width: 2.604vw;
  height: 5.247vh;
  background-image: url(${kakao});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
const MdOutlineMailOutlineStyle = styled(MdOutlineMailOutline)`
  width: 1.25vw;
  height: 2.518vh;
  color: gray;
`;
const MdLockOutlineStyled = styled(MdLockOutline)`
  width: 1.25vw;
  height: 2.518vh;
  color: gray;
`;
const LoginPage = () => {
  return (
    <Contain>
      <IconDiv>
        <Icon />
      </IconDiv>
      <LoginDiv>
        <InputContainer>
          <IconWrapper>
            <MdOutlineMailOutlineStyle />
          </IconWrapper>
          <InputDiv type="text" placeholder="Email ID" />
        </InputContainer>
        <InputContainer>
          <IconWrapper>
            <MdLockOutlineStyled />
          </IconWrapper>
          <InputDiv type="password" placeholder="Password" />
        </InputContainer>
      </LoginDiv>
      <FindDiv>
        <div>
          <Link to="/signup-page" style={{ textDecoration: "none" }}>
            <SigninDiv>
              <MdLockOutlineStyled />
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
      <SimpleLogin>
        <div>
          <CircleSide>
            <GoogleIcon />
          </CircleSide>

          <CircleSide>
            <NaverIcon />
          </CircleSide>

          <CircleSide>
            <KakaoIcon />
          </CircleSide>
        </div>
      </SimpleLogin>
      <ButtonDiv>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LoginButton>Login</LoginButton>
        </Link>
      </ButtonDiv>
    </Contain>
  );
};

export default LoginPage;
