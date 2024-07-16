import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import CandyImg from "../../img/mainImg/커플2.jpg";
import Guestbook from "./Guestbook";
import BoardAxios from "../../axiosapi/BoardAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const BookTheme = styled.div`
  width: 53vw;
  height: 68.5vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${boardBg});
  background-size: cover;
  opacity: 0.8;
  display: flex;
`;
const BoardSide = styled.div`
  width: 25.5vw;
  height: 68.5vh;
  position: relative;
`;
const BoardTitle = styled.div`
  margin-top: 2.5vh;
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
  background-color: #b0b0b0;
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
  color: black;
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
  table-layout: fixed;
  border-collapse: collapse;
`;

const BoardTh = styled.th`
  height: 3vh;
  background-color: gray;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  vertical-align: middle;
  &:nth-child(1) {
    width: 3vw;
  }
  &:nth-child(3) {
    width: 4vw;
  }
`;

const BoardTd = styled.td`
  height: 3.2vh;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

const NameHover = styled(BoardTd)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const BoardPaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 3vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardPaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CenterArea = styled.div`
  width: 1.5vw;
  height: 68.5vh;
`;

const GuestbookSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;

const itemsPerPage = 10;
const maxPageButtons = 5;

const GuestBoardGuestbook = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  const [currentPage, setCurrentPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardDataCN();
    isMyHomeAxios();
  }, []);

  //본인만 "새 게시물 작성"이 보이도록 하는 axios
  const isMyHomeAxios = async () => {
    const myCoupleNameData = await MemberAxiosApi.renderCoupleNameSearch(email);
    if (myCoupleNameData.data !== coupleName) {
      setIsMyHome(false);
    } else {
      setIsMyHome(true);
    }
  };

  const fetchBoardDataCN = async () => {
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      setBoardData(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };

  const handleNameClick = (id) => {
    navigate(`/${coupleName}/board-details/${id}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(boardData.length / itemsPerPage);

  const getPaginationButtons = () => {
    const buttons = [];
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <BoardPaginationButton
          key={i}
          onClick={() => handleClick(i)}
          style={{
            fontWeight: currentPage === i ? "bold" : "normal",
          }}
        >
          {i}
        </BoardPaginationButton>
      );
    }

    return buttons;
  };

  return (
    <BookTheme>
      <BoardSide>
        <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
        <CoupleDiv>
          <CoupleImg />
        </CoupleDiv>
        <BoardGrayBar />
        <Link
          to={`/${coupleName}/board-write`}
          style={{ textDecoration: "none" }}
        >
          {isMyHome && <BoardPost>새 게시물 작성</BoardPost>}
        </Link>
        <BoardTable>
          <thead>
            <tr>
              <BoardTh>ID</BoardTh>
              <BoardTh>Name</BoardTh>
              <BoardTh>Date</BoardTh>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <BoardTd>{item.id}</BoardTd>
                <NameHover onClick={() => handleNameClick(item.id)}>
                  {item.title}
                </NameHover>
                <BoardTd>{item.regDate}</BoardTd>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <BoardPaginationContainer>
          <BoardPaginationButton
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; 이전
          </BoardPaginationButton>
          {getPaginationButtons()}
          <BoardPaginationButton
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음 &gt;
          </BoardPaginationButton>
        </BoardPaginationContainer>
      </BoardSide>
      <CenterArea />
      <GuestbookSide>
        <Guestbook />
      </GuestbookSide>
    </BookTheme>
  );
};

export default GuestBoardGuestbook;
