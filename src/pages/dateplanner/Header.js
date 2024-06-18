import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: blue;
  color: white;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      데이트 코스 만들기
    </HeaderContainer>
  );
};

export default Header;
