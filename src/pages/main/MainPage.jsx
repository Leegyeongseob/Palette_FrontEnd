import styled from "styled-components";
import theme11 from "../../img/background/theme/11.jpg";
import iu from "../../img/mainImg/아이유.jpg";
import CoupleDday from "../../common/couple/CoupleDday";
import CoupleImg from "../../common/couple/CoupleImg";
import couple1 from "../../img/mainImg/커플1.jpg";
import couple2 from "../../img/mainImg/커플2.jpg";
import couple3 from "../../img/mainImg/커플3.jpg";
import couple4 from "../../img/mainImg/커플4.jpg";
const BookSign = styled.div`
  width: 25.8vw;
  height: 69vh;
`;
const BookTheme = styled.div`
  width: 53vw;
  height: 69vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${theme11});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;
const CoupleDiv = styled.div`
  width: 25.8vw;
  height: 22vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaletteBanner = styled.div`
  width: 20vw;
  height: 15vh;
  display: flex;
  background-image: url(${iu});
  background-size: cover;
  background-position: center;
`;
const DdayDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
`;
const GalleryDiv = styled.div`
  width: 25.8vw;
  height: 44vh;
`;
const RecentPostDiv = styled.div`
  width: 17vw;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
`;
const RecentPosts = styled.div`
  width: 16vw;
  height: 20vh;
  border: 1px solid #000;
`;
const DdayFormDiv = styled.div`
  width: 8.8vw;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
`;
const Dday = styled.div`
  width: 8vw;
  height: 20vh;

  border: 1px solid #000;
`;
const RecentTitle = styled.div`
  width: 16vw;
  height: 4vh;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 800;
  font-size: 0.9vw;
`;
const Recents = styled.div`
  width: 16vw;
  height: 4vh;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 800;
  font-size: 0.833vw;
  border-radius: 0.521vw;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    color: blue;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const Ddays = styled.div`
  width: 8vw;
  height: 4vh;
  font-size: 0.833vw;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 600;
`;
const Picture = styled.div`
  width: 7.813vw;
  height: 15.74vh;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
`;
const PictureDiv = styled.div`
  width: 25.8vw;
  height: 22vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const VisitDiv = styled.div`
  width: 25.8vw;
  height: 20vh;
  border-radius: 10px;
  background-color: aliceblue;
`;
const MainPage = () => {
  return (
    <BookTheme>
      <BookSign>
        <CoupleDiv>
          <PaletteBanner />
        </CoupleDiv>
        <CoupleDiv>
          <CoupleImg />
        </CoupleDiv>
        <CoupleDiv>
          <CoupleDday />
          <VisitDiv />
        </CoupleDiv>
      </BookSign>
      <BookSign>
        <DdayDiv>
          <RecentPostDiv>
            <RecentPosts>
              <RecentTitle>&nbsp;최근 게시물</RecentTitle>
              <Recents>&nbsp;알콩이와 달콩이의 여의도 데이트</Recents>
              <Recents>&nbsp;둘만의 강원도 여행</Recents>
              <Recents>&nbsp;함께 보낸 첫번째 발렌타인데이</Recents>
              <Recents>&nbsp;100일 기념 데이트</Recents>
            </RecentPosts>
          </RecentPostDiv>
          <DdayFormDiv>
            <Dday>
              <Ddays>&nbsp;TODAY : 8 </Ddays>
              <Ddays>&nbsp;TOTAL : 520 </Ddays>
              <Ddays>&nbsp;100일 : D + 50 </Ddays>
              <Ddays>&nbsp;500일 : D - 350 </Ddays>
              <Ddays>&nbsp;알콩이 생일 : D - 70 </Ddays>
            </Dday>
          </DdayFormDiv>
        </DdayDiv>
        <GalleryDiv>
          <PictureDiv>
            <Picture imageurl={couple1} />
            <Picture imageurl={couple2} />
          </PictureDiv>
          <PictureDiv>
            <Picture imageurl={couple3} />
            <Picture imageurl={couple4} />
          </PictureDiv>
        </GalleryDiv>
      </BookSign>
    </BookTheme>
  );
};

export default MainPage;
