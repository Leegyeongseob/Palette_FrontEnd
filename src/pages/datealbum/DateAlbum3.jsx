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
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 중앙 정렬 */
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;
const ContentWrapper2 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper2 = styled.div`
  width: 90%;
  height: 81%;
  background-color: #eccdaf;
  margin-top: 6%;
  display: flex;
  flex-wrap: wrap;
`;

const ImgBox2 = styled.div`
  width: 32%;
  height: 28%;
  background-color: gray;
  display: flex;
  margin-left: 1%;
  margin-top: 1%;
`;

const Dday = styled.div`
  width: 90%;
  height: 11%;
  font-size: 30px;
  margin-left: 5%;
  display: flex; /* 요소를 플렉스 박스로 설정 */
  justify-content: left; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
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
  width: 90%;
  height: 9%;
  justify-content: right;
  align-items: center;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
`;
const AddTema = styled.div`
  font-size: 14px;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
const AddAlbum = styled.div`
  font-size: 14px;
  color: black;
  font-weight: bolder;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    font-size: 15px;
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
          <ContentWrapper animate={animate}>
            <AddButton>
              <AddTema>사진 업로드</AddTema>
            </AddButton>
            <ImgWrapper2>
              <Dday>♥ D + 150 ♥</Dday>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
            </ImgWrapper2>
          </ContentWrapper>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2>
          <ContentWrapper2>
            <AddButton>
              <AddTema>테마 추가</AddTema>
              <AddAlbum>앨범 추가</AddAlbum>
            </AddButton>
            <ImgWrapper2>
              <Dday>알콩 ♥ 달콩</Dday>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
              <ImgBox2></ImgBox2>
            </ImgWrapper2>
          </ContentWrapper2>
        </BookSign2>
      </BookTheme2>
      <InputDetailDiv />
    </>
  );
};

export default DateAlbum3;
