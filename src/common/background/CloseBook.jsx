import styled from "styled-components";
import closebook from "../../img/background/closebook.png";
import theme3 from "../../img/background/theme/3.jpg";
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
const BookTheme = styled.div`
  width: 24.5vw;
  height: 78vh;
  margin-top: 7vh;
  margin-left: 3vw;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
`;
const LogoDiv = styled.div`
  width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const Logo = styled.img`
  width: 140px;
  height: 140px;
`;
const Contents = styled.div`
  width: 418px;
  height: 59vh;
`;
const Book = styled.div`
  width: 38vw;
  height: 100vh;
  background-image: url(${closebook});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
`;

const CloseBook = () => {
  return (
    <Background>
      <Book>
        <BookTheme>
          <LogoDiv>
            <Link to="/not-login">
              <Logo alt="logo" src={logo} />
            </Link>
          </LogoDiv>
          <Contents>
            <Outlet />
          </Contents>
        </BookTheme>
      </Book>
    </Background>
  );
};

export default CloseBook;
