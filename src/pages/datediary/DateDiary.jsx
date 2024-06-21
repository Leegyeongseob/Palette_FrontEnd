import styled from "styled-components";
import theme3 from "../../img/background/theme/3.jpg";
import theme3_1 from "../../img/background/theme/3-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import moment from "moment";
import "moment/locale/ko"; // moment에서 한국어 설정을 불러옵니다.

// 한국어 locale 설정
moment.locale("ko");

// Styled components
const StyledCalendarWrapper = styled.div`
  width: 90%;
  margin-bottom: 5%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 6% 5%;
    background-color: #eccdaf;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: black;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
    background-color: #e7bfa1;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: #e7bfa1;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: #e7bfa1;
    color: #444444;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday {
    background-color: #e7bfa1;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #cd0a0a;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: royalblue;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background-color: #e7bfa1;
    border-radius: 0.3rem;
    abbr {
      color: #ffffff;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.3rem;
    background-color: #eccdaf;
    padding: 10;
    &:hover {
      background-color: whitesmoke;
    }
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: #e3e3e3;
    abbr {
      color: black;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 18px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 30.2px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: black;
  }

  .react-calendar__tile:enabled:hover {
    background-color: whitesmoke;
    border-radius: 0.3rem;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    border-radius: 0.3rem;
    background-color: #a1bae7;
  }
`;

const StyledCalendar = styled(Calendar)``;

const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 8.5%;
  background-color: #eccdaf;
  color: black;
  width: 10%;
  height: 1.5rem;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 800;
`;

const StyledToday = styled.div`
  font-size: x-small;
  color: brown; /* 기타 색상 코드로 변경 */
  font-weight: 600;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDot = styled.div`
  background-color: #ea40d6; /* 기타 색상 코드로 변경 */
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-35%);
`;

const BookTheme = styled.div`
  width: 26vw;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${theme3});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookTheme2 = styled.div`
  width: 26vw;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.05vw;
  background-image: url(${theme3_1});
  background-size: cover;
  display: flex;
  justify-content: space-between;
`;

const BookSign = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const BookSign2 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoupleDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Dday = styled.div`
  width: 90%;
  height: 15%;
  margin-top: 5%;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  width: 90%;
  height: 93%;
  background-color: #eccdaf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DiaryBoard = styled.div`
  width: 90%;
  height: 93%;
  display: flex;
  background-color: #e7bfa1;
`;

const LineUp = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #c8c8c8;
`;
const PicDate = styled.div`
  width: 50%;
  height: 90%;
  font-size: 20px;
  display: flex;
  margin-left: 3%;
  align-items: flex-end;
  justify-content: flex-start;
`;
const DdayWe = styled.div`
  width: 50%;
  height: 90%;
  font-size: 15px;
  display: flex;
  margin-right: 3%;
  align-items: flex-end;
  justify-content: flex-end;
`;

const DateAlbum = () => {
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const attendDay = ["2024-06-18", "2023-12-13", "2024-07-20"];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <>
      <BookTheme>
        <BookSign>
          <Dday>♥ D + 150 ♥</Dday>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <StyledCalendarWrapper>
            <StyledCalendar
              value={date}
              onChange={handleDateChange}
              formatDay={(locale, date) => moment(date).format("D")}
              formatYear={(locale, date) => moment(date).format("YYYY")}
              formatMonthYear={(locale, date) =>
                moment(date).format("YYYY. MM")
              }
              calendarType="gregory"
              showNeighboringMonth={false}
              next2Label={null}
              prev2Label={null}
              minDetail="year"
              activeStartDate={
                activeStartDate === null ? undefined : activeStartDate
              }
              onActiveStartDateChange={({ activeStartDate }) =>
                setActiveStartDate(activeStartDate)
              }
              tileContent={({ date, view }) => {
                let html = [];
                if (
                  view === "month" &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate()
                ) {
                  html.push(<StyledToday key={"today"}>오늘</StyledToday>);
                }
                if (
                  attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))
                ) {
                  html.push(
                    <StyledDot key={moment(date).format("YYYY-MM-DD")} />
                  );
                }
                return <>{html}</>;
              }}
            />
            <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
          </StyledCalendarWrapper>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2>
          <BoardWrapper>
            <DiaryBoard>
              <LineUp>
                <PicDate>2024.06.21</PicDate>
                <DdayWe>우리 만난 지 150일 째</DdayWe>
              </LineUp>
            </DiaryBoard>
          </BoardWrapper>
        </BookSign2>
      </BookTheme2>
    </>
  );
};

export default DateAlbum;
