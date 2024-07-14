import styled from "styled-components";

const PopupOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.08); /* 투명도를 낮춤 */
  &.openModal {
    display: flex;
    animation: modal-bg-show 0.1s;
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  height: 240px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TitleDiv = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: flex-start;
`

const TitleLeft = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 1%;
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TitleRight = styled.div`
  width: 90%;
  height: 100%;
  padding-right: 1%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const TitleRightBtn = styled.div`
  width: 18%;
  height: 80%;
  background-color: #eccdaf;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const PopBoard = styled.div`
  width: 95%;
  height: 60%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: white;
`;

const BuyTema = styled.div`
  width: 33%;
  height: 90%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid darkgray;
  &:last-child {
    border-right: none;
  }
`;
const TemaSky = styled.div`
  width: 90%;
  height: 100%;
  background-color: #d9f2fc;
  display: flex;
`;
const TemaBlack = styled.div`
  width: 90%;
  height: 100%;
  background-color: #dadada;
  display: flex;
`;
const TemaPink = styled.div`
  width: 90%;
  height: 100%;
  background-color: #f6dee2;
  display: flex;
`;
const TemaInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TemaOne = styled.div`
  width: 100%;
  height: 60%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.93rem;
  margin-top: 2px;
  border: none;
  border-radius: 0.6rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const BuyButton = styled.div`
  padding: 0.4rem 0.7rem;
  font-size: 0.8rem;
  margin-bottom: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: #8e8e8e;
  }
`;

const TemaChange = (  {open, close,setBgColor} ) => {
    const userEmail = sessionStorage.getItem("email");
    const handleSetColor = (color) => () => {
        setBgColor(color);
        localStorage.setItem(`${userEmail}_themeColor`, color);
        close();
    };
    
    return (
      <PopupOverlay className={open ? "openModal" : ""}>
        {open && (
          <Popup>
            <TitleDiv>
          <TitleLeft>보유 테마 목록</TitleLeft>
          <TitleRight>
            <TitleRightBtn color="#eccdaf" onClick={handleSetColor("#eccdaf")}>기본테마</TitleRightBtn>
          </TitleRight>
          </TitleDiv>
          <PopBoard>
            <BuyTema>
              <TemaSky>
                <TemaInfo>
                  <TemaOne>SkyBlue Tema</TemaOne>
                  <BuyButton color="#d9f2fc" onClick={handleSetColor("#d9f2fc")}>변경 하기</BuyButton>
                </TemaInfo>
              </TemaSky>
            </BuyTema>
            <BuyTema>
              <TemaBlack>
                <TemaInfo>
                  <TemaOne>Black Tema</TemaOne>
                  <BuyButton color="#dadada" onClick={handleSetColor("#dadada")}>변경 하기</BuyButton>
                </TemaInfo>
              </TemaBlack>
            </BuyTema>
            <BuyTema>
              <TemaPink>
                <TemaInfo>
                  <TemaOne>Pink Tema</TemaOne>
                  <BuyButton color="#f6dee2" onClick={handleSetColor("#f6dee2")}>변경 하기</BuyButton>
                </TemaInfo>
              </TemaPink>
            </BuyTema>
          </PopBoard>
          <CloseDiv>
          <CloseButton onClick={close}>닫기</CloseButton>
          </CloseDiv>
        </Popup>
        )}
      </PopupOverlay>
    );
  };
  export default TemaChange;
  