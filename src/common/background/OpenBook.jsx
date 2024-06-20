import styled from "styled-components";
import openbook from "../../img/background/openbook.png";
import background from "../../img/background/theme/background.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
import BookMark from "../bookmark/BookMark";

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
  width: 10vw;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BookMarkDiv = styled.div`
  width: 22vw;
  height: 170px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 8vh; // 추가된 부분
`;
const Logo = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
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
const TopContain = styled.div`
  width: auto;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OpenBook = () => {
  return (
    <Background>
      <TopContain>
        <BookMarkDiv />
        <LogoDiv>
          <Link to="/">
            <Logo alt="logo" src={logo} />
          </Link>
        </LogoDiv>
        <BookMarkDiv>
          <BookMark />
        </BookMarkDiv>
      </TopContain>
      <Book>
        <Outlet />
      </Book>
    </Background>
  );
};

export default OpenBook;
