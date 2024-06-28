import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./Header";
import Category from "./Category";
import Footer from "./Footer";
import one from "../../img/loginImg/person-icon2.png"
import two from "../../img/loginImg/kakako.png"
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

const CustomerBox = styled.div`
  width: 90%;
  height: 21%;
  margin-top: 2%;   
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
  color: #303030;
`;

const BoxLeft = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 20px;
`

const BoxLeftUp = styled.div`
  width: 90%;
  height: 55%;
  font-size: 1.6vw;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
    
`
const BoxLeftDown = styled.div`
  width: 90%;
  height: 35%;
  font-size: 0.9vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const BoxRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 20px;
`
const BoxRightWrap = styled(Link)`
  width: 45%;
  height: 100%;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`

const BoxRightUp = styled.div`
  width: 90%;
  height: 65%;
  background-image: url(${one});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const BoxRightUp2 = styled.div`
  width: 90%;
  height: 65%;
  background-image: url(${two});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BoxRightDown = styled.div`
  width: 90%;
  height: 35%;
  font-size: 0.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HelpBoard = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const CustomerPage = () => {
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
                <Root3 to="/customer">고객센터</Root3>
              </HelpRoot>
              <CustomerBox>
                <BoxLeft>
                    <BoxLeftUp>무엇을 도와드릴까요 ?</BoxLeftUp>
                    <BoxLeftDown>고객센터 01025546626  |  평일 09:00 ~ 18:00  |  주말 및 공휴일 휴무</BoxLeftDown>
                </BoxLeft>
                <BoxRight>
                    <BoxRightWrap to="/customer/inquiry">
                        <BoxRightUp/>
                        <BoxRightDown>1:1 문의하기</BoxRightDown>
                    </BoxRightWrap>
                    <BoxRightWrap>
                        <BoxRightUp2/>
                        <BoxRightDown>카카오톡 문의</BoxRightDown>
                    </BoxRightWrap>
                </BoxRight>
              </CustomerBox>
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

export default CustomerPage;
