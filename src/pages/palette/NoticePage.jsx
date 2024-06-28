import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./Header";
import Footer from "./Footer";

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
`;

const Board = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
`;

const NoticePage = () => {
  return (
    <>
      <Globalstyle />
      <Background>
        <Header />
        <Board></Board>
        <Footer />
      </Background>
    </>
  );
};

export default NoticePage;
