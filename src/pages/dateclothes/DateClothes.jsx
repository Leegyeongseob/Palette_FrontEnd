import styled from "styled-components";
import clothesBg from "../../img/background/theme/clothes_background.jpg";
import CoupleImage from "../../common/couple/CoupleImg";
import Swiper from "./Swiper";
import { useState } from "react";
const BookSign = styled.div`
  width: 25.8vw;
  height: 47vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookTheme = styled.div`
  width: 53vw;
  height: 68vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${clothesBg});
  background-size: cover;
  opacity: 0.8;
`;
const Title = styled.div`
  width: 26vw;
  height: 6vh;
  font-size: 30px;
  font-weight: 540;
  display: flex;
  align-items: center;
  padding-left: 2vw;
`;
const BookDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const Options = styled.div`
  width: 5vw;
  height: 4vh;
  background-color: #fff;
  font-size: 14px;
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
  align-items: end;
`;
const OptionsDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const ButtonDiv = styled.div`
  width: 450px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StroeButton = styled.div`
  width: 130px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  font-size: 23px;
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
  width: 13.2vw;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DateClothes = () => {
  const [isOnePiece, setIsOnePiece] = useState(false);
  return (
    <BookTheme>
      <OptionsDiv>
        <Title>데이트룩 코디</Title>
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
      </OptionsDiv>
      <CoupleImage clothes={true} />
      <BookDiv>
        <BookSign>
          <ClothesForm>
            <Swiper clothNum={1} />
            <Swiper clothNum={2} />
            <Swiper shoes={true} clothNum={3} />
          </ClothesForm>

          <ButtonDiv>
            <StroeButton>저장</StroeButton>
          </ButtonDiv>
        </BookSign>
        <BookSign>
          <ClothesForm>
            <Swiper clothNum={4} OnePiece={isOnePiece} />
            <Swiper clothNum={5} OnePiece={isOnePiece} />
            <Swiper clothNum={7} OnePiece={isOnePiece} />
            <Swiper shoes={true} clothNum={6} />
          </ClothesForm>
          <ButtonDiv>
            <StroeButton>저장</StroeButton>
          </ButtonDiv>
        </BookSign>
      </BookDiv>
    </BookTheme>
  );
};
export default DateClothes;
