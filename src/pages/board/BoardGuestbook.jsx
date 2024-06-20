import styled from "styled-components";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import { useState } from "react";

const BookTheme = styled.div`
  width: 53vw;
  height: 68.5vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${boardBg});
  background-size: cover;
  opadate: 0.8;
  display: flex;
`;
const BoardSide = styled.div`
  width: 25.5vw;
  height: 68.5vh;
`;
const ChangeBoardTitle = styled.div`
  margin-top: 1.5vh;
  margin-left: 17.5vw;
  width: 8vw;
  height: 1vh;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardTitle = styled.div`
  width: 25.5vw;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoupleDiv = styled.div`
  width: 25.5vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardGrayBar = styled.div`
  margin-top: 1.5vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #bebebe;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardPost = styled.div`
  margin-top: 2vh;
  margin-left: 18.5vw;
  width: 8vw;
  height: 1vh;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const BoardTable = styled.table`
  margin-top: 1vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 20vh;
  border-collapse: collapse;
`;

const BoardTh = styled.th`
  height: 3vh;
  min-width: 2vw;
  background-color: gray;
  border: 1px solid black;
  font-size: 12px;
  text-align: center;
`;

const BoardTd = styled.td`
  height: 3.2vh;
  border: 1px solid black;
  font-size: 12px;
  text-align: center;
`;
const NameHover = styled(BoardTd)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const CenterArea = styled.div`
  width: 1.5vw;
  height: 68.5vh;
  background-color: black;
`;
const GuestbookSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
  background-color: blue;
`;
const PaginationContainer = styled.div`
  margin-top: 2vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const data = [
  { id: 10, name: "알콩이의 생일파티~", date: "2024-06-20" },
  { id: 9, name: "한강 데이트!!", date: "2024-06-11" },
  { id: 8, name: "2박 3일 부산여행 기록", date: "2024-06-03" },
  { id: 7, name: "달콩이의 친구들과의 모임~", date: "2024-06-01" },
  { id: 6, name: "100일 기념일 데이트 기록", date: "2024-05-25" },
  { id: 5, name: "어버이날 기념으로 서로의 부모님 챙기기", date: "2024-05-08" },
  { id: 4, name: "벚꽃이 흩날리는 석촌호수~~", date: "2024-04-03" },
  { id: 3, name: "알콩이와 달콩이의 호캉스", date: "2024-03-25" },
  { id: 2, name: "달콩이와 홍대 데이트", date: "2024-03-02" },
  { id: 1, name: "첫 데이트 기념~", date: "2024-02-05" },
];
const itemsPerPage = 10; // 페이지 당 보여줄 항목 수

const BoardGuestbook = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 번호 클릭 시 이벤트 처리 함수
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <BookTheme>
      <BoardSide>
        <ChangeBoardTitle>게시판 이름 변경</ChangeBoardTitle>
        <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
        <CoupleDiv>
          <CoupleImg />
        </CoupleDiv>
        <BoardGrayBar />
        <BoardPost>새 게시물</BoardPost>
        <BoardTable>
          <thead>
            <tr>
              <BoardTh>ID</BoardTh>
              <BoardTh>Name</BoardTh>
              <BoardTh>Date</BoardTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <BoardTd>{item.id}</BoardTd>
                <NameHover>{item.name}</NameHover>
                <BoardTd>{item.date}</BoardTd>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <PaginationContainer>
          {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
            <PaginationButton
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              style={{
                fontWeight: currentPage === index + 1 ? "bold" : "normal",
              }}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      </BoardSide>
      <CenterArea></CenterArea>
      <GuestbookSide></GuestbookSide>
    </BookTheme>
  );
};
export default BoardGuestbook;