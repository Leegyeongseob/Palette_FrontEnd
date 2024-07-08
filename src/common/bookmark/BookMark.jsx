import styled from "styled-components";
import theme6 from "../../img/background/theme/6.jpg";
import theme12 from "../../img/background/theme/12.jpg";
import theme8 from "../../img/background/theme/8.jpg";
import theme3 from "../../img/background/theme/3.jpg";
import clothesBg from "../../img/background/theme/clothes_background.jpg";
import boardBg from "../../img/background/theme/board_background.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../pages/datediary/Modal";
import soleModalImg from "../../img/mainImg/솔로잠금.gif";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
const BookMarkDiv = styled.div`
  width: 18.75vw;
  height: 10.493vh;

  display: flex;
  justify-content: space-between;
`;
const BookMarks = styled.div`
  width: 2.604vw;
  height: 10.493vh;
  border: 1px solid #000;
  border-radius: 10px 10px 0 0;
  font-size: 0.665vw;
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

const BookMark = () => {
  const navigator = useNavigate();
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const email = sessionStorage.getItem("email");
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  //솔로 함수
  const soloModal = () => {
    setModalOpen(true);
    setModalContent("커플 연결을 위해 로그인 페이지로 이동합니다.");
  };
  const isCoupleAxios = async () => {
    const coupleName = await MemberAxiosApi.coupleNameSearch(email);
    const resCouple = await MemberAxiosApi.isCoupleTrue(coupleName.data);
    return resCouple.data;
  };
  const OpenDiaryOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/date-diary");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenAlbumOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/date-album");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenClothesOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/date-clothes");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenDateplannerOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/dateplanner");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenBoardOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/board-guestbook");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenChatOnClickHandler = async () => {
    if ((await isCoupleAxios()) === true) {
      navigator("/chat");
    } else {
      //모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };

  return (
    <BookMarkDiv>
      <Modal
        open={modalOpen}
        header="솔로는 웁니다."
        type={true}
        confirm={codeModalOkBtnHandler}
        img={soleModalImg}
      >
        {modalContent}
      </Modal>
      <BookMarks imageurl={theme3} onClick={OpenDiaryOnClickHandler}>
        다이어리
      </BookMarks>
      <BookMarks imageurl={theme8} onClick={OpenAlbumOnClickHandler}>
        갤러리
      </BookMarks>
      <BookMarks imageurl={clothesBg} onClick={OpenClothesOnClickHandler}>
        데이트룩
      </BookMarks>
      <BookMarks imageurl={theme6} onClick={OpenDateplannerOnClickHandler}>
        데이트코스
      </BookMarks>
      <BookMarks imageurl={boardBg} onClick={OpenBoardOnClickHandler}>
        게시판
      </BookMarks>
      <BookMarks imageurl={theme12} onClick={OpenChatOnClickHandler}>
        채팅
      </BookMarks>
    </BookMarkDiv>
  );
};

export default BookMark;
