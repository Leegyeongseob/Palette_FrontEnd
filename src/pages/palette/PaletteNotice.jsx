import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./paletteImport/Header";
import Footer from "./paletteImport/Footer";
import Category from "./paletteImport/Category";
import { Link } from "react-router-dom";
import logosearch from "../../img/loginImg/findglass.png";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
// import AxiosApi from "../../axiosapi/PaletteAxios";

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
  position: sticky;
`;

const BoardWrapper = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
`;

const HelpRoot = styled.div`
  width: 90%;
  height: 5%;
  display: flex;
  flex-direction: row;
  font-size: 0.8vw;
  justify-content: flex-start;
  align-items: center;
`;

const Root = styled(Link)`
  width: 6%;
  height: 100%;
  display: flex;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;
const Root2 = styled(Root)`
  width: 2%;
`;
const Root3 = styled(Root)`
  width: 6.5%;
`;
const Root4 = styled(Root)`
  width: 10%;
`;

const SearchBox = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  display: flex;
  width: 38%;
  height: 50%;
  padding: 2%;
  border: 3px solid gray;
  font-size: 0.9vw;
  border-radius: 5px;
`;

const Searchlogo = styled.img`
  width: 2%;
  height: 16%;
  cursor: pointer;
  position: absolute;
  margin-left: 32%;
`;

const HelpBoard = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 90%;
  margin-bottom: 2%;
  justify-content: center;
  font-size: 0.8vw;
  width: 10%;
  height: 3%;
  background-color: darkgray;
  border-radius: 10px;
  color: black;

  &:hover,
  &:focus {
    cursor: pointer;
    color: black;
    border: 1px solid black;
    font-weight: bolder;
  }
`;

const BtnWrite = styled.div``;

const Tdfont = styled.div`
  display: flex;

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
  }

  tbody tr:hover {
    background-color: #dadada;
    cursor: pointer;
  }

  td {
    padding: 20px;
    border-bottom: 1px solid gray;
    font-size: 0.9vw;
    min-width: 220px;
  }

  th.number,
  td.number {
    width: 100px;
    min-width: 100px;
    text-align: center;
  }

  th.date,
  td.date {
    width: 200px;
    min-width: 200px;
    text-align: center;
  }

  th {
    height: 40px;
    border-bottom: 2px solid gray;
    font-size: 1.1vw;
    color: black;
  }
`;

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  bottom: 20px;
  width: 100%;
  padding: 10px 0;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 15px;
    cursor: pointer;
    font-size: 1vw;
  }

  .pagination li a {
    text-decoration: none;
    color: gray;
  }

  .pagination li.active a {
    border-radius: 2px;
    padding: 7px;
    color: white;
    background-color: darkgray;
  }
`;

const NoticePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [notices, setNotices] = useState([]);
  const [originalNotice, setOriginalNotice] = useState([]);
  const [filteredNotice, setFilteredNotice] = useState([]);
  const itemsPerPage = 10;

  const NoticeList = async () => {
    try {
      const exText = [
        {
          classNo: 12,
          title: "비가 너무 많이 와서 오기가 싫어",
          join: "2024-07-02",
        },
        {
          classNo: 11,
          title: "개인정보 처리방침 개정 안내 (24년 7월 1일 시행)",
          join: "2024-07-01",
        },
        { classNo: 10, title: "치킨 먹고싶다", join: "2024-06-29" },
        {
          classNo: 9,
          title: "개인정보 처리방침 개정 안내 (24년 6월 26일 시행)",
          join: "2024-06-26",
        },
        { classNo: 8, title: "제목이 너무 많잖소", join: "2024-06-25" },
        { classNo: 7, title: "Front-end, Back-end 개발", join: "2024-06-24" },
        {
          classNo: 6,
          title: "백엔드 너무 어렵고 눈물이 나..",
          join: "2024-06-22",
        },
        {
          classNo: 5,
          title: "개인정보 처리방침 개정 안내 (24년 6월 20일 시행)",
          join: "2024-06-20",
        },
        {
          classNo: 4,
          title: "플로우 차트, 스토리 보드 작성",
          join: "2024-06-16",
        },
        { classNo: 3, title: "사이트 점검 안내", join: "2024-06-10" },
        { classNo: 2, title: "DB Table 구성", join: "2024-06-06" },
        { classNo: 1, title: "Palette 조 편성", join: "2024-06-01" },
      ];
      // const rsp = await AxiosApi.boardMain();
      // setOriginalNotice(rsp.data);
      // setTotalItemsCount(rsp.data.length);
      // setBoards(rsp.data.slice(0, itemsPerPage));
      setOriginalNotice(exText);
      setFilteredNotice(exText);
      setTotalItemsCount(exText.length);
      setNotices(exText.slice(0, itemsPerPage));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    NoticeList();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newFilteredBoards = filteredNotice.slice(startIndex, endIndex);
    setNotices(newFilteredBoards);
  }, [page, filteredNotice]);

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredNotice(originalNotice);
      setTotalItemsCount(originalNotice.length);
    } else {
      const searchResults = originalNotice.filter(
        (notice) =>
          notice.title &&
          notice.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotice(searchResults);
      setTotalItemsCount(searchResults.length);
    }
    setPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Globalstyle />
      <Header />
      <Background>
        <Container>
          <BoardWrapper>
            <Category />
            <Board>
              <HelpRoot>
                <Root to="/">Palette</Root>
                <Root2>{">"}</Root2>
                <Root3 to="/customer">고객센터</Root3>
                <Root2>{">"}</Root2>
                <Root4 to="/customer/notice">공지사항</Root4>
              </HelpRoot>
              <SearchBox>
                <SearchInput
                  placeholder="무엇을 도와드릴까요 ?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Searchlogo
                  src={logosearch}
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </SearchBox>
              <HelpBoard>
                <Btn>
                  <BtnWrite>글 쓰기</BtnWrite>
                </Btn>
                <Tdfont>
                  <table>
                    <thead>
                      <tr>
                        <th className="number">번호</th>
                        <th>공지사항</th>
                        <th className="date">작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices &&
                        notices.map((notice) => (
                          <tr key={notice.classNo}>
                            <td className="number">{notice.classNo}</td>
                            <td>{notice.title}</td>
                            <td className="date">{notice.join}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Tdfont>
                <PageStyle>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={100}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                  />
                </PageStyle>
              </HelpBoard>
            </Board>
          </BoardWrapper>
        </Container>
        <Footer />
      </Background>
    </>
  );
};

export default NoticePage;
