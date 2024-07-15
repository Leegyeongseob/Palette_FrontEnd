import React, { useState, useEffect, useRef } from 'react';
import { keyframes, styled } from 'styled-components';
import { VelocityComponent } from 'velocity-react';
import Header from './paletteImport/Header';
import Footer from './paletteImport/Footer';
import paletteLogo from "../../img/background/paletteLogo.png";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';

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
`;

const AdLine = styled.div`
  width: 100%;
  height: 13vh;
  background-color: #d0d7e9;
`;
const AdLineTop = styled.div`
  width: 100%;
  height: 1vh;
  background-color: #d0d7e9;
`;

const AdWrapper = styled.div`
  width: 100%;
  height: 105vh;
  background-color: #fff9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AdWrapper2 = styled.div`
  width: 100%;
  height: 105vh;
  background-color: #fff9f2;
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

const StyledSwiper = styled(Swiper)`
  width: 90%;
  height: 50%; // 원하는 높이로 설정
  .swiper-pagination-bullet {
    background: #4b6dc5; // 페이지네이션 점 색상 변경
    width: 0.5vw;
    height: 1vh;
    
  }
  .swiper-button-next, .swiper-button-prev {
    color: #efefef; // 네비게이션 버튼 색상 변경
  }
`;

const StyledSwiper2 = styled(Swiper)`
  width: 90%;
  height: 90%; // 원하는 높이로 설정
  .swiper-pagination-bullet {
    background: #4b6dc5; // 페이지네이션 점 색상 변경
    width: 0.7vw;
    height: 1.4vh;
  }
  .swiper-button-next, .swiper-button-prev {
    color: #efefef; // 네비게이션 버튼 색상 변경
  }
`;

const Slide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: #d0d7e9;
`;

const AdPage = () => {
  const [letters, setLetters] = useState([]);
  const [bgColor, setBgColor] = useState('#feeee8');

  // 각각의 스와이퍼를 제어하기 위한 ref 선언
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);


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
      setBgColor('#fff9f2');
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
        <AdLineTop></AdLineTop>
        <AdTitle bgColor={bgColor}>
          <PaletteImg data-animate />
          <AdTitleWrapper>
            {letters}
          </AdTitleWrapper>
        </AdTitle>
        <AdLine></AdLine>

        <AdWrapper2>
        <StyledSwiper2
            key="swiper2"
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 9000 }}
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiper2Ref.current = swiper)} 
          >
            <Slide>Slide 1</Slide>
            <Slide>Slide 2</Slide>
            <Slide>Slide 3</Slide>
            <Slide>Slide 4</Slide>
          </StyledSwiper2>
        </AdWrapper2>        
        <AdLine></AdLine>
        <AdWrapper>
          <StyledSwiper
            key="swiper1"
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiper1Ref.current = swiper)} // ref 설정
          >
            <Slide>Slide 1</Slide>
            <Slide>Slide 2</Slide>
            <Slide>Slide 3</Slide>
            <Slide>Slide 4</Slide>
            <Slide>Slide 5</Slide>
            <Slide>Slide 6</Slide>  
          </StyledSwiper>
        </AdWrapper>

      </Background>
      <Footer />
    </Body>
  );
};

export default AdPage;
