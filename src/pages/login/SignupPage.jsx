import styled from "styled-components";

const Contain = styled.div`
  width: auto;
  height: auto;
`;
const TitleDiv = styled.div`
  width: 24.6vw;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: border;
  color: #b44a4a;
  background-color: blue;
`;

const SignupPage = () => {
  return (
    <Contain>
      <TitleDiv>회원가입</TitleDiv>
    </Contain>
  );
};

export default SignupPage;
