import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Contain = styled.div`
  width: auto;
  height: auto;
`;

const PaletteDiv = styled.div`
  @font-face {
    font-family: "Cafe24Lovingu";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Lovingu.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  width: 24.6vw;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 180px;
  font-weight: normal;
  font-family: "Cafe24Lovingu";
`;
const LoginDiv = styled.div`
  width: 24.6vw;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledBsPersonCircle = styled(BsPersonCircle)`
  cursor: pointer;
`;
const NotLogin = () => {
  return (
    <Contain>
      <PaletteDiv>Palette</PaletteDiv>
      <LoginDiv>
        <Link to="/login-page">
          <StyledBsPersonCircle size={120} color="rgba(0,0,0,0.7)" />
        </Link>
      </LoginDiv>
    </Contain>
  );
};
export default NotLogin;
