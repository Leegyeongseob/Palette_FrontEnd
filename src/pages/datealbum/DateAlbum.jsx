import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AlbumAxiosApi from "../../axiosapi/AlbumAxiosApi";
import PaymentComponent from "./portone/PaymentComponent";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import deleteImageFromFirebase from "../../firebase/firebaseAlbumDel";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseAlbum";

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
  font-size: 1.1vw;
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
  width: 7.4vw;
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
        transform: scale(1.18); /* 이미지 확대 효과 */
      }
      &::after {
        content: "삭제하기";
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 0.78vw;
      }
    `}
  }
`;

const Dday = styled.div`
  width: 90%;
  height: 11%;
  font-size: 1.4vw;
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
  font-size: 1.1vw;
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
  font-size: 0.78vw;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 0.81vw;
  }
`;
const AddAlbum = styled.div`
  font-size: 0.78vw;
  color: black;
  font-weight: bolder;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    font-size: 0.81vw;
  }
`;

const TitleLine = styled.div`
  width: 90%;
  height: 5%;
  border-bottom: 1px solid #c8c8c8;
`;

const CoupleDiv = styled.div`
  width: 90%;
  height: 22%;
  margin-left: 100%;
  display: flex;
  align-items: center;
`;
const PlusButton = styled.button`
  width: 2.5vw;
  height: 5vh;
  font-size: 1.4vw;
  border-radius: 50px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1); /* 투명도를 낮춤 */
  backdrop-filter: blur(3px); /* 블러 효과 추가 */
`;
const PopTitle = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: flex-start;
`;
const PopBoard = styled.div`
  width: 90%;
  height: 60%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: white;
`;
const BuyTema = styled.div`
  width: 50%;
  height: 80%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid darkgray;
  &:last-child {
    border-right: none;
  }
`;
const TemaPrice = styled.div`
  width: 100%;
  height: 50%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TemaInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TemaOne = styled.div`
  width: 10vw;
  height: 25vh;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaThr = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
`;
const Strikethrough = styled.div`
  text-decoration: line-through;
`;

const CloseButton = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  margin-top: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
const BuyButton = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.6rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const DateAlbum = () => {
  const [animate, setAnimate] = useState(false);
  const [imgBoxes, setImgBoxes] = useState(
    Array(15)
      .fill(null)
      .map((_, index) => (index === 0 ? "+" : null))
  );
  const [images, setImages] = useState(Array(15).fill(null));
  const navigate = useNavigate();
  const [isTemaPopup, setIsTemaPopup] = useState(false);
  const [isPagePopup, setIsPagePopup] = useState(false);
  const userEmail = sessionStorage.getItem("email");

  // 결제
  const handlePaymentSuccess = () => {
    console.log("Payment was successful!");
    // 결제 성공 후 추가적인 처리를 여기에 작성
  };

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/date-album2");
    }, 1800); // 애니메이션 지속 시간 후 페이지 이동
  };

  // 이미지 불러오기
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await AlbumAxiosApi.getImages(userEmail);
        const galleries = response.data;
        const updatedImages = Array(15).fill(null);
        galleries.slice(0, 15).forEach((image, index) => {
          updatedImages[index] = image.urls;
        });
        setImages(updatedImages);

        // 이미지를 기반으로 imgBoxes 배열 업데이트
        const newImgBoxes = Array(15).fill(null);
        const imageCount = galleries.length;
        if (imageCount < 15) {
          newImgBoxes[imageCount] = "+";
        }
        setImgBoxes(newImgBoxes);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchAlbum();
  }, [userEmail]);

  // 이미지 저장
  const handleAddImage = (index, file) => {
    const timestamp = new Date().getTime(); // 현재 타임스탬프 생성
    const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 이미지 URL을 먼저 화면에 표시
    const previewUrl = URL.createObjectURL(file);

    // 이미지와 imgBoxes 배열 업데이트
    const newImages = [...images];
    const newImgBoxes = [...imgBoxes];

    newImages[index] = previewUrl;
    newImgBoxes[index] = null;
    if (index + 1 < newImgBoxes.length) {
      newImgBoxes[index + 1] = "+";
    }

    setImages(newImages);
    setImgBoxes(newImgBoxes);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 업로드 진행 상태를 업데이트할 수 있습니다.
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", url);

          const updatedImages = [...images];
          updatedImages[index] = url;

          setImages(updatedImages);

          // 이미지를 저장하기 위한 URL 업데이트
          await saveImageUrls(url);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const saveImageUrls = async (previewUrl) => {
    const saveDate = {
      email: userEmail,
      urls: previewUrl,
    };
    try {
      const response = await AlbumAxiosApi.albumReg(saveDate);
      console.log("URLs saved successfully:", response.data);
    } catch (error) {
      console.error("Axios 에러!!!!!!!!!Error saving URLs:", error);
    }
  };

  const handleDeleteImage = async (index) => {
    const imageUrlToDelete = Array.isArray(images[index])
      ? images[index][0]
      : images[index];
    try {
      await AlbumAxiosApi.deleteImage(userEmail, imageUrlToDelete);

      const newImgBoxes = [...imgBoxes];
      const newImages = [...images];

      newImages.splice(index, 1); // 클릭된 이미지를 배열에서 제거
      newImages.push(null); // 배열의 마지막에 null 추가

      // 기존 + 버튼 위치를 찾아 제거
      const plusIndex = newImgBoxes.indexOf("+");
      if (plusIndex !== -1) {
        newImgBoxes[plusIndex] = null;
      }

      // + 버튼을 마지막 null 위치에 추가
      const nextPlusIndex = newImages.indexOf(null);
      if (nextPlusIndex !== -1 && nextPlusIndex < newImgBoxes.length) {
        newImgBoxes[nextPlusIndex] = "+";
      }

      setImgBoxes(newImgBoxes);
      setImages(newImages);
      await deleteImageFromFirebase(imageUrlToDelete); // 파이어베이스 삭제
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      handleAddImage(index, file);
    }
  };

  const handleTemaPopup = () => {
    setIsTemaPopup(true);
  };
  const handlePagePopup = () => {
    setIsPagePopup(true);
  };

  const handleClosePopup = () => {
    setIsTemaPopup(false);
    setIsPagePopup(false);
  };

  // 이미지 박스 렌더링 함수
  const renderImageBoxes = (startIndex, endIndex) => {
    return imgBoxes.slice(startIndex, endIndex).map((box, index) => (
      <ImgBox
        key={startIndex + index}
        onClick={() =>
          images[startIndex + index] && handleDeleteImage(startIndex + index)
        }
        hasImage={images[startIndex + index] !== null}
      >
        {images[startIndex + index] && (
          <Img
            src={images[startIndex + index]}
            alt={`album-${startIndex + index + 1}`}
          />
        )}
        {box === "+" && (
          <>
            <PlusButton
              onClick={() =>
                document
                  .getElementById(`fileInput${startIndex + index}`)
                  .click()
              }
            >
              +
            </PlusButton>
            <input
              type="file"
              id={`fileInput${startIndex + index}`}
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(startIndex + index, e)}
            />
          </>
        )}
      </ImgBox>
    ));
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
          <TitleLine />
          <ImgWrapper>{renderImageBoxes(0, 6)}</ImgWrapper>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <ContentWrapper animate={animate}>
            <AddButton>
              <AddTema onClick={handleTemaPopup}>테마 추가</AddTema>
              <AddAlbum onClick={handlePagePopup}>앨범 추가</AddAlbum>
            </AddButton>
            <ImgWrapper2>
              <Dday>♥ D + 150 ♥</Dday>
              {renderImageBoxes(6, 15)}
            </ImgWrapper2>
          </ContentWrapper>
        </BookSign2>
      </BookTheme2>
      <InputDetailDiv>
        <NextButton onClick={handleNext}>▶▶</NextButton>
      </InputDetailDiv>
      {isTemaPopup && (
        <>
          <PopupOverlay onClick={handleClosePopup} />
          <Popup>
            <PopTitle>테마 구매</PopTitle>
            <PopBoard>
              <BuyTema>
                <TemaPrice>
                  <TemaInfo>
                    <TemaOne>SkyBlue Tema</TemaOne>
                    <TemaTwo>파격세일!!</TemaTwo>
                    <TemaThr>
                      <Strikethrough>9900원</Strikethrough>={">"}300원
                    </TemaThr>
                    <BuyButton>구매</BuyButton>
                  </TemaInfo>
                </TemaPrice>
              </BuyTema>
              <BuyTema>
                <TemaPrice>
                  <TemaInfo>
                    <TemaOne>Black Tema</TemaOne>
                    <TemaTwo>파격세일!!</TemaTwo>
                    <TemaThr>
                      <Strikethrough>59900원</Strikethrough>={">"}500원
                    </TemaThr>
                    <BuyButton>구매</BuyButton>
                  </TemaInfo>
                </TemaPrice>
              </BuyTema>
              <BuyTema>
                <TemaPrice>
                  <TemaInfo>
                    <TemaOne>Pink Tema</TemaOne>
                    <TemaTwo>파격세일!!</TemaTwo>
                    <TemaThr>
                      <Strikethrough>129800원</Strikethrough>={">"}900원
                    </TemaThr>
                    <BuyButton>구매</BuyButton>
                  </TemaInfo>
                </TemaPrice>
              </BuyTema>
            </PopBoard>
            <CloseButton onClick={handleClosePopup}>닫기</CloseButton>
          </Popup>
        </>
      )}
      {isPagePopup && (
        <>
          <PopupOverlay onClick={handleClosePopup} />
          <Popup>
            <PopTitle>페이지 구매</PopTitle>
            <PopBoard>
              <BuyTema>
                <TemaPrice>
                  <TemaInfo>
                    <TemaOne>페이지 1장 구매</TemaOne>
                    <TemaTwo>파격세일!!</TemaTwo>
                    <TemaThr>
                      <Strikethrough>5000원</Strikethrough>={">"}1000원
                    </TemaThr>
                    <PaymentComponent
                      onPaymentSuccess={handlePaymentSuccess}
                      amount={1000}
                    />
                  </TemaInfo>
                </TemaPrice>
              </BuyTema>
              <BuyTema>
                <TemaPrice>
                  <TemaInfo>
                    <TemaOne>페이지 2장 구매</TemaOne>
                    <TemaTwo>파격세일!!</TemaTwo>
                    <TemaThr>
                      <Strikethrough>10000원</Strikethrough>={">"}1500원
                    </TemaThr>
                    <PaymentComponent
                      onPaymentSuccess={handlePaymentSuccess}
                      amount={1500}
                    />
                  </TemaInfo>
                </TemaPrice>
              </BuyTema>
            </PopBoard>
            <CloseButton onClick={handleClosePopup}>닫기</CloseButton>
          </Popup>
        </>
      )}
    </>
  );
};

export default DateAlbum;
