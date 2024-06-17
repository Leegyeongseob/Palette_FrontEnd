import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
const PaletteDiv = styled.div`
  width: 418px;
  height: 280px;
`;
const LoginDiv = styled.div`
  width: 418px;
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
    <>
      <PaletteDiv></PaletteDiv>
      <LoginDiv>
        <Link to="/login-page">
          <StyledBsPersonCircle size={120} color="rgba(0,0,0,0.7)" />
        </Link>
      </LoginDiv>
    </>
  );
};
export default NotLogin;
