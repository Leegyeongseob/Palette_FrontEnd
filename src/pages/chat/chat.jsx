import styled from "styled-components";
import { Link } from "react-router-dom";
import chatBackground from "../../img/chat/pcchatimg/9.jpg";
import { useState } from "react";

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

const InputText = styled.div`
  margin-top: 4vh;
  display: flex;
  align-items: center;
  z-index: 1;
  input {
    flex: 1;
    height: 4vh;
    font-size: 15px;
    border: 0;
    margin-left: 2vw;
    border-radius: 10px 0 0 10px;
    outline: none;
    padding-left: 10px;
    background-color: #ffffff;
  }

  button {
    width: 4vh;
    height: 4vh;
    background-color: #fdff8f;
    margin-right: 2vw;
    border: 0;
    border-radius: 0 10px 10px 0;
    outline: none;
    margin-left: auto;
  }
`;
const ChatMain = () => {
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
        </Textarea>
        <InputText>
          <input type="text" />
          <button></button>
        </InputText>
      </Chatpage>
    </GlobalStyle>
  );
};
export default ChatMain;
