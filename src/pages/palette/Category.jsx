import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Category = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
  border-right: 1px solid darkgray;
`;

const CateTitle = styled.div`
  width: 50%;
  height: 5%;
  margin-top: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 32px;
`;

const CateContent = styled(Link)`
  width: 50%;
  height: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const Cate = () => (
  <>
    <Category>
      <CateTitle>고객센터</CateTitle>
      <CateContent to="/customer/notice">공지사항</CateContent>
      <CateContent to="/customer/help">자주 묻는 질문</CateContent>
      <CateContent to="/customer/inquiry">1:1 문의 등록</CateContent>
      <CateContent to="/customer/ad">광고 문의</CateContent>
    </Category>
  </>
);

export default Cate;
