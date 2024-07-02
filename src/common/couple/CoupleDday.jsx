import styled from "styled-components";
import MainAxios from "../../axiosapi/MainAxios";
const Dday = styled.div`
  width: 20vw;
  height: 15vh;
  font-size: 4.167vw;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const DdayInputForm = styled.div`
//   width:20vw;
//   height: 15vh;

// `
const CoupleDday = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const dDayInputOnChangeHandler = () => {
    dDayAxois(coupleName);
  };
  //디데이 존재하는지 확인하는 비동기 함수
  const dDayAxois = async (couple) => {
    // const isExist = await MainAxios.isExistDday(couple);
    // console.log(isExist.data);
  };
  return <Dday>D + 150</Dday>;
};

export default CoupleDday;
