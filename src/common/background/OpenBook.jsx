import styled from "styled-components";
import openbook from "../../img/background/openbook.png";
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
const LogoDiv = styled.div`
  width: 300px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 170px;
  height: 170px;
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
const BookTheme = styled.div`
  width: 52.6vw;
  height: 71vh;
  margin-top: 1vh;
  margin-left: 0.8vw;
  background: conic-gradient(
    rgba(205, 207, 196, 0.6) 0%,
    rgba(236, 205, 175, 0.6) 20%,
    rgba(224, 167, 135, 0.6) 40%,
    rgba(245, 141, 113, 0.6) 60%,
    rgba(135, 163, 159, 0.6) 80%,
    rgba(205, 207, 196, 0.6) 100%
  );
  display: flex;
  justify-content: space-between;
`;
const BookSign = styled.div`
  width: 25.8vw;
  height: 71vh;
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
        <BookTheme>
          <BookSign />
          <Outlet />
          <BookSign />
        </BookTheme>
      </Book>
    </Background>
  );
};

export default OpenBook;
