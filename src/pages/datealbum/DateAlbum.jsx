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
  height: 33vh;
  background-color: #eccdaf;
  align-items: center;
  justify-content: center;
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
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgBox = styled.div`
  width: 15vh;
  height: 15vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1%;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: ${({ hasImage }) => (hasImage ? "pointer" : "default")}; 
    ${({ hasImage }) =>
      hasImage &&
      `
      & > ${Img} {
        transform: scale(1.1); /* 이미지 확대 효과 */
      }
      &::after {
        content: "삭제하기";
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 12px;
      }
    `}
  }
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
const PlusButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 24px;
  border-radius: 50px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`;


const DateAlbum = () => {
  const [animate, setAnimate] = useState(false);
  const [imgBoxes, setImgBoxes] = useState(Array(15).fill(null).map((_, index) => (index === 0 ? '+' : null)));
  const [images, setImages] = useState(Array(15).fill(null));
  const navigate = useNavigate();

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/date-album2");
    }, 1800); // 애니메이션 지속 시간 후 페이지 이동
  };
  
  const handleAddImage = (index) => {
    const newImgBoxes = [...imgBoxes];
    const newImages = [...images];

    newImgBoxes[index] = null; 
    if (index + 1 < newImgBoxes.length) {
      newImgBoxes[index + 1] = '+';
    }
    newImages[index] = require(`../../img/album/${index + 1}.jpeg`);
    setImgBoxes(newImgBoxes);
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    const newImgBoxes = [...imgBoxes];
    const newImages = [...images];

    newImages.splice(index, 1); // 클릭된 이미지를 배열에서 제거
    newImages.push(null); // 배열의 마지막에 null 추가

    // 기존 + 버튼 위치를 찾아 제거
    const plusIndex = newImgBoxes.indexOf('+');
    if (plusIndex !== -1) {
      newImgBoxes[plusIndex] = null;
    }

    // + 버튼을 마지막 null 위치에 추가
    const nextPlusIndex = newImages.indexOf(null);
    if (nextPlusIndex !== -1 && nextPlusIndex < newImgBoxes.length) {
      newImgBoxes[nextPlusIndex] = '+';
    }

    setImgBoxes(newImgBoxes);
    setImages(newImages);
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
          {imgBoxes.slice(0, 6).map((box, index) => (
            <ImgBox
              key={index}
              onClick={() => images[index] && handleDeleteImage(index)}
              hasImage={images[index] !== null}
            >
              {images[index] && <Img src={images[index]} alt={`album-${index + 1}`} />}
              {box === '+' && (
                <PlusButton onClick={() => handleAddImage(index)}>+</PlusButton>
              )}
            </ImgBox>
          ))}
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
            {imgBoxes.slice(6, 15).map((box, index) => (
              <ImgBox
                key={index + 6}
                onClick={() => images[index + 6] && handleDeleteImage(index + 6)}
                hasImage={images[index + 6] !== null}
              >
                {images[index + 6] && <Img src={images[index + 6]} alt={`album-${index + 7}`} />}
                {box === '+' && (
                  <PlusButton onClick={() => handleAddImage(index + 6)}>+</PlusButton>
                )}
              </ImgBox>
            ))}
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
