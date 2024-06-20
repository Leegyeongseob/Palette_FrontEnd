import styled from "styled-components";
import theme6 from "../../img/background/theme/6.jpg";
import theme12 from "../../img/background/theme/12.jpg";
import theme8 from "../../img/background/theme/8.jpg";
import theme3 from "../../img/background/theme/3.jpg";
import clothesBg from "../../img/background/theme/clothes_background.jpg";
import boardBg from "../../img/background/theme/board_background.png";
import { Link } from "react-router-dom";
const BookMarkDiv = styled.div`
  width: 360px;
  height: 100px;

  display: flex;
  justify-content: space-between;
`;
const BookMarks = styled.div`
  width: 50px;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px 10px 0 0;
  font-size: 14px;
  font-weight: 600;
  writing-mode: vertical-lr;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-position: center;
  background-size: cover;
  cursor: pointer;
  border-bottom: none;
`;
const StyledLink = styled(Link)`
  text-decoration: none; // 링크의 기본 밑줄 스타일 제거
  color: #000; // 링크의 폰트 색상 지정
`;
const BookMark = () => {
  return (
    <BookMarkDiv>
      <StyledLink to="/date-diary">
        <BookMarks imageurl={theme3}>다이어리</BookMarks>
      </StyledLink>
      <StyledLink to="/date-album">
        <BookMarks imageurl={theme8}>갤러리</BookMarks>
      </StyledLink>
      <StyledLink to="/date-clothes">
        <BookMarks imageurl={clothesBg}>데이트룩</BookMarks>
      </StyledLink>
      <StyledLink to="/dateplanner">
        <BookMarks imageurl={theme6}>데이트코스</BookMarks>
      </StyledLink>
      <StyledLink to="/board-guestbook">
        <BookMarks imageurl={boardBg}>게시판</BookMarks>
      </StyledLink>
      <StyledLink to="/chat">
        <BookMarks imageurl={theme12}>채팅</BookMarks>
      </StyledLink>
    </BookMarkDiv>
  );
};

export default BookMark;
