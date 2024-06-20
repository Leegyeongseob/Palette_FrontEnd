import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleDday from "../../common/couple/CoupleDday";
import CoupleImg from "../../common/couple/CoupleImgMini";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const turnPageRight = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: right;
  }
  30% {
    transform: perspective(1600px) rotateY(25deg);
    transform-origin: right;
  } 
  100% {
    transform: perspective(1000px) rotateY(180deg);
    transform-origin: right;
  }
`;

const BookTheme = styled.div`
  width: 26vw;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${theme8});
  background-size: cover;
  display: flex;
  justify-content: space-between;
`;

const BookTheme2 = styled.div`
  width: 26vw;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.05vw;
  background-image: url(${theme8_1});
  background-size: cover;
  display: flex;
  justify-content: space-between;
`;

const BookSign = styled.div`
  width: 26vw;
  height: 67vh;
  background-image: url(${theme8});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  z-index: 2;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageRight} 1.8s forwards;
    `}
`;

const BookSign2 = styled.div`
  width: 26vw;
  height: 67vh;
  display: flex;
  border-left: 0.5px solid black;
`;

const BackButton = styled.div`
  width: 20px;
  height: 20px;
  font-weight: 600;
  font-size: 20px;
  margin-right: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ff6750;
  }
`;

const InputDetailDiv = styled.div`
  display: flex;
  justify-content: center; /* 중앙 배치 */
  align-items: center;
  width: 20px;
  height: 20px;
  margin-top: 30%;
`;

const AddButton = styled.div`
  width: 80px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
const AlbumTitle = styled.div`
  width: 13vw;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  color: #000;
  font-weight: 800;
`;

const CoupleDiv = styled.div`
  width: 330px;
  height: 170px;
  margin-left: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AddPic = styled.div`
  width: 90%;
  height: 30px;
  margin-left: 30px;
  border: none;
  outline: none;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  color: black;
  border-bottom: 1px solid #c8c8c8;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    color: #444444;
  }
`;

const DateAlbum3 = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/date-album2");
    }, 1800); // 애니메이션 지속 시간 후 페이지 이동
  };

  return (
    <>
      <InputDetailDiv>
        <BackButton onClick={handleBack}>◀◀</BackButton>
      </InputDetailDiv>
      <BookTheme>
        <BookSign animate={animate}>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <AlbumTitle>알콩 달콩이의 앨범</AlbumTitle>
          <AddPic>사진 업로드</AddPic>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2>
          <AddButton>테마 추가</AddButton>
          <AddButton>앨범 추가</AddButton>
        </BookSign2>
      </BookTheme2>
      <InputDetailDiv />
    </>
  );
};

export default DateAlbum3;
