import styled from "styled-components";
import personicon from "../../img/loginImg/person-icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import naver from "../../img/loginImg/naver.png";
import kakao from "../../img/loginImg/kakako.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { useState } from "react";
import LoginAxios from "../../axiosapi/LoginAxios";
import Common from "../../common/Common";
import Modal from "../../common/utils/Modal";
const Contain = styled.div`
  width: auto;
  height: auto;
`;

const IconDiv = styled.div`
  width: 24.6vw;
  height: 13vh;
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
  height: 19.888vh;
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
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"};
  border-radius: 1.042vw;
  font-size: 1.198vw;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.1)"};
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
const SiGnuprivacyguardStyle = styled(SiGnuprivacyguard)`
  width: 1.25vw;
  height: 2.518vh;
  color: gray;
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
const Message = styled.div`
  width: 100%;
  font-size: 0.6vw;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;
const LoginPage = () => {
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  // 패스워드 입력
  const [inputpwd, setInputPwd] = useState("");
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");

  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
    setIsPwd(true);
  };
  const loginBtnHandler = () => {
    loginAxios(inputEmail, inputpwd);
  };
  const loginAxios = async (email, pwd) => {
    try {
      const response = await LoginAxios.login(email, pwd);
      console.log(response.data);
      if (response.data.grantType === "bearer") {
        console.log("accessToken : ", response.data.accessToken);
        console.log("refreshToken : ", response.data.refreshToken);
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);
        navigate("/main-page");
      } else {
        setModalOpen(true);
        setModalContent("암호화에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      setModalContent("계정이 없습니다.");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isId && isPwd) {
      loginBtnHandler();
    }
  };
  return (
    <Contain>
      <IconDiv>
        <Icon />
      </IconDiv>
      <LoginDiv>
        <div>
          <InputContainer>
            <IconWrapper>
              <MdOutlineMailOutlineStyle />
            </IconWrapper>
            <InputDiv
              type="text"
              placeholder="Email ID"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </InputContainer>
          {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}
        </div>
        <InputContainer>
          <IconWrapper>
            <MdLockOutlineStyled />
          </IconWrapper>
          <InputDiv
            type="password"
            placeholder="Password"
            value={inputpwd}
            onChange={onChangePwd}
            onClick={loginBtnHandler} //패스워드를 입력하고 엔터를 눌렀을 경우
          />
        </InputContainer>
      </LoginDiv>
      <FindDiv>
        <div>
          <Link to="/signup-page" style={{ textDecoration: "none" }}>
            <SigninDiv>
              <SiGnuprivacyguardStyle />
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
        <LoginButton isActive={isId && isPwd}>Login</LoginButton>
      </ButtonDiv>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </Contain>
  );
};

export default LoginPage;
