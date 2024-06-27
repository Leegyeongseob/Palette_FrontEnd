import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from "../../img/background/logo.png";
import PLogo from "../../img/background/paletteLogo.png";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #feeee8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PaletteLogo = styled(Link)`
  width: 45%;
  height: 70%;
  display: flex;
  margin-top: 1%;
  background-image: url(${PLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: start;
`;

const CenterLogo = styled(Link)`
  width: 10%;
  height: 120%;
  display: flex;
  margin-top: 2.5%;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1001;
`;

const MenuBar = styled.div`
  width: 100%;
  height: 5vh;
  background-color: #feeee8;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  opacity: 95%;
`;

const MenuBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Menu = styled(Link)`
  width: 7%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 0.85vw;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const Header = () => (
  <>
    <HeaderContainer>
      <LogoBox>
        <PaletteLogo to="/"></PaletteLogo>
        <CenterLogo to="/"></CenterLogo>
      </LogoBox>
    </HeaderContainer>
    <MenuBar>
      <MenuBox>
        <Menu to="/">Palette 소개</Menu>
        <Menu>고객센터</Menu>
        <Menu>공지사항</Menu>
        <Menu to="/not-login">시작하기</Menu>
      </MenuBox>
    </MenuBar>
  </>
);

export default Header;
