import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1600px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookSign2 = styled.div`
  width: 26vw;
  height: 67vh;
  background-image: url(${theme8_1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  border-left: 0.5px solid black;
  overflow: hidden;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const NextButton = styled.div`
  width: 20px;
  height: 20px;
  font-weight: 600;
  font-size: 20px;
  margin-left: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ff6750;
  }
`;

const InputDetailDiv = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;

const ImgWrapper = styled.div`
  width: 90%;
  height: 50%;
  background-color: #eccdaf;
  margin-top: 20%;
  display: flex;
  flex-wrap: wrap;
`;

const ImgWrapper2 = styled.div`
  width: 90%;
  height: 81%;
  background-color: #eccdaf;
  margin-top: 6%;
  display: flex;
  flex-wrap: wrap;
`;

const ImgBox = styled.div`
  width: 32%;
  height: 48%;
  background-color: gray;
  display: flex;
  margin-left: 1%;
  margin-top: 1%;
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
  display: flex;
  justify-content: left;
  align-items: center;
`;

const AlbumTitle = styled.div`
  width: 90%;
  height: 4%;
  display: flex;
  align-items: center;
  font-size: 23px;
  color: #000;
  font-weight: 800;
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

const AddPic = styled.div`
  width: 90%;
  height: 3%;
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

const CoupleDiv = styled.div`
  width: 90%;
  height: 22%;
  margin-left: 100%;
  display: flex;
  align-items: center;
`;

const DateAlbum = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/date-album2");
    }, 1800); // 애니메이션 지속 시간 후 페이지 이동
  };

  return (
    <>
      <InputDetailDiv />
      <BookTheme>
        <BookSign>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <AlbumTitle>알콩 달콩이의 앨범</AlbumTitle>
          <AddPic>사진 업로드</AddPic>
          <ImgWrapper>
            <ImgBox></ImgBox>
            <ImgBox></ImgBox>
            <ImgBox></ImgBox>
            <ImgBox></ImgBox>
            <ImgBox></ImgBox>
            <ImgBox></ImgBox>
          </ImgWrapper>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <ContentWrapper animate={animate}>
            <AddButton>
              <AddTema>테마 추가</AddTema>
              <AddAlbum>앨범 추가</AddAlbum>
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
        </BookSign2>
      </BookTheme2>
      <InputDetailDiv>
        <NextButton onClick={handleNext}>▶▶</NextButton>
      </InputDetailDiv>
    </>
  );
};

export default DateAlbum;
