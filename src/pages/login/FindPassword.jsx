import styled from "styled-components";
import { LuKeyRound } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const IconDiv = styled.div`
  width: 24.6vw;
  height: 18.888vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputDiv = styled.div`
  width: 24.6vw;
  height: 20.986vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 23.438vw;
  height: 11.962vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FindButton = styled.div`
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
const InputDetailDiv = styled.div`
  width: 17.708vw;
  height: 3.358vh;

  display: flex;
  & > label {
    width: 5.729vw;
    height: auto;
    font-size: 0.833vw;
    color: #b44a4a;
    display: flex;
    font-weight: bolder;
    justify-content: center;
    align-items: center;
  }
  & > .InputClass {
    width: 11.458vw;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 0.833vw;
    font-weight: 600;
  }
`;
const RegisterationInput1 = styled.input`
  width: 6.25vw;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.521vw;
  font-size: 0.833vw;
  font-weight: 600;
`;
const Text = styled.div`
  width: 0.521vw;
  height: 3.358vh;
  font-weight: bolder;
  font-size: 0.833vw;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RegisterationInput2 = styled.input`
  width: 1.042vw;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.208vw;
  font-size: 0.833vw;
  font-weight: 600;
`;
const Message = styled.div`
  width: 100%;
  font-size: 0.6vw;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;
const FindPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [isId, setIsId] = useState("");
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
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
  return (
    <Contain>
      <IconDiv>
        <LuKeyRound size={100} color="rgba(0,0,0,0.7)" />
      </IconDiv>
      <InputDiv>
        <InputDiv>
          <InputDetailDiv>
            <label>이메일</label>
            <input
              className="InputClass"
              type="text"
              placeholder="Email ID"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </InputDetailDiv>
          {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}
          <InputDetailDiv>
            <label>이름</label>
            <input className="InputClass" />
          </InputDetailDiv>
          <InputDetailDiv>
            <label>주민등록번호</label>
            <RegisterationInput1 />
            <Text> - </Text>
            <RegisterationInput2 />
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
          </InputDetailDiv>
        </InputDiv>
      </InputDiv>
      <ButtonDiv>
        <Link to="/login-page" style={{ textDecoration: "none" }}>
          <FindButton>찾기</FindButton>
        </Link>
      </ButtonDiv>
    </Contain>
  );
};
export default FindPassword;
