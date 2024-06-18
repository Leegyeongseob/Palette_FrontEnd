import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
const Contain = styled.div`
  width: auto;
  height: auto;
`;
const PaletteDiv = styled.div`
  width: 24.6vw;
  height: 280px;
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
      <PaletteDiv></PaletteDiv>
      <LoginDiv>
        <Link to="/login-page">
          <StyledBsPersonCircle size={120} color="rgba(0,0,0,0.7)" />
        </Link>
      </LoginDiv>
    </Contain>
  );
};
export default NotLogin;
