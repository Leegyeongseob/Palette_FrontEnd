import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AddPhoto from "../../img/board/AddPhoto.png";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseBoard";

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
`;

const CenterArea = styled.div`
  width: 1.5vw;
  height: 68.5vh;
`;

const WriteSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;
const BackToGuestbook = styled.div`
  margin-top: 2vh;
  margin-left: 19vw;
  width: 8vw;
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
const WriteTitle = styled.div`
  margin-left: 1.5vw;
  margin-top: 4vh;
  width: 22.8vw;
  height: 7vh;
  display: flex;
`;
const WriteTitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 30px;
`;
const WriteGrayBar = styled.div`
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WriteAddPhoto = styled.button`
  margin-top: 1.2vh;
  margin-left: 1.5vw;
  width: 2vw;
  height: 3.5vh;
  background-image: url(${AddPhoto});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`;
const WriteMain = styled.div`
  margin-left: 1.5vw;
  margin-top: 1.2vh;
  width: 22.8vw;
  height: 40vh;
  display: flex;
  align-items: flex-start;
`;
const WriteMainInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  resize: none; /* 크기 조정 불가능하도록 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */
`;
const WritePost = styled.div`
  margin-top: 2vh;
  margin-left: 19vw;
  width: 8vw;
  height: 1vh;
  font-size: 16px;
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

const itemsPerPage = 10; // 페이지 당 보여줄 항목 수

const BoardWrite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [boardData, setBoardData] = useState([]); // 백엔드에서 가져올 데이터 상태
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // 페이지 마운트 시 백엔드에서 데이터 가져오기
  useEffect(() => {
    fetchBoardData();
  }, []);

  const fetchBoardData = async () => {
    try {
      const data = await BoardAxios.fetchBoardData();
      setBoardData(data);
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };

  const handleNameClick = (id) => {
    navigate(`/board-details/${id}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!file) return;

    const fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling can be added here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // 파일이 있는 경우 업로드를 진행하고 URL을 설정합니다.
    if (file) {
      const fileRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress handling can be added here if needed
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("파일 업로드 실패");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          submitBoard(downloadURL); // URL을 설정한 후 게시글을 제출합니다.
        }
      );
    } else {
      submitBoard(""); // 파일이 없는 경우 빈 URL로 게시글을 제출합니다.
    }
  };

  const submitBoard = async (imgUrl) => {
    const boardReqDto = {
      title,
      imgUrl,
      contents: content,
    };

    try {
      await BoardAxios.createBoard(boardReqDto);
      fetchBoardData(); // 게시글 생성 후 데이터 갱신
      navigate("/board-guestbook");
    } catch (error) {
      console.error("Failed to create board", error);
      alert("게시글 생성 실패");
    }
  };
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
          {[...Array(Math.ceil(boardData.length / itemsPerPage))].map(
            (_, index) => (
              <BoardPaginationButton
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                style={{
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </BoardPaginationButton>
            )
          )}
        </BoardPaginationContainer>
      </BoardSide>
      <CenterArea />
      <WriteSide>
        <Link to="/board-guestbook" style={{ textDecoration: "none" }}>
          <BackToGuestbook>돌아가기</BackToGuestbook>
        </Link>
        <WriteTitle>
          <WriteTitleInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </WriteTitle>
        <WriteGrayBar />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
        <WriteAddPhoto onClick={handleAddPhotoClick}></WriteAddPhoto>
        <WriteMain>
          <WriteMainInput
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </WriteMain>
        <WritePost onClick={handleSubmit}>게시하기</WritePost>
      </WriteSide>
    </BookTheme>
  );
};

export default BoardWrite;
