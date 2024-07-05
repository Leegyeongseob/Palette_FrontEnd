import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  &.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }
`;

const ModalSection = styled.section`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ModalMain = styled.main`
  padding: auto;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const ModalButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;
const ImgDiv = styled.div`
  width: 3vw;
  height: 20vh;
  border: none;
  background-color: purple;
`;
const Modal = (props) => {
  const { open, confirm, close, type, header, children } = props;
  return (
    <ModalOverlay className={open ? "openModal" : ""}>
      {open && (
        <ModalSection>
          <ModalHeader>
            {header}
            <CloseButton onClick={close}>&times;</CloseButton>
          </ModalHeader>
          <ModalMain>
            <ImgDiv />
            {children}
          </ModalMain>
          <ModalFooter>
            {type && <ModalButton onClick={confirm}>확인</ModalButton>}
            <ModalButton onClick={close}>취소</ModalButton>
          </ModalFooter>
        </ModalSection>
      )}
    </ModalOverlay>
  );
};
export default Modal;
