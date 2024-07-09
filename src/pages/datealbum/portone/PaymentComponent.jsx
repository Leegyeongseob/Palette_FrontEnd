// PaymentComponent.jsx
import React, { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import styled from "styled-components";
import soleModalImg from "../../../img/commonImg/전구 아이콘.gif";
import Modal from "../../../pages/datediary/Modal";

const BuyButton = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.6rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const PaymentComponent = ({ onPaymentSuccess, amount }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("잘못된 요청입니다.");
  const [modalType, setModalType] = useState(false);

  const modalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePayment = async () => {
    const storeId = "store-7bad9ad7-1c77-49a1-b374-45668a8ef9cb"; // 포트원 관리자 콘솔에서 가져온 Store ID
    const channelKey = "channel-key-720b1a91-7a32-4fc4-ac44-40fa627f18b9"; // 포트원 관리자 콘솔에서 가져온 채널 키
    const paymentId = `pay-${crypto.randomUUID()}`;
    const totalAmount = amount; // 결제 금액
    const currency = "CURRENCY_KRW";
    const payMethod = "CARD";
    const customer = {
      fullName: "홍길동", // 구매자 이름 추가
      phoneNumber: "010-1234-5678", // 구매자 전화번호 추가
      email: "hong@domain.com", // 구매자 이메일 추가
    };

    try {
      const response = await PortOne.requestPayment({
        storeId: storeId,
        channelKey: channelKey,
        paymentId: paymentId,
        orderName: "Palette Album 페이지 구매",
        totalAmount: totalAmount,
        currency: currency,
        payMethod: payMethod,
        customer: customer,
        // 모바일 환경을 고려한 리디렉션 URL 설정
        redirectUrl: `${window.location.origin}/payment-redirect`,
      });

      if (response.code != null) {
        // 오류 발생
        setModalOpen(true);
        setModalType(false);
        setModalText("결제를 취소하였습니다.");
      } else {
        // 결제가 성공한 경우
        const notified = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/payment/complete`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.paymentId,
              // 추가적인 주문 정보를 여기에 전달
            }),
          }
        );

        if (notified.ok) {
          setModalOpen(true);
          setModalType(false);
          setModalText("결제 성공!");
          onPaymentSuccess();
        } else {
          setModalOpen(true);
          setModalText("결제 처리 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      setModalOpen(true);
      setModalText("결제 성공!");
      console.error("결제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <BuyButton onClick={handlePayment}>구매 하기</BuyButton>
      <Modal
        open={modalOpen}
        header="안내"
        close={closeModal}
        type={modalType}
        confirm={modalOkBtnHandler}
        img={soleModalImg}
      >
        {modalText}
      </Modal>
    </>
  );
};

export default PaymentComponent;
