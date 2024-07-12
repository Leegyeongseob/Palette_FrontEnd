import styled from "styled-components";
import theme11 from "../../img/background/theme/11.jpg";
import iu from "../../img/mainImg/아이유.jpg";
import CoupleDday from "../../common/couple/CoupleDday";
import CoupleImg from "../../common/couple/CoupleImg";
import couple1 from "../../img/mainImg/커플1.jpg";
import couple2 from "../../img/mainImg/커플2.jpg";
import couple3 from "../../img/mainImg/커플3.jpg";
import couple4 from "../../img/mainImg/커플4.jpg";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import MainAxios from "../../axiosapi/MainAxios";
import { GiArchiveResearch } from "react-icons/gi";
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
  height: 40vh;
`;
const RecentPostDiv = styled.div`
  width: 17vw;
  height: 24vh;
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
  height: 24vh;
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
  width: 15.9vw;
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
  height: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const VisitDiv = styled.div`
  width: 15vw;
  height: auto;
  border-radius: 10px;
  border: 1px solid #fff;
  & > .visitDiv {
    display: flex;
  }
  & > div > input {
    width: 14vw;
    height: 3vh;
    padding-left: 1.083vw;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    outline: none;
    color: #fff;
    font-size: 0.8vw;
    font-weight: 500;
  }
`;
const VisitList = styled.div`
  width: 12vw;
  height: 3vh;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 0.8vw;
  font-weight: 500;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
    color: #5549f7;
  }
`;
const VisitSearchBtn = styled(GiArchiveResearch)`
  width: 1.563vw;
  height: 3.148vh;
  color: green;
  cursor: pointer;
`;
const SettingDiv = styled.div`
  width: 25.8vw;
  height: 4vh;
  display: flex;
  justify-content: end;
  align-items: center;
  & > .space {
    width: 1vw;
  }
`;
const Setting = styled(IoSettingsSharp)`
  width: 1.563vw;
  height: 3.148vh;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const SettingForm = styled.div`
  width: 15vw;
  height: 13vh;
  background-color: lightpink;
  border-radius: 10px;
  margin-top: 10vh;
  z-index: 10;
`;
const Btn = styled.div`
  width: 70px;
  height: 35px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 0.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const BtnDiv = styled.div`
  width: 15vw;
  height: 9vh;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const XbtnDiv = styled.div`
  width: 15vw;
  height: 4vh;

  display: flex;
  justify-content: end;
  align-items: center;
`;
const CloseBtn = styled(IoMdCloseCircleOutline)`
  width: 1.563vw;
  height: 3.148vh;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;
const VisitContainer = styled.div`
  width: 25vw;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackMyHome = styled.div`
  width: 5vw;
  height: 3vh;
  font-size: 0.6vw;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
`;
const MainPage = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const navigate = useNavigate();
  // 커플 이름 검색 후 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 설정 폼 변화
  const [settingForm, setSettingForm] = useState(false);
  // 커플 이름 검색 함수

  //디데이 값 저장
  const [saveDday, setSaveDday] = useState("");
  //디데이 존재하는지
  const [isDday, setIsDday] = useState(false);
  //searchCouple 포함 리스트 저장
  const [searchCoupleList, setSearchCoupleList] = useState([]);
  //커플 이름 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = (index) => {
    const coupleName = searchCoupleList[index];
    if (coupleName) {
      sessionStorage.setItem("coupleName", coupleName);
      console.log(
        "오픈북 검색창 searchTerm",
        searchTerm,
        " coupleName",
        coupleName
      );
      navigate(`/${coupleName}/main-page`);
      setSearchTerm(""); // 필요시 네비게이션 후 검색어 초기화
    }
  };

  //설정 폼 변화 함수
  const settingFromStatus = () => {
    setSettingForm(true);
  };
  const closeFromStatus = () => {
    setSettingForm(false);
  };
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    dDayAxois();
  }, [isDday, coupleName]);

  //디데이 값을 가져오는 비동기함수
  const dDayAxois = async () => {
    //이메일로 커플이름 search
    const coupleName = await MemberAxiosApi.coupleNameSearch(email);
    // Dday값 가져오기
    const resDday = await MainAxios.searchDday(coupleName.data);
    console.log(resDday.data);
    if (resDday.data !== "") {
      setIsDday(true);
      setSaveDday(resDday.data);
    } else {
      setIsDday(false);
    }
  };
  // 100일 계산 함수
  const hundredCalculate = () => {
    return saveDday - 100;
  };
  //500일 계산 함수
  const fiveHundredCalculate = () => {
    return saveDday - 500;
  };
  // 방문 검색 onChange 함수
  const visitSearchOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const coupleNameListAxios = async (visitCoupleName) => {
    if (visitCoupleName !== "") {
      const res = await MainAxios.visitCoupleNameSearchList(visitCoupleName);
      setSearchCoupleList(res.data);
    } else {
      setSearchCoupleList([]);
    }
  };
  useEffect(() => {
    coupleNameListAxios(searchTerm);
  }, [searchTerm]);
  const goHomeOnClickHandler = () => {
    MycoupleNameSearch(email);
  };
  const MycoupleNameSearch = async (emailValue) => {
    const myCoupleNameData = await MemberAxiosApi.coupleNameSearch(emailValue);
    navigate(`/${myCoupleNameData.data}/main-page`);
  };
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
          <VisitContainer>
            <VisitDiv>
              <div className="visitDiv">
                <input
                  type="text"
                  placeholder="다른 미니홈피 검색"
                  value={searchTerm}
                  onChange={visitSearchOnChange}
                  onKeyDown={handleKeyPress}
                />
                <VisitSearchBtn />
              </div>
              {/* 여기 검색단어 맵으로 뿌려줄 예정 */}
              {searchCoupleList.map((couple, index) => (
                <VisitList key={index} onClick={() => handleSearch(index)}>
                  {couple}
                </VisitList>
              ))}
            </VisitDiv>
          </VisitContainer>
        </CoupleDiv>
      </BookSign>
      <BookSign>
        <SettingDiv>
          <BackMyHome onClick={goHomeOnClickHandler}>
            내 홈으로 돌아가기
          </BackMyHome>
          <div className="space" />
          {!settingForm && (
            <Setting onClick={settingFromStatus} openform={settingForm} />
          )}
          {settingForm && (
            <SettingForm>
              <XbtnDiv>
                <CloseBtn onClick={closeFromStatus} />
              </XbtnDiv>
              <BtnDiv>
                <Btn
                  onClick={() => {
                    navigate("/modify");
                  }}
                >
                  수정하기
                </Btn>
                <Btn
                  onClick={() => {
                    sessionStorage.setItem("email", "");
                    navigate("/");
                  }}
                >
                  로그아웃
                </Btn>
                <Btn
                  onClick={() => {
                    navigate("/withdrawal");
                  }}
                >
                  회원탈퇴
                </Btn>
              </BtnDiv>
            </SettingForm>
          )}
        </SettingDiv>
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
              {isDday ? (
                <>
                  <Ddays>&nbsp;TOTAL : {saveDday} day</Ddays>
                  <Ddays>&nbsp;100일 : {hundredCalculate()} day</Ddays>
                  <Ddays>&nbsp;500일 : {fiveHundredCalculate()} day</Ddays>
                </>
              ) : (
                <>
                  <Ddays>&nbsp;TOTAL : 입력해주세요. </Ddays>
                  <Ddays>&nbsp;100일 : 입력해주세요. </Ddays>
                  <Ddays>&nbsp;500일 : 입력해주세요.</Ddays>
                </>
              )}

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
