import styled from "styled-components";
import openbook from "../../img/background/openbook.png";
import background from "../../img/background/theme/background.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoDiv = styled.div`
  width: 418px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 140px;
  height: 140px;
`;
const Book = styled.div`
  width: 63vw;
  height: 100vh;
  background-image: url(${openbook});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
`;
const OpenBook = () => {
  return (
    <Background>
      <LogoDiv>
        <Link to="/">
          <Logo alt="logo" src={logo} />
        </Link>
      </LogoDiv>
      <Book>
        <Outlet />
      </Book>
    </Background>
  );
};

export default OpenBook;
