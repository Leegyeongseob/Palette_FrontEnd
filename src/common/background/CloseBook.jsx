import styled from "styled-components";
import closebook from "../../img/background/closebook.png";
import theme3 from "../../img/background/theme/3.jpg";
import background from "../../img/background/theme/background3.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BookTheme = styled.div`
  width: 24vw;
  height: 74vh;
  margin-top: 9vh;
  margin-left: 3vw;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
`;
const LogoDiv = styled.div`
  width: 23.438vw;
  height: 15.74vh;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const Logo = styled.img`
  width: 7.292vw;
  height: 14.69vh;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const Contents = styled.div`
  width: 21.771vw;
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
