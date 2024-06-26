import styled from "styled-components";
import CloseBook from "../../img/background/closebook.png";
import OpenBook from "../../img/background/openbook.png";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Background = styled.div`
  width: 100%;
  height: 830vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #feeee8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3rem;
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
  opacity: 90%;
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
  color: #000;
  &:hover {
    font-weight: bolder;
  }
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
  width: 50%;
  height: 75%;
  margin-left: 8%;
  background-image: url(${OpenBook});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const OpenBookImg2 = styled.div`
  width: 50%;
  height: 75%;
  margin-right: 8%;
  background-image: url(${OpenBook});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const Intro1 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #feeee8;
`;
const Intro2 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff9f2;
`;

const Footer = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = ({ num, currentPage, onClick }) => {
    const handleClick = () => {
      onClick(num);
    };
  
    return (
      <div
        style={{
          width: 10,
          height: 10,
          marginTop: 5,
          marginBottom: 5,
          border: "1px solid black",
          borderRadius: 999,
          backgroundColor: currentPage === num ? "gray" : "transparent",
          transitionDuration: 1000,
          transition: "background-color 0.5s",
          cursor: "pointer",
        }}
        onClick={handleClick}
      ></div>
    );
  };
  
  const Dots = ({ currentPage, onPageChange }) => {
    const totalPages = 9; 
  
    const handleDotClick = (page) => {
      onPageChange(page);
    };
  
    return (
      <div style={{ position: "fixed", top: "40%", right: 30 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid gray",
            borderRadius: 100,
            width: 20,
            height: 180,
          }}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Dot
              key={index + 1}
              num={index + 1}
              currentPage={currentPage}
              onClick={handleDotClick}
            />
          ))}
        </div>
      </div>
    );
  };

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
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh
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

      const nextPageOffset = nextPage === 9 ? 30 : 0; // Footer의 높이 오프셋
      const scrollPosition =
        pageHeight * (nextPage - 1) + DIVIDER_HEIGHT * (nextPage - 1) + nextPageOffset;

      outerDivRef.current.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });

      setCurrentPage(nextPage);
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const pageHeight = window.innerHeight;
    const nextPageOffset = page === 9 ? 50 : 0; // Footer의 높이 오프셋
    const scrollPosition = pageHeight * (page - 1) + DIVIDER_HEIGHT * (page - 1) + nextPageOffset;

    outerDivRef.current.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Dots currentPage={currentPage}  onPageChange={handlePageChange} />
      <Outer ref={outerDivRef}>
        <Background>
          <Header>
            <Logo>Palette</Logo>
          </Header>
          <MenuBar>
            <MenuBox>
              <Menu to="/palette">Palette 소개</Menu>
              <Menu>고객센터</Menu>
              <Menu>공지사항</Menu>
              <Menu to="/">시작하기</Menu>
            </MenuBox>
          </MenuBar>
          <Intro>
            <CloseBookImg />
          </Intro>
          <Intro1>
          <OpenBookImg />
          </Intro1>
          <Intro2>
          <OpenBookImg2 /></Intro2> 
          <Intro1>
          <OpenBookImg /></Intro1>
          <Intro2>
          <OpenBookImg2 /></Intro2>
          <Intro1>
          <OpenBookImg /></Intro1>
          <Intro2>
          <OpenBookImg2 /></Intro2>
          <Intro1>
          <OpenBookImg /></Intro1>
          <Footer></Footer>
        </Background>
      </Outer>
    </>
  );
};

export default PalettePage;
