import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
const Contain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 900;
  color: #b44a4a;
  @media screen and (max-width: 654px) {
    font-size: 3vw;
  }
`;
const InputDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const EmailDiv = styled.div`
  width: 100%;
`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  gap: 2px;
  @media screen and (max-width: 654px) {
    height: 5vw;
  }

  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 29%;
    height: auto;
    font-size: 14px;
    color: #b44a4a;
    text-align: center;
    font-weight: bolder;
    @media screen and (max-width: 654px) {
      font-size: 2vw;
    }
  }
  & > .Email {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 53%;
    height: 100%;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 14px;
    font-weight: 600;
    @media screen and (max-width: 654px) {
      font-size: 2vw;
    }
  }
  & > .InputClass {
    width: 53%;
    height: 100%;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 14px;
    font-weight: 600;
    @media screen and (max-width: 654px) {
      font-size: 2vw;
    }
  }
`;
const ButtonDiv = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SignupButton = styled.div`
  width: 30%;
  height: 80%;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 1.042vw;
  font-weight: 600;
  font-size: 1.094vw;
  color: ${({ isActive }) => (isActive ? "#b44a4a" : "#ccc")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: border;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  }
  @media screen and (max-width: 654px) {
    font-size: 2vw;
  }
`;
const Message = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
  @media screen and (max-width: 654px) {
    font-size: 2vw;
  }
`;

const Modify = () => {
  // 키보드 입력
  const [inputName, setInputName] = useState("");
  const [emailData, setEmailData] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputcoupleName, setInputCoupleName] = useState("");
  // 유효성 확인
  const [isPwd, setIsPwd] = useState("");
  // 에러 메세지
  const [pwdMessage, setPwMessage] = useState("");
  //정보 저장(placeholder)
  const [memberInfo, setMemberInfo] = useState([]);
  const email = sessionStorage.getItem("email"); // 세션 스토리지에서 이메일 가져오기
  const navigate = useNavigate();
  //회원정보를 가져오기 위한 Axois통신
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MemberAxiosApi.memberAxios(email); // Axios로 회원 정보 요청
        setMemberInfo(response.data); // 객체를 저장
        setEmailData(response.data.email);
        setInputName(response.data.name);
        setInputNickName(response.data.nickName);
        setInputCoupleName(response.data.coupleName);
        console.log("Response from Axios:", response.data);
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };

    fetchData(); // 데이터 가져오기
  }, []);
  // 비밀번호 8자리 이상.
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPwd(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPwd(false);
    } else {
      setPwMessage("안전한 비밀번호입니다.)");
      setIsPwd(true);
    }
  };

  const modifyOnClickHandler = () => {
    const modifyHandler = async (
      emailValue,
      pwd,
      name,
      nickName,
      coupleName
    ) => {
      const rsp = await MemberAxiosApi.memberModify(
        emailValue,
        pwd,
        name,
        nickName,
        coupleName
      );
      if (rsp.data === "Success") {
        console.log("수정되었습니다.");
        sessionStorage.setItem("coupleName",coupleName);
        navigate("/main-page");
        
      } else {
        console.log("수정에러", rsp.data);
      }
    };
    modifyHandler(
      emailData,
      inputPwd,
      inputName,
      inputNickName,
      inputcoupleName
    );
  };
  return (
    <Contain>
      <TitleDiv>회원수정</TitleDiv>
      <InputDiv>
        <EmailDiv>
          <InputDetailDiv>
            <label>이메일</label>
            <div className="Email">{emailData}</div>
          </InputDetailDiv>
        </EmailDiv>
        <InputDetailDiv>
          <label>비밀번호</label>
          <input
            type="password"
            className="InputClass"
            value={inputPwd}
            onChange={onChangePw}
          />
        </InputDetailDiv>
        {inputPwd && <Message isCorrect={isPwd}>{pwdMessage}</Message>}

        <InputDetailDiv>
          <label>이름</label>
          <input
            className="InputClass"
            placeholder={memberInfo.name}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
        </InputDetailDiv>
        <InputDetailDiv>
          <label>닉네임</label>
          <input
            className="InputClass"
            placeholder={memberInfo.nickName}
            onChange={(e) => {
              setInputNickName(e.target.value);
            }}
          />
        </InputDetailDiv>
        <InputDetailDiv>
          <label>커플이름</label>
          <input
            className="InputClass"
            placeholder={memberInfo.coupleName}
            onChange={(e) => {
              setInputCoupleName(e.target.value);
            }}
          />
        </InputDetailDiv>
      </InputDiv>
      <ButtonDiv>
        <SignupButton
          isActive={inputName || inputNickName || inputcoupleName}
          onClick={modifyOnClickHandler}
        >
          수정하기
        </SignupButton>
      </ButtonDiv>
    </Contain>
  );
};

export default Modify;
