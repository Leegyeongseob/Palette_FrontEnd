import React from "react";
import styled from "styled-components";
import PaymentComponent from "./PaymentComponent";

const PopupOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1); /* 투명도를 낮춤 */
  backdrop-filter: blur(2px); /* 블러 효과 추가 */
  &.openModal {
    display: flex;
    animation: modal-bg-show 0.3s;
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 350px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopTitle = styled.div`
  width: 90%;
  height: 15%;
  padding-left: 1%;
  font-size: 1.35rem;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: flex-start;
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
  height: 30%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaTwo = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaThr = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
`;
const Strikethrough = styled.div`
  text-decoration: line-through;
`;

const CloseDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1%;
`;
const CloseButton = styled.div`
  width: 10%;
  height: 90%;
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

const TemaPop = (props) => {

// 결제
  const handlePaymentSuccess = () => {
    console.log("Payment was successful!");
    // 결제 성공 후 추가적인 처리를 여기에 작성
  };
    const { open, close } = props;
    return (
      <PopupOverlay className={open ? "openModal" : ""}>
        {open && (
          <Popup>
          <PopTitle>테마 구매</PopTitle>
          <PopBoard>
            <BuyTema>
              <TemaSky>
                <TemaInfo>
                  <TemaOne>SkyBlue Tema</TemaOne>
                  <TemaTwo>파격세일!!</TemaTwo>
                  <TemaThr>
                    <Strikethrough>9900원</Strikethrough>={">"}1000원
                  </TemaThr>
                  <PaymentComponent
                    onPaymentSuccess={handlePaymentSuccess}
                    amount={1000}
                    order={"Palette SkyBlue Pink Tema 구매"}
                  />
                </TemaInfo>
              </TemaSky>
            </BuyTema>
            <BuyTema>
              <TemaBlack>
                <TemaInfo>
                  <TemaOne>Black Tema</TemaOne>
                  <TemaTwo>파격세일!!</TemaTwo>
                  <TemaThr>
                    <Strikethrough>59900원</Strikethrough>={">"}1500원
                  </TemaThr>
                  <PaymentComponent
                    onPaymentSuccess={handlePaymentSuccess}
                    amount={1500}
                    order={"Palette Black Pink Tema 구매"}
                  />
                </TemaInfo>
              </TemaBlack>
            </BuyTema>
            <BuyTema>
              <TemaPink>
                <TemaInfo>
                  <TemaOne>Pink Tema</TemaOne>
                  <TemaTwo>파격세일!!</TemaTwo>
                  <TemaThr>
                    <Strikethrough>129800원</Strikethrough>={">"}2000원
                  </TemaThr>
                  <PaymentComponent
                    onPaymentSuccess={handlePaymentSuccess}
                    amount={2000}
                    order={"Palette Album Pink Tema 구매"}
                  />
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
  export default TemaPop;
  