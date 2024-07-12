import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AlbumAxiosApi from "../../axiosapi/AlbumAxiosApi";
import PagePop from "./import/PagePop";
import TemaPop from "./import/TemaPop";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import deleteImageFromFirebase from "../../firebase/firebaseAlbumDel";
import Modal from "../../pages/datediary/Modal";
import modalImg from "../../img/commonImg/전구 아이콘.gif";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseAlbum";
import TemaChange from "./import/TemaChange";

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
  background-color: ${(props) => props.bgColor};
  align-items: center;
  justify-content: center;
  padding-right: 1%;
  margin-top: 20%;
  display: flex;
  flex-wrap: wrap;
`;

const ImgWrapper2 = styled.div`
  width: 90%;
  height: 81%;
  background-color: ${(props) => props.bgColor};
  padding-left: 0.4%;
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
  margin-left: 3%;
  cursor: pointer;
  &:hover {
    font-size: 0.81vw;
  }
`;

const TitleLine = styled.div`
  width: 90%;
  height: 4%;
  display: flex;
  justify-content: flex-end;
  padding-right: 1%;
  border-bottom: 1px solid #c8c8c8;
  font-size: 0.78vw;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 0.81vw;
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

const DateAlbum = () => {
  const [animate, setAnimate] = useState(false);
  const [imgBoxes, setImgBoxes] = useState(
    Array(15)
      .fill(null)
      .map((_, index) => (index === 0 ? "+" : null))
  );
  const [images, setImages] = useState(Array(15).fill(null));
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("email");
  const [pageOpen, setPageOpen] = useState(false);
  const [temaOpen, setTemaOpen] = useState(false);
  const [temaChange, setTemaChange] = useState(false);
  const [bgColor, setBgColor] = useState("#eccdaf");
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeNextModal();
    navigator("/date-album");
  };
  const closeNextModal = () => {
    setModalOpen(false);
  };
  //솔로 함수
  const nextModal = () => {
    setModalOpen(true);
    setModalContent("페이지 구매 후 이용 가능합니다.");
  };
  const isAmountAxios = async () => {
    const amountTotal = await AlbumAxiosApi.getAmount(userEmail);
    return amountTotal.data;
  };

  const handleNext = () => {
    if (isAmountAxios() % 1000 === 0) {
      setAnimate(true);
      setTimeout(() => {
        navigate("/date-album2");
      }, 1800);
    } else {
      // 모달
      nextModal();
      console.log("솔로는 웁니다.");
    }
  };

  const closeModal = () => {
    setPageOpen(false);
    setTemaOpen(false);
    setTemaChange(false);
  };

  const handlePagePopup = () => {
    setPageOpen(true);
  };
  const handleTemaPopup = () => {
    setTemaOpen(true);
  };
  const handleTemaChange = () => {
    setTemaChange(true);
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

  // 이미지 박스 렌더링 함수
  const ImgBoxComponent = ({
    index,
    startIndex,
    box,
    image,
    handleDeleteImage,
    handleFileInputChange,
  }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <ImgBox
        onClick={() => image && handleDeleteImage(index)}
        hasImage={image !== null}
      >
        {image && <Img src={image} alt={`album-${index + 1}`} />}
        {box === "+" && (
          <>
            <PlusButton onClick={handleClick}>+</PlusButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(index, e)}
            />
          </>
        )}
      </ImgBox>
    );
  };

  const renderImageBoxes = (startIndex, endIndex) => {
    return imgBoxes
      .slice(startIndex, endIndex)
      .map((box, index) => (
        <ImgBoxComponent
          key={startIndex + index}
          index={startIndex + index}
          startIndex={startIndex}
          box={box}
          image={images[startIndex + index]}
          handleDeleteImage={handleDeleteImage}
          handleFileInputChange={handleFileInputChange}
        />
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
          <TitleLine onClick={handleTemaChange}>테마 변경</TitleLine>
          <ImgWrapper bgColor={bgColor}>{renderImageBoxes(0, 6)}</ImgWrapper>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <ContentWrapper animate={animate}>
            <AddButton>
              <AddTema onClick={handleTemaPopup}>테마 추가</AddTema>
              <AddAlbum onClick={handlePagePopup}>앨범 추가</AddAlbum>
            </AddButton>
            <ImgWrapper2 bgColor={bgColor}>
              <Dday>♥ D + 150 ♥</Dday>
              {renderImageBoxes(6, 15)}
            </ImgWrapper2>
          </ContentWrapper>
        </BookSign2>
      </BookTheme2>
      <InputDetailDiv>
        <NextButton onClick={handleNext}>▶▶</NextButton>
      </InputDetailDiv>
      <TemaChange
        open={temaChange}
        close={closeModal}
        setBgColor={setBgColor}
      />
      <TemaPop open={temaOpen} close={closeModal} />
      <PagePop open={pageOpen} close={closeModal} />
      <Modal
        open={modalOpen}
        header="안내"
        type={true}
        confirm={codeModalOkBtnHandler}
        img={modalImg}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default DateAlbum;
