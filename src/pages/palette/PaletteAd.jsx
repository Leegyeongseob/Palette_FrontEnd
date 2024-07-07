import React, { useState, useEffect } from 'react';
import { keyframes, styled } from 'styled-components';
import { VelocityComponent } from 'velocity-react';
import Header from './paletteImport/Header';
import Footer from './paletteImport/Footer';
import paletteLogo from "../../img/background/paletteLogo.png";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 1.5s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const Body = styled.div`
.no-scroll {
  overflow: hidden;
}
`

const Background = styled.div`
  width: 100%;
  height: auto;
  background-color: #feeee8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdTitle = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 1.2s;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4%;
`

const AdWrapper = styled.div`
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaletteImg = styled(AnimatedDiv)`
  width: 30%;
  height: 40%;
  background-image: url(${paletteLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AdTitleWrapper = styled.div`
  width: 50%;
  height: 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Letter = styled.div`
  opacity: 0;
  margin-top: 100px;
  font-size: 1.7rem;
  white-space: pre;
`;

const VelocityLetter = ({ letter, delay }) => (
  <VelocityComponent
    runOnMount
    animation={{ opacity: 1, marginTop: 0 }}
    duration={500}
    delay={delay}
  >
    <Letter>{letter}</Letter>
  </VelocityComponent>
);

const AdPage = () => {
  const [letters, setLetters] = useState([]);
  const [bgColor, setBgColor] = useState('#fff9f2');

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };
    const enableScroll = () => {
      document.body.style.overflow = '';
    };
    disableScroll();
    const text = "팔레트에 광고를 하고 싶으신가요?";
    const arr = text.split('').map((letter, index) => (
      <VelocityLetter
        key={index}
        letter={letter}
        delay={100 + index * 120} // 로고 애니메이션 이후에 시작
      />
    ));

    setTimeout(() => {
      setBgColor('#141414');
      setTimeout(() => {
        setLetters(arr);
      }, 1600);
    }, 1400); //배경색 변경

    setTimeout(() => {
      setBgColor('#feeee8');
    }, 2500);

    setTimeout(() => {
      enableScroll();
    }, 3800);

    return () => {
      enableScroll();
    };
  }, []);

  return (
    <Body>
      <Background>
        <Header bgColor={bgColor}/>
        <AdTitle bgColor={bgColor}>
          <PaletteImg data-animate />
          <AdTitleWrapper>
            {letters}
          </AdTitleWrapper>
        </AdTitle>
        <AdWrapper></AdWrapper>
      </Background>
      <Footer />
    </Body>
  );
};

export default AdPage;
