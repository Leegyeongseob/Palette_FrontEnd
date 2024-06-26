import { Link, useLocation } from "react-router-dom";
import { styled, css } from "styled-components";

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

const activeTitleStyle = css`
  font-size: 34px; /* CateTitle의 글씨체가 커지는 효과 */
  font-weight: bold;
`;

const activeStyle = css`
  font-size: 18px; /* 글씨체가 커지는 효과 */
  font-weight: bold;
`;

const CateTitle = styled(Link)`
  width: 50%;
  height: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 32px;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
  ${(props) => props.isActive && activeTitleStyle}
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
  ${(props) => props.isActive && activeStyle}
`;
const Cate = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Category>
      <CateTitle to="/customer" isActive={currentPath === "/customer"}>
        고객센터
      </CateTitle>
      <CateContent
        to="/customer/notice"
        isActive={currentPath === "/customer/notice"}
      >
        공지사항
      </CateContent>
      <CateContent
        to="/customer/help"
        isActive={currentPath === "/customer/help"}
      >
        자주 묻는 질문
      </CateContent>
      <CateContent
        to="/customer/inquiry"
        isActive={currentPath === "/customer/inquiry"}
      >
        1:1 문의 등록
      </CateContent>
      <CateContent to="/customer/ad" isActive={currentPath === "/customer/ad"}>
        광고 문의
      </CateContent>
    </Category>
  );
};

export default Cate;
