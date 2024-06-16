import styled from "styled-components";
import closebook from "../../img/background/closebook.png";
import pinkcloud from "../../img/background/pinkcloud.jpeg";
import logo from "../../img/background/logo.png";
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
const BookSign = styled.div`
  width: 24.5vw;
  height: 78vh;
  margin-top: 7vh;
  margin-left: 3vw;
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
        <BookSign>
          <LogoDiv>
            <Logo alt="logo" src={logo} />
          </LogoDiv>
        </BookSign>
      </Book>
    </Background>
  );
};

export default CloseBook;
