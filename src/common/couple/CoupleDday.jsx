import styled from "styled-components";
import MainAxios from "../../axiosapi/MainAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useEffect, useState } from "react";
const Dday = styled.div`
  width: 20vw;
  height: 15vh;
  font-size: 3.167vw;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DdayInputForm = styled.input`
  width: 8vw;
  height: 3vh;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
`;
const DdayInputDiv = styled.div`
  width: 19vw;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & > label {
    color: #fff;
  }
  & > .day {
    color: #fff;
  }
`;
const DDayInputBtn = styled.div`
  width: 3vw;
  height: 3vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
const CoupleDday = () => {
  const [isDday, setIsDday] = useState(false);
  const [saveCoupleName, setSaveCoupleName] = useState("");
  const [saveDday, setSaveDday] = useState("");
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    dDayAxois();
  }, [saveDday]);

  //디데이 값을 가져오는 비동기함수
  const dDayAxois = async () => {
    //이메일로 커플이름 search
    const coupleName = await MemberAxiosApi.coupleNameSearch(email);
    setSaveCoupleName(coupleName.data);
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
  // 디데이 입력
  const dDayInputOnchangeHandler = (e) => {
    setSaveDday(e.target.value);
  };
  //디데이 값을 저장하는 함수
  const dDaySaveOnclickHandler = () => {
    dDaySaveAxios();
  };
  //디데이 값을 저장하는 Axios 함수
  const dDaySaveAxios = async () => {
    const res = await MainAxios.saveDday(saveCoupleName, saveDday);
    setIsDday(!res.data);
    dDayAxois();
  };
  return (
    <DdayInputDiv>
      {isDday ? (
        <Dday>사귄지 {saveDday}일째!</Dday>
      ) : (
        <>
          <label>사귄날짜 입력:</label>
          <DdayInputForm onChange={dDayInputOnchangeHandler}></DdayInputForm>
          <div className="day">일</div>
          <DDayInputBtn onClick={dDaySaveOnclickHandler}>입력</DDayInputBtn>
        </>
      )}
    </DdayInputDiv>
  );
};

export default CoupleDday;
