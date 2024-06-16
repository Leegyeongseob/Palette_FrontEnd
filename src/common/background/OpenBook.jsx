import styled from "styled-components";
import openbook from "../../img/background/openbook.png";
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
const BookSign = styled.div`
  width: 25.8vw;
  height: 71vh;
  margin-top: 1vh;
  margin-left: 1vw;
`;
const OpenBook = () => {
  return (
    <Background>
      <LogoDiv>
        <Logo alt="logo" src={logo} />
      </LogoDiv>
      <Book>
        <BookSign />
        <BookSign />
      </Book>
    </Background>
  );
};

export default OpenBook;
