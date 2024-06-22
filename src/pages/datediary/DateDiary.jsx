import styled from "styled-components";
import theme3 from "../../img/background/theme/3.jpg";
import theme3_1 from "../../img/background/theme/3-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/ko"; // moment에서 한국어 설정을 불러옵니다.

// 한국어 locale 설정
moment.locale("ko");

// Styled components
const StyledCalendarWrapper = styled.div`
  width: 90%;
  height: 70%;
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
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Dday = styled.div`
  width: 90%;
  height: 10%;
  margin-top: 2%;
  font-size: 1.3vw;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  flex-direction: column;
  background-color: #e7bfa1;
`;

const LineUp = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #c8c8c8;
`;

const LineDown = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PicDate = styled.div`
  width: 50%;
  height: 90%;
  font-size: 1vw;
  display: flex;
  margin-left: 3%;
  align-items: flex-end;
  justify-content: flex-start;
`;
const DdayWe = styled.div`
  width: 50%;
  height: 90%;
  font-size: 0.729vw;
  display: flex;
  margin-right: 3%;
  align-items: flex-end;
  justify-content: flex-end;
`;

const BoardTitle = styled.div`
  width: 90%;
  height: 6%;
  font-size: 0.729vw;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 800;
`;

const MemoInput = styled.textarea`
  width: 90%;
  height: 80%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #eccdaf;
  resize: none;
  outline-color: #eccdaf; /* 외곽선 색상 설정 (선택 사항) */
  overflow: hidden;
`;
const ButtonWrap = styled.div`
  width: 900%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: #e7bfa1;
  cursor: pointer;
  &:hover {
    background-color: #d3a78a;
  }
`;
const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: #e7bfa1;
  cursor: pointer;
  &:hover {
    background-color: #d3a78a;
  }
`;

const CheckboxWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin-top:0.5rem;
`;

const EventInput = styled.input`
  width: 60%;
  margin-left: 0.5rem;  
  padding: 0.2rem;
  font-size: 1rem;
  border: solid #eccdaf;
  border-radius: 0.3rem;
  background-color: #eccdaf;
  /* outline: none; */
  outline-color: #eccdaf;
`;
const AddButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #e7bfa1;
  cursor: pointer;

  &:hover {
    background-color: #eccdaf;
  }
`;

const CustomCheckbox = styled.input` /* 체크박스 커스텀 */
  appearance: none; 
  width: 16px;
  height: 16px;
  border: 2px solid #a1bae7;
  background-color: #eccdaf;
  border-radius: 4px;
  margin-right: 6px;
  cursor: pointer;

  &:checked {
    background-color: #92a9d3; /* 체크된 상태의 배경색 */
    border-color: #a1bae7;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px darkgray; /* 포커스 시 테두리 스타일 */
  }
  &:hover {
    background-color: #e7bfa1;
  }
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #e7bfa1;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #eccdaf;
  }
`;

const DateDiary = () => {
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [memos, setMemos] = useState({}); // 날짜별 일기를 저장하는 상태
  const [currentMemo, setCurrentMemo] = useState(""); // 현재 입력 중인 일기 상태
  const [events, setEvents] = useState([{ isEvent: false, eventText: "" }]);

  const attendDay = [""];
  const anniversaryDate = moment("2024-01-23");
  const daysTogether = moment(today).diff(anniversaryDate, "days") + 1;
  const SdaysTogether = moment(selectedDate).diff(anniversaryDate, "days") + 1;
  const memoTextAreaRef = useRef(null);


  const handleDateChange = (newDate) => {
    setDate(newDate);
  };


  useEffect(() => {
    const memoData = memos[moment(selectedDate).format("YYYY-MM-DD")] || {};
    setCurrentMemo(memoData.memo || "");
    setEvents(memoData.events || []);
  }, [selectedDate, memos]);


  useEffect(() => {
    const memoTextArea = memoTextAreaRef.current;
    if (memoTextArea) {
      const handleWheel = (event) => {
        memoTextArea.scrollTop += event.deltaY;
      };
      memoTextArea.addEventListener('wheel', handleWheel);
      return () => {
        memoTextArea.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);
  

  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCurrentMemo(memos[moment(date).format("YYYY-MM-DD")] || "");
    const memoData = memos[moment(date).format("YYYY-MM-DD")] || {};
    setEvents(memoData.events || [{ isEvent: false, eventText: "" }]);
  };

  const handleMemoChange = (e) => {
    setCurrentMemo(e.target.value);
  };
  const handleEventChange = (index) => (e) => {
    const newEvents = [...events];
    newEvents[index].isEvent = e.target.checked;
    setEvents(newEvents);
  };

  const handleEventTextChange = (index) => (e) => {
    const newEvents = [...events];
    newEvents[index].eventText = e.target.value;
    setEvents(newEvents);
  };

  const handleAddEvent = () => {
    if (events.length < 5) {
      setEvents([...events, { isEvent: false, eventText: "" }]);
    }
  };

  const handleRemoveEvent = (index) => () => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const handleMemoSave = () => {
    const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

 if (currentMemo.trim() === "" && events.every(event => !event.eventText.trim())) {
    alert("일기나 일정 중 최소 하나를 입력하세요.");
    return; // 일기나 일정이 모두 비어 있으면 저장을 중단
  }
    // 오늘 날짜와 선택된 날짜가 같은지 확인
    const isToday = moment(selectedDate).isSame(today, "day");

    // 일기 저장
    setMemos((prevMemos) => ({
      ...prevMemos,
      [formattedSelectedDate]: { memo: currentMemo, events },
    }));

    if (!isToday) {
      // 달력에 점을 찍는 로직 추가 (필요 시)
    }
  };
  const handleClear = () => {
    const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");
  
    setMemos((prevMemos) => {
      const updatedMemos = { ...prevMemos };
      delete updatedMemos[formattedSelectedDate]; 
      return updatedMemos;
    });
  
    setEvents([{ isEvent: false, eventText: "" }]);
    setCurrentMemo(""); 
  };
  


  return (
    <>
      <BookTheme>
        <BookSign>
          <Dday>♥ D + {daysTogether} ♥</Dday>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <StyledCalendarWrapper>
            <StyledCalendar
              value={date}
              onChange={handleDateChange}
              onClickDay={handleDateClick}
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
                /// 해당 날짜에 일기가 있는지 확인하고 점 추가
                if (memos[moment(date).format("YYYY-MM-DD")] && !moment(date).isSame(today, "day")) {
                  html.push(<StyledDot key={`memo-${moment(date).format("YYYY-MM-DD")}`} />);
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
                <PicDate>
                  {selectedDate
                    ? moment(selectedDate).format("YYYY.MM.DD")
                    : ""}
                </PicDate>
                {moment(selectedDate).isSame(anniversaryDate, "day") ? (
                  <DdayWe>우리 처음 만난 날</DdayWe>
                ) : moment(selectedDate).isBefore(anniversaryDate) ? (
                  <DdayWe>우리 만나기 전</DdayWe>
                ) : (
                  <DdayWe>우리 만난 지 {SdaysTogether}일 째</DdayWe>
                )}
              </LineUp>
              <LineDown>
              <BoardTitle>[오늘의 일정]</BoardTitle>
              {events.map((event, index) => (
                <CheckboxWrapper key={index}>
                  <CustomCheckbox
                    type="checkbox"
                    checked={event.isEvent}
                    onChange={handleEventChange(index)}
                  />
                  <EventInput
                    value={event.eventText}
                    onChange={handleEventTextChange(index)}
                    placeholder="일정을 입력하세요"
                  />
                  <RemoveButton onClick={handleRemoveEvent(index)}>-</RemoveButton>
                </CheckboxWrapper>
              ))}
              {events.length < 5 && (
                <AddButton onClick={handleAddEvent}>+</AddButton>
              )}
              <BoardTitle>[오늘의 일기]</BoardTitle>
              <MemoInput
              ref={memoTextAreaRef}
                value={currentMemo}
                onChange={handleMemoChange}
                placeholder="오늘의 일기를 작성해주세요 ~ `-`" 
                  />
                  <ButtonWrap>
              <SaveButton onClick={handleMemoSave}>저장</SaveButton>
              <ClearButton onClick={handleClear}>삭제</ClearButton>
              </ButtonWrap>
              </LineDown>
            </DiaryBoard>
          </BoardWrapper>
        </BookSign2>
      </BookTheme2>
    </>
  );
};

export default DateDiary;
