import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";

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
`;

const CenterArea = styled.div`
  width: 1.5vw;
  height: 68.5vh;
`;

const DetailsSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;

const EditBackContainer = styled.div`
  margin-top: 2vh;
  margin-left: 17vw;
  width: 16vw;
  height: 1vh;
  display: flex;
`;

const EditPost = styled.div`
  width: 4vw;
  height: 1vh;
  font-size: 13px;
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

const BackToGuestbook = styled.div`
  width: 4vw;
  height: 1vh;
  font-size: 13px;
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

const DetailsNumber = styled.div`
  margin-left: 1.5vw;
  margin-top: 3vh;
  width: 10vw;
  height: 3vh;
  font-size: 24px;
  font-weight: 600;
`;

const DetailsTitle = styled.div`
  margin-left: 1.5vw;
  width: 22.8vw;
  height: 3vh;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsGrayBar = styled.div`
  margin-top: 1.5vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
`;

const DetailsMain = styled.div`
  margin-left: 1.5vw;
  margin-top: 1.2vh;
  width: 22.8vw;
  height: 45vh;
  font-weight: 600;
`;

const itemsPerPage = 10;

const BoardDetails = ({ boardData, currentPage, setCurrentPage }) => {
  const [boardDetails, setBoardDetails] = useState(null); // State to store board details
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params

  // Function to fetch board details based on ID
  const fetchBoardDetails = async (id) => {
    try {
      // Example: Fetch board details from an API
      const response = await BoardAxios.get(`/board-details/${id}`);
      setBoardDetails(response.data); // Assuming response.data contains board details
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  useEffect(() => {
    // Fetch board details when component mounts
    if (id) {
      fetchBoardDetails(id);
    }
  }, [id]);

  const handleNameClick = (id) => {
    navigate(`/board-details/${id}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensure boardData is defined before slicing
  const currentData =
    boardData && boardData.length > 0
      ? boardData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];

  return (
    <BookTheme>
      <BoardSide>
        <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
        <CoupleDiv>
          <CoupleImg />
        </CoupleDiv>
        <BoardGrayBar />
        <Link to="/board-write" style={{ textDecoration: "none" }}>
          <BoardPost>새 게시물</BoardPost>
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
          {[
            ...Array(
              Math.ceil((boardData && boardData.length) || 0 / itemsPerPage)
            ),
          ].map((_, index) => (
            <BoardPaginationButton
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              style={{
                fontWeight: currentPage === index + 1 ? "bold" : "normal",
              }}
            >
              {index + 1}
            </BoardPaginationButton>
          ))}
        </BoardPaginationContainer>
      </BoardSide>
      <CenterArea></CenterArea>
      {boardDetails && ( // Render DetailsSide if boardDetails is not null
        <DetailsSide>
          <EditBackContainer>
            <EditPost>수정하기</EditPost>
            <Link to="/board-guestbook" style={{ textDecoration: "none" }}>
              <BackToGuestbook>돌아가기</BackToGuestbook>
            </Link>
          </EditBackContainer>
          <DetailsNumber>No. {boardDetails.id}</DetailsNumber>
          <DetailsTitle>{boardDetails.title}</DetailsTitle>
          <DetailsGrayBar />
          <DetailsMain>{boardDetails.content}</DetailsMain>
        </DetailsSide>
      )}
    </BookTheme>
  );
};

export default BoardDetails;
