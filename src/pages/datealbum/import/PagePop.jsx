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
  width: 650px;
  height: 325px; 
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
  width: 90%;
  height: 60%;
  margin-top: 1.2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: white;
`;

const BuyPage = styled.div`
  width: 50%;
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
const PageLeft = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  
  background-color: #eeeeee;
`;
const PageRight = styled.div`
  width: 90%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background-color: #eeeeee;
`;
const PageInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PageOne = styled.div`
  width: 100%;
  height: 30%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageTwo = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageThr = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
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

const PagePop = (props) => {

// 결제
  const handlePaymentSuccess = () => {
    console.log("Payment was successful!");
    // 결제 성공 후 추가적인 처리를 여기에 작성
  };
    const { open, close } = props;
    return (
      <PopupOverlay className={open ? "openModal" : ""}>
        {open && (
          <Popup >
          <PopTitle>페이지 구매</PopTitle>
          <PopBoard>
            <BuyPage>
              <PageLeft>
                <PageInfo>
                  <PageOne>페이지 1장 구매</PageOne>
                  <PageTwo>파격세일!!</PageTwo>
                  <PageThr>
                    <Strikethrough>5000원</Strikethrough>={">"}1000원
                  </PageThr>
                  <PaymentComponent
                    onPaymentSuccess={handlePaymentSuccess}
                    amount={1000}
                    order={"Palette Album 페이지 구매"}
                  />
                </PageInfo>
              </PageLeft>
            </BuyPage>
            <BuyPage>
              <PageRight>
                <PageInfo>
                  <PageOne>페이지 2장 구매</PageOne>
                  <PageTwo>파격세일!!</PageTwo>
                  <PageThr>
                    <Strikethrough>10000원</Strikethrough>={">"}1500원
                  </PageThr>
                  <PaymentComponent
                    onPaymentSuccess={handlePaymentSuccess}
                    amount={1500}
                    order={"Palette Album 페이지 2장 구매"}
                  />
                </PageInfo>
              </PageRight>
            </BuyPage>
          </PopBoard>
          <CloseDiv>
          <CloseButton onClick={close}>닫기</CloseButton>
          </CloseDiv>
        </Popup>
        )}
      </PopupOverlay>
    );
  };
  export default PagePop;
  