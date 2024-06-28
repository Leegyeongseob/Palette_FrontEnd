import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: flex-end;

`;

const CloseButton = styled.button`
  position: absolute;
  
  
  background: none;
  border: none;
  font-size: 1.5rem;
  z-index: 5;
`;

const MapModal = ({ isOpen, onClose, children, mapContainerRef }) => {
  useEffect(() => {
    if (isOpen && mapContainerRef.current) {
      const { kakao } = window;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 위치 설정
        level: 3, // 확대 레벨 설정
      };
      new kakao.maps.Map(mapContainerRef.current, mapOption);
    }
  }, [isOpen, mapContainerRef]);

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
        <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default MapModal;
