import React, { useState } from "react";
import styled from "styled-components";
import { FaRegImage, FaGear, FaHeart } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import chatBackground from "../../img/chat/pcchatimg/9.jpg";

const GlobalStyle = styled.div`
  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 12px; /* 스크롤바 너비 */
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb {
    background: #cdcfc4; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a3a59c; /* 스크롤바 호버 색상 */
  }
`;

const Chatpage = styled.div`
  width: 60vw;
  height: 65vh;
  margin-top: 5vh;
  background: url(${chatBackground}) no-repeat center center;
  background-size: cover;
  position: relative;
`;

const Textarea = styled.div`
  width: 60vw;
  height: 50vh;
  overflow-y: auto;
  padding: 10px;
  background: transparent;
`;

const TopText = styled.div`
  position: sticky;
  top: 0;
  background-color: transparent;
  z-index: 1;
  padding: 10px;
`;

const PlusMenu = styled.div`
  width: 60vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
`;

const TemaMenu = styled.div`
  width: 60vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
`;

const EmojiMenu = styled.div`
  width: 60vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
`;
const PlusMenuBtn = styled.div`
  font-size: 50px;
  padding: 10px;
  .icon {
    margin-right: 20px;
  }
  .icon:last-child {
    margin-right: 0;
  }
`;

const InputText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;

  input {
    flex: 1;
    height: 4vh;
    font-size: 15px;
    border: 0;
    border-radius: 10px 0 0 10px;
    outline: none;
    padding-left: 10px;
    background-color: #ffffff;
  }

  .send {
    width: 4vh;
    height: 4vh;
    background-color: #fdff8f;
    margin-right: 2vw;
    border: 0;
    border-radius: 0 10px 10px 0;
    outline: none;
    font-size: 1rem;
    margin-left: auto;
    cursor: pointer;
    position: relative;
    padding-right: 30px;
  }

  .heart {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }

  .plus {
    position: relative;
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .plus::before,
  .plus::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: black;
  }
  .plus::before {
    transform: rotate(0deg);
  }

  .plus::after {
    transform: rotate(90deg);
  }
`;

const ChatMain = () => {
  const [isPlusMenuVisible, setPlusMenuVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTemaMenuVisible, setTemaMenuVisible] = useState(false);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);

  const togglePlusMenu = () => {
    setPlusMenuVisible(!isPlusMenuVisible);
    setTemaMenuVisible(false);
    setEmojiMenuVisible(false);
  };

  const toggleTemaMenu = () => {
    setTemaMenuVisible(!isTemaMenuVisible);
    setPlusMenuVisible(false);
    setEmojiMenuVisible(false);
  };

  const toggleEmojiMenu = () => {
    setEmojiMenuVisible(!isEmojiMenuVisible);
    setPlusMenuVisible(false);
    setTemaMenuVisible(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value); // 입력된 텍스트 업데이트
  };

  const handleSendClick = () => {
    // Send 버튼 클릭 시 처리할 로직
    console.log("전송된 텍스트:", inputText); // 예시로 콘솔에 출력
    // 여기에 데이터베이스로 전송하는 코드를 추가할 수 있습니다.
    // 예를 들어, axios나 fetch를 사용하여 백엔드 API에 데이터 전송
  };

  return (
    <GlobalStyle>
      <Chatpage>
        <TopText>상대방 이름</TopText>
        <Textarea>
          <p>샘플 텍스트 1</p>
          <p>샘플 텍스트 2</p>
          <p>샘플 텍스트 3</p>
          <p>샘플 텍스트 4</p>
          <p>샘플 텍스트 5</p>
          <p>샘플 텍스트 6</p>
          <p>샘플 텍스트 7</p>
          <p>샘플 텍스트 8</p>
          <p>샘플 텍스트 9</p>
          <p>샘플 텍스트 10</p>
          <p>샘플 텍스트 11</p>
          <p>샘플 텍스트 12</p>
          <p>샘플 텍스트 13</p>
          <p>샘플 텍스트 14</p>
          <p>샘플 텍스트 15</p>
          <p>난난난난나난난</p>
          <p>행복해요 이마트</p>
          <p>난난난난난난난난난나</p>
        </Textarea>
        <PlusMenu isVisible={isPlusMenuVisible}>
          <PlusMenuBtn>
            <FaRegImage className="icon 이미지사진" />
            <FaGear className="icon 톱니" onClick={toggleTemaMenu} />
            <MdEmojiEmotions className="icon 임티" onClick={toggleEmojiMenu} />
          </PlusMenuBtn>
        </PlusMenu>
        <TemaMenu isVisible={isTemaMenuVisible}>테마선택메뉴</TemaMenu>
        <EmojiMenu isVisible={isEmojiMenuVisible}>임티선택메뉴</EmojiMenu>
        <InputText>
          <button className="plus" onClick={togglePlusMenu}></button>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요"
          />
          <button className="send" onClick={handleSendClick}>
            <FaHeart className="heart" />
          </button>
        </InputText>
      </Chatpage>
    </GlobalStyle>
  );
};

export default ChatMain;
