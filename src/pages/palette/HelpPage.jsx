import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./Header";
import Category from "./Category";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
`;
const Container = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
  position: sticky;
`;

const BoardWrapper = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
`;

const HelpRoot = styled.div`
  width: 90%;
  height: 5%;
  display: flex;
  flex-direction: row;
  font-size: 0.8vw;
  justify-content: flex-start;
  align-items: center;
`;

const Root = styled(Link)`
  width: 6%;
  height: 100%;
  display: flex;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;
const Root2 = styled(Root)`
  width: 2%;
`;
const Root3 = styled(Root)`
  width: 6.5%;
`;
const Root4 = styled(Root)`
  width: 10%;
`;

const SearchBox = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HelpBoard = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const HelpPage = () => {
  return (
    <>
      <Globalstyle />
      <Background>
        <Header />
        <Container>
          <BoardWrapper>
            <Category />
            <Board>
              <HelpRoot>
                <Root to="/">Palette</Root>
                <Root2>{">"}</Root2>
                <Root3 to="/help">고객센터</Root3>
                <Root2>{">"}</Root2>
                <Root4 to="/help">자주 묻는 질문</Root4>
              </HelpRoot>
              <SearchBox></SearchBox>
              <HelpBoard></HelpBoard>
            </Board>
          </BoardWrapper>
        </Container>
        <Container></Container>
        <Footer />
      </Background>
    </>
  );
};

export default HelpPage;
