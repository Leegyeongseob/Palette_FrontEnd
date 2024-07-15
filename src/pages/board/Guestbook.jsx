import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import GuestbookAxios from "../../axiosapi/GuestbookAxios";

const GuestbookSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;

const GuestbookTitle = styled.div`
  margin-top: 2.5vh;
  width: 25.5vw;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookGrayBar = styled.div`
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookWriteArea = styled.div`
  margin-left: 1vw;
  margin-top: 2vh;
  width: 23.5vw;
  height: 9.6vh;
  border: 1px solid black;
`;
const GuestbookWriteMain = styled.div`
  margin-left: 1vw;
  width: 17.8vw;
  height: 10vh - 1px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const GuestbookInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 13px;
  resize: none;
  overflow-y: aute;
`;
const GuestbookWriteButton = styled.div`
  margin-top: 0.5vh;
  margin-left: 20vw;
  width: 4vw;
  height: 2vh;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookList = styled.div`
  height: 46vh;
  overflow-y: auto; /* 세로 스크롤 추가 */
`;
const GuestbookArea = styled.div`
  margin-left: 1vw;
  margin-top: 2vh;
  width: 23.5vw;
  height: 12vh;
  border: 1px solid black;
`;
const GuestbookHead = styled.div`
  height: 2.375vh;
  background-color: #cdcfc4;
  border-bottom: 1px solid black;
  display: flex;
`;
const GuestbookNo = styled.div`
  width: 3vw;
  height: 2.375vh;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookNickname = styled.div`
  width: 6vw;
  height: 2.375vh;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookDate = styled.div`
  width: 7vw;
  height: 2.375vh;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookDelete = styled.div`
  margin-left: 4vw;
  width: 3vw;
  height: 2.375vh;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookBody = styled.div`
  height: 9.6vh;
  background-color: #eccdb0;
  border-bottom: 1px solid black;
  display: flex;
`;
const GuestbookImage = styled.div`
  width: 4.8vw;
  height: 9.7vh;
  background-size: contain;
  background-repeat: no-repeat;
`;

const GuestbookMain = styled.div`
  margin-left: 1vw;
  width: 17vw;
  height: 10vh - 1px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Guestbook = ({}) => {
  const [newEntry, setNewEntry] = useState("");
  // 방명록 관련
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const myImgUrl = async () => {
      try {
        const myImg = await GuestbookAxios.getMyImgUrl(email);
        if (myImg.data === "") {
          const myImgUrl = await GuestbookAxios.getMyImgUrlEmail(email);
          if (myImgUrl === true) {
            setImgUrl(manprofile); // 이미지가 있는 경우 이미지 경로 설정
          } else {
            setImgUrl(womanprofile); // 이미지가 없는 경우 빈 문자열 설정
          }
        } else {
          console.log("나의이미지", myImg);
          setImgUrl(myImg.data);
        }
      } catch (error) {
        console.log("이미지가져오기 실패", error);
      }
    };
    myImgUrl();
  });

  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      try {
        const data = await GuestbookAxios.getGuestBookEntries(coupleName);
        console.log("커푸루이름 방명록에서 확인", coupleName);
        console.log("data", data);
        setGuestbookEntries(data);
      } catch (error) {
        console.log("방명록 가져오기 실패", error);
      }
    };
    fetchGuestbookEntries();
  }, []);

  const handleAddEntry = async () => {
    if (!newEntry.trim()) return; // 입력값이 없으면 처리하지 않음

    const coupleName = sessionStorage.getItem("coupleName");
    const email = sessionStorage.getItem("email");

    try {
      const addedEntry = await GuestbookAxios.addGuestBookEntry({
        contents: newEntry, // 실제 입력된 내용을 사용
        memberEmail: email, // sessionStorage에서 가져온 이메일 사용
        coupleName: coupleName, // sessionStorage에서 가져온 커플 이름 사용
      });
      console.log("newentry", newEntry);

      setGuestbookEntries([...guestbookEntries, addedEntry]); // 새 항목을 기존 목록에 추가
      setNewEntry(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Failed to add guestbook entry:", error); // 오류 처리
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const email = sessionStorage.getItem("email");
      await GuestbookAxios.deleteGuestBookEntry(entryId, email);
      setGuestbookEntries(
        guestbookEntries.filter((entry) => entry.id !== entryId)
      );
    } catch (error) {
      alert('작성자가 다른 게시물 입니다.')
      console.error("Failed to delete guestbook entry:", error);
    }
  };
  console.log("entry확인", guestbookEntries);

  return (
    <GuestbookSide>
      <GuestbookTitle>방명록</GuestbookTitle>
      <GuestbookGrayBar />
      <GuestbookWriteArea>
        <GuestbookBody>
          <GuestbookImage
            style={{ backgroundImage: `url(${imgUrl})` }}
          ></GuestbookImage>

          <GuestbookWriteMain>
            <GuestbookInput
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="내용을 입력하세요."
            />
          </GuestbookWriteMain>
        </GuestbookBody>
      </GuestbookWriteArea>
      <GuestbookWriteButton onClick={handleAddEntry}>
        방명록 등록
      </GuestbookWriteButton>
      <GuestbookList>
        {guestbookEntries.map((entry, index) => (
          <GuestbookArea key={entry.id}>
            <GuestbookHead>
              <GuestbookNo>{index + 1}</GuestbookNo>
              <GuestbookNickname>{entry.memberNickName}</GuestbookNickname>
              <GuestbookDate>
                {new Date(entry.regDateTime).toLocaleDateString()}
              </GuestbookDate>
              <GuestbookDelete onClick={() => handleDeleteEntry(entry.id)}>
                삭제
              </GuestbookDelete>
            </GuestbookHead>
            <GuestbookBody>
              <GuestbookImage
                style={{ backgroundImage: `url(${entry.imgUrl})` }}
              />
              <GuestbookImage />
              <GuestbookMain>{entry.contents}</GuestbookMain>
            </GuestbookBody>
          </GuestbookArea>
        ))}
      </GuestbookList>
    </GuestbookSide>
  );
};

export default Guestbook;
