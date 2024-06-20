import styled from "styled-components";
import { Link } from "react-router-dom";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const TitleDiv = styled.div`
  width: 24.6vw;
  height: 6.296vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.198vw;
  font-weight: 900;
  color: #b44a4a;
`;
const InputDiv = styled.div`
  width: 24.6vw;
  height: 39.874vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 17.708vw;
  height: 3.358vh;

  display: flex;
  justify-content: end;
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
  & > .InputEmail {
    width: 8.333vw;
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
const Empty = styled.div`
  width: 0.521vw;
`;
const EmailAthouized = styled.div`
  width: 2.604vw;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.208vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.729vw;
  color: #b44a4a;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const RegisterationInput1 = styled.input`
  width: 6.771vw;
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
const CoupleText = styled.div`
  font-size: 0.729vw;
  color: #b44a4a;
  display: flex;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 23.438vw;
  height: 11.962vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignupButton = styled.div`
  width: 9.375vw;
  height: 5.247vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1.042vw;
  font-weight: 600;
  font-size: 1.094vw;
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
const InputDetailDiv2 = styled.div`
  width: 17.708vw;
  height: 3.358vh;
  display: flex;
  justify-content: center;
`;
const SignupPage = () => {
  return (
    <Contain>
      <TitleDiv>회원가입</TitleDiv>
      <InputDiv>
        <InputDetailDiv>
          <label>이메일</label>
          <input className="InputEmail" />
          <Empty></Empty>
          <EmailAthouized>인증</EmailAthouized>
        </InputDetailDiv>
        <InputDetailDiv>
          <label>비밀번호</label>
          <input type="password" className="InputClass" />
        </InputDetailDiv>
        <InputDetailDiv>
          <label>비밀번호 확인</label>
          <input type="password" className="InputClass" />
        </InputDetailDiv>
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
        <InputDetailDiv>
          <label>닉네임</label>
          <input className="InputClass" />
        </InputDetailDiv>
        <InputDetailDiv>
          <label>커플이름</label>
          <input className="InputClass" />
        </InputDetailDiv>
        <InputDetailDiv>
          <CoupleText>커플 이름이 있어야 가입이 가능합니다.</CoupleText>
          <Empty />
          <EmailAthouized>만들기</EmailAthouized>
        </InputDetailDiv>
        <InputDetailDiv2>
          <CoupleText style={{ fontSize: "0.833vw", fontWeight: "600" }}>
            약관 보기
          </CoupleText>
          <Empty />
          <EmailAthouized>보기</EmailAthouized>
        </InputDetailDiv2>
      </InputDiv>
      <ButtonDiv>
        <Link to="/login-page" style={{ textDecoration: "none" }}>
          <SignupButton>가입하기</SignupButton>
        </Link>
      </ButtonDiv>
    </Contain>
  );
};

export default SignupPage;
