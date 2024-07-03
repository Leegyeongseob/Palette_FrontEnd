// src/pages/AdPage.js
import React from 'react';
import { styled } from 'styled-components';
import Globalstyle from '../../PaletteStyle';
import Header from './paletteImport/Header';
import Footer from './paletteImport/Footer';

const Background = styled.div`
  width: 100%;
  height: auto;
  background-color: #feeee8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdWrapper = styled.div`
  width: 90%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdPage = () => {
  return (
    <>
      <Globalstyle />
      <Header />
      <Background>
        <AdWrapper>
        </AdWrapper>
      </Background>
      <Footer />
    </>
  );
};

export default AdPage;
