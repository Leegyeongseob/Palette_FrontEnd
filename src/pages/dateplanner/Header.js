import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 10vh;
  padding: 20px;
  background-color: blue;
  color: white;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  background: url(/mapmarker/category/AD5.png) no-repeat;
  background-size: 50px 50px;
`;

const Header = () => {
  return <HeaderContainer>데이트 코스 만들기</HeaderContainer>;
};

export default Header;
