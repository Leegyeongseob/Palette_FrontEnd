import styled from "styled-components";
import closebook from "../../img/background/closebook.png";
import pinkcloud from "../../img/background/pinkcloud.jpeg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${pinkcloud});
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
  background: conic-gradient(
    rgba(205, 207, 196, 0.6) 0%,
    rgba(236, 205, 175, 0.6) 20%,
    rgba(224, 167, 135, 0.6) 40%,
    rgba(245, 141, 113, 0.6) 60%,
    rgba(135, 163, 159, 0.6) 80%,
    rgba(205, 207, 196, 0.6) 100%
  );
`;
const LogoDiv = styled.div`
  width: 418px;
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
