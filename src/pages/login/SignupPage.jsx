import styled from "styled-components";
import { Link } from "react-router-dom";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const TitleDiv = styled.div`
  width: 24.6vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: 900;
  color: #b44a4a;
`;
const InputDiv = styled.div`
  width: 24.6vw;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 340px;
  height: 32px;

  display: flex;
  justify-content: end;
  & > label {
    width: 110px;
    height: auto;
    font-size: 16px;
    color: #b44a4a;
    display: flex;
    font-weight: bolder;
    justify-content: center;
    align-items: center;
  }
  & > .InputClass {
    width: 220px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  & > .InputEmail {
    width: 160px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  & > .InputPhone1 {
    width: 60px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  & > .InputPhone2 {
    width: 80px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  & > .InputPhone3 {
    width: 60px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
`;
const Empty = styled.div`
  width: 10px;
`;
const EmailAthouized = styled.div`
  width: 50px;
  border-radius: 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #b44a4a;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const RegisterationInput1 = styled.input`
  width: 130px;
  border-radius: 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
`;
const Text = styled.div`
  width: 10px;
  height: 32px;
  font-weight: bolder;
  font-size: 16px;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RegisterationInput2 = styled.input`
  width: 20px;
  border-radius: 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 4px;
  font-size: 16px;
  font-weight: 600;
`;
const CoupleText = styled.div`
  font-size: 14px;
  color: #b44a4a;
  display: flex;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 450px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignupButton = styled.div`
  width: 180px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  font-weight: 600;
  font-size: 21px;
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
  width: 340px;
  height: 32px;
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
          <CoupleText style={{ fontSize: "16px", fontWeight: "600" }}>
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
