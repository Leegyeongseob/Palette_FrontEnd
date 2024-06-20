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
  height: 31.48vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 9.375vw;
  font-weight: normal;
  font-family: "Cafe24Lovingu";
`;
const LoginDiv = styled.div`
  width: 24.6vw;
  height: 20.986vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledBsPersonCircle = styled(BsPersonCircle)`
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
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
