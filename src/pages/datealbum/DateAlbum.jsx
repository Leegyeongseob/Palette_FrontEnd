import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleDday from "../../common/couple/CoupleDday";
import CoupleImg from "../../common/couple/CoupleImgMini";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1400px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
  }
`;

const BookTheme = styled.div`
  width: 26vw;
  height: 69vh;
  margin-top: 5vh;
  margin-left: 0.8vw;
  background-image: url(${theme8});
  background-size: cover;
  display: flex;
  justify-content: space-between;
`;

const BookTheme2 = styled.div`
  width: 26vw;
  height: 69vh;
  margin-top: 5vh;
  margin-left: 0.8vw;
  position: relative;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${theme8_1});
  background-size: cover;
  z-index: 1; /* FrontImage 보다 뒤에 위치 */
`;

const FrontImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${theme8_1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  z-index: 2;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
`;

const BookSign = styled.div`
  width: 26vw;
  height: 69vh;
`;

const BookSign2 = styled.div`
  display: flex;
  justify-content: center;
`;

const NextButton = styled.div`
  width: 20px;
  height: 20px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  z-index: 3;
  &:hover {
    color: purple;
  }
`;

const InputDetailDiv = styled.div`
  width: 26vw;
  height: 69vh;
  display: flex;
  justify-content: center; /* 중앙 배치 */
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;
const AlbumTitle = styled.div`
  width: 16vw;
  height: 4vh;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 800;
`;

const AddButton = styled.div`
  width: 70px;
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
const AddPic = styled.div`
  width: 90%;
  margin-left: 25px;
  border: none;
  outline: none;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  color: black;
  border-bottom: 1px solid #000;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
const CoupleDiv = styled.div`
  width: flex;
  height: flex;
  margin-left: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateAlbum = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/date-album2");
    }, 1200); // 애니메이션 지속 시간 후 페이지 이동
  };

  return (
    <>
      <BookTheme>
        <BookSign>
          <AlbumTitle>알콩 달콩이의 앨범</AlbumTitle>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <AddPic>사진 업로드</AddPic>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BackgroundImage />
        <FrontImage animate={animate}>
          <BookSign2>
            <AddButton>테마 추가</AddButton>
            <AddButton>앨범 추가</AddButton>
          </BookSign2>
          <InputDetailDiv>
            <NextButton onClick={handleNext}>▶</NextButton>
          </InputDetailDiv>
        </FrontImage>
      </BookTheme2>
    </>
  );
};

export default DateAlbum;
