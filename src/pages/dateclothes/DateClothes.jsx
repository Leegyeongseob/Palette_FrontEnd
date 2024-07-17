import styled from "styled-components";
import clothesBg from "../../img/album/1.jpeg";
import CoupleImage from "../../common/couple/CoupleImg";
import Swiper from "./Swiper";
import { useState } from "react";
const BookSign = styled.div`
  width: 100%;
  height: 630px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;

  & > .save1 {
    justify-content: first baseline;
  }
  & > .save2 {
    justify-content: end;
  }
  & > .coupleimg {
    margin-left: 380px;
    display: flex;
    justify-content: space-between;
    width: 850px;
    height: 200px;
    position: relative;
  }
`;
const BookSign2 = styled.div`
  width: 100%;
  height: 630px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  & > .save1 {
    justify-content: first baseline;
  }
  & > .save2 {
    justify-content: end;
  }
  & > .clothDiv {
    height: 400px;
    @media screen and (max-width: 1919px) {
      height: 220px;
    }
  }
  & > .optionSDiv {
    width: 480px;
    height: auto;
    display: flex;
    justify-content: flex-end;
  }
`;
const BookTheme = styled.div`
  width: 41.5%;
  height: 81.5%;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${clothesBg});
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
`;

const BookTheme2 = styled.div`
  width: 41.5%;
  height: 81.5%;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${clothesBg});
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  width: 500px;
  height: 6vh;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-top: 3vh;
  padding-left: 2vw;
`;
const BookDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const Options = styled.div`
  width: 100px;
  height: 4vh;
  background-color: #fff;
  font-size: 0.729vw;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const OptionsSelectDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  z-index: 100;
  align-items: end;
`;

const ButtonDiv = styled.div`
  width: 23.438vw;
  height: 9.962vh;
  display: flex;
  align-items: center;
`;
const StroeButton = styled.div`
  width: 5vw;
  height: 4vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1vw;
  font-size: 1vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
const ClothesForm = styled.div`
  width: 253px;
  height: auto;
  background-color: #fff;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DateClothes = () => {
  const [isOnePiece, setIsOnePiece] = useState(false);
  return (
    <>
      <BookTheme>
        <BookSign>
          <Title>데이트룩 코디</Title>
          <div className="coupleimg">
            <CoupleImage clothes={true} />
          </div>
          <BookDiv />

          <ClothesForm>
            <Swiper clothNum={1} />
            <Swiper clothNum={2} />
            <Swiper shoes={true} clothNum={3} />
          </ClothesForm>
          <ButtonDiv className="save1">
            <StroeButton>저장</StroeButton>
          </ButtonDiv>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2>
          <div className="clothDiv" />
          <div className="optionSDiv">
            <OptionsSelectDiv>
              <Options
                onClick={() => {
                  setIsOnePiece(true);
                }}
              >
                원피스
              </Options>
              <Options
                onClick={() => {
                  setIsOnePiece(false);
                }}
              >
                상＆하의
              </Options>
            </OptionsSelectDiv>
          </div>
          <ClothesForm>
            <Swiper clothNum={4} OnePiece={isOnePiece} />
            <Swiper clothNum={5} OnePiece={isOnePiece} />
            <Swiper clothNum={7} OnePiece={isOnePiece} />
            <Swiper shoes={true} clothNum={6} />
          </ClothesForm>
          <ButtonDiv className="save2">
            <StroeButton>저장</StroeButton>
          </ButtonDiv>
        </BookSign2>
      </BookTheme2>
    </>
  );
};
export default DateClothes;
