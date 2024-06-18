import styled from "styled-components";

const BookMarkDiv = styled.div`
  width: 320px;
  height: 100px;

  display: flex;
  justify-content: space-between;
  background-color: blue;
`;
const BookMarks = styled.div`
  width: 50px;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px 10px 0 0;
  font-size: 14px;
`;
const BookMark = () => {
  return (
    <BookMarkDiv>
      <BookMarks>다이어리</BookMarks>
      <BookMarks>갤러리</BookMarks>
      <BookMarks>데이트룩</BookMarks>
      <BookMarks>데이트코스</BookMarks>
      <BookMarks>게시판</BookMarks>
      <BookMarks>채팅</BookMarks>
    </BookMarkDiv>
  );
};

export default BookMark;
