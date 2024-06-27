import styled from "styled-components";
import GlobalStyle from '../../PaletteStyle.js';
import CloseBook from "../../img/palettePg/cbook.png";
import page1 from "../../img/palettePg/1p.png";
import page2 from "../../img/palettePg/2p.png";
import page3 from "../../img/palettePg/3p.png";
import { useEffect, useRef, useState } from "react";
import Dots from './Dots';
import Header from './Header';

const Background = styled.div`
  width: 100%;
  height: 830vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;  
`;

const Intro = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
`;

const CloseBookImg = styled.div`
  width: 50%;
  height: 80%;
  background-image: url(${CloseBook});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const OpenBookImg = styled.div`
  width: 60%;
  height: 55%;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Intro1 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #feeee8;
`;

const Intro2 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff9f2;
`;

const PageIntro = styled.div`
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Outer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바를 숨깁니다 */
  }
`;

const PalettePage = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const pageHeight = window.innerHeight;
      let nextPage = currentPage;

      if (deltaY > 0) {
        if (currentPage < 9) {
          nextPage = currentPage + 1;
        }
      } else {
        if (currentPage > 1) {
          nextPage = currentPage - 1;
        }
      }

      const nextPageOffset = nextPage === 9 ? 30 : 0;
      const scrollPosition =
        pageHeight * (nextPage - 1) +
        DIVIDER_HEIGHT * (nextPage - 1) +
        nextPageOffset;

      if (outerDivRef.current) {
        outerDivRef.current.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: "smooth",
        });
      }

      setCurrentPage(nextPage);
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }

    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const pageHeight = window.innerHeight;
    const nextPageOffset = page === 9 ? 30 : 0;
    const scrollPosition =
      pageHeight * (page - 1) + DIVIDER_HEIGHT * (page - 1) + nextPageOffset;

    if (outerDivRef.current) {
      outerDivRef.current.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    <GlobalStyle/>
      <Dots currentPage={currentPage} onPageChange={handlePageChange} />
      <Outer ref={outerDivRef}>
        <Background>
          <Header />
          <Intro>
          <PageIntro>
            연애의 시작,
            </PageIntro>
            <CloseBookImg />
            <PageIntro>
              팔레트
            </PageIntro>
          </Intro>
          <Intro1>
            <OpenBookImg imageurl={page1} />
            <PageIntro>
            지금 연애하고 계신가요?
            </PageIntro>
          </Intro1>
          <Intro2>
            <PageIntro>
            팔레트를 시작하세요!
            </PageIntro>
            <OpenBookImg imageurl={page2} />
          </Intro2>
          <Intro1>
            <OpenBookImg imageurl={page3} />
            <PageIntro>
            팔레트는 연인과 더 사랑스럽게 소통하고,
            </PageIntro>
          </Intro1>
          <Intro2>
            <PageIntro>
            소중한 추억을 손쉽게 저장할 수 있습니다.
            </PageIntro>
            <OpenBookImg imageurl={page2} />
          </Intro2>
          <Intro1>
            <OpenBookImg imageurl={page3} />
            <PageIntro>둘만의 추억,</PageIntro>
          </Intro1>
          <Intro2>
            <PageIntro>특별한 기억,</PageIntro>
            <OpenBookImg imageurl={page2} />
          </Intro2>
          <Intro1>
            <OpenBookImg imageurl={page3} />
            <PageIntro>추억을 만들어보세요!</PageIntro>
          </Intro1>
          <Footer></Footer>
        </Background>
      </Outer>
    </>
  );
};

export default PalettePage;
