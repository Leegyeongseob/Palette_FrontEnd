import styled from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const IconDiv = styled.div`
  width: 24.6vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputDiv = styled.div`
  width: 24.6vw;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 450px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FindButton = styled.div`
  width: 180px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  font-size: 23px;
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
  width: 340px;
  height: 32px;

  display: flex;
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
`;
const RegisterationInput1 = styled.input`
  width: 120px;
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
const FindEmail = () => {
  return (
    <Contain>
      <IconDiv>
        <FaMagnifyingGlass size={100} color="rgba(0,0,0,0.7)" />
      </IconDiv>
      <InputDiv>
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
      <ButtonDiv>
        <Link to="/login-page" style={{ textDecoration: "none" }}>
          <FindButton>찾기</FindButton>
        </Link>
      </ButtonDiv>
    </Contain>
  );
};

export default FindEmail;
