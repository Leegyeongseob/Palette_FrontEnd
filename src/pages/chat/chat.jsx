import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaRegImage, FaGear, FaHeart } from "react-icons/fa6";
import { TbWallpaper } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import {
  BsEmojiAngry,
  BsEmojiAstonished,
  BsEmojiFrown,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiGrin,
  BsEmojiHeartEyes,
} from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import chatBack1 from "../../img/chat/pcchatimg/9.jpg";
import chatBack2 from "../../img/chat/pcchatimg/6.jpg";
import chatBack3 from "../../img/chat/pcchatimg/8.jpg";
import Common from "../../common/Common";
import { chatstorage } from "../../firebase/Chatfirebase";

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

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Chatpage = styled.div`
  width: 54vw;
  height: 68vh;
  margin-top: 5vh;
  background: url(${(props) => props.backgroundImage}) no-repeat center center;
  background-size: cover;
  position: relative;
`;

const Textarea = styled.div`
  width: 54vw;
  height: ${(props) => (props.isPlusMenuVisible ? "30vh" : "50vh")};
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
  width: 54vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
`;

const TemaMenu = styled.div`
  width: 54vw;
  height: 18vh;
  background-color: #a5a5a5b7;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
  img {
    width: 18vw;
    height: auto;
    max-height: 100%;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const EmojiMenu = styled.div`
  width: 54vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
  justify-content: space-around;
`;

const EmojiIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: #ffcc00; /* 호버 시 색상 변경 */
  }
`;

const PlusMenuBtn = styled.div`
  font-size: 50px;
  padding: 10px;
  display: flex;

  gap: 20px;
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
  const [backgroundImage, setBackgroundImage] = useState(chatBack1);
  const [isTemaMenuVisible, setTemaMenuVisible] = useState(false);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const inputFileRef = useRef(null);
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [sender, setSender] = useState(""); // 보내는 사람
  const [receiver, setreceiver] = useState("");
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null); // 웹소켓 객체
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [imageURL, setImageURL] = useState("");

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      // 엔터키 입력시, 공백 제거 후 비어있지 않으면
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    if (inputMsg.trim() !== "") {
      const messageData = {
        type: "TALK",

        sender: sender,
        message: inputMsg,
        imageUrl: imageURL,
      };
      ws.current.send(JSON.stringify(messageData));
      setInputMsg("");
      setImageURL("");
    }
  };
  // useEffect(() => {
  //   // 이메일로 회원 정보 가져 오기
  //   const getMember = async () => {
  //     try {
  //       const rsp = await ChatAxiosApi.memberGetInfo();
  //       console.log(rsp.data.name);
  //       setSender(rsp.data.name);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getMember();
  // }, []);
  // //-------------------------------------------------
  // useEffect(() => {
  //채팅방 정보 가져 오기
  const accessToken = Common.getAccessToken();
  //   const getChatRoom = async () => {
  //     try {
  //       const rsp = await ChatAxiosApi.chatDetail();
  //       console.log(rsp.data.name);
  //       setRoomName(rsp.data.name);
  //     } catch (e) {
  //       if (e.rsp.status === 401) {
  //         await Common.handleUnauthorized();
  //         const newToken = Common.getAccessToken();
  //         if (newToken !== accessToken) {
  //           const rsp = await ChatAxiosApi.chatDetail();
  //           console.log(rsp.data.name);
  //           setRoomName(rsp.data.name);
  //         }
  //       }
  //     }
  //   };
  //   getChatRoom();
  // }, []);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(Common.PALETTE_SOCKET_URL); // 웹소켓 연결
      ws.current.onopen = () => {
        // 웹소켓 연결되면
        console.log("connected to " + Common.PALETTE_SOCKET_URL);
        setSocketConnected(true); // 웹소켓 연결 상태 변경
      };
    }

    ws.current.onmessage = (evt) => {
      // 서버에서 메시지가 오면
      const data = JSON.parse(evt.data); // 받은 메시지를 JSON 객체로 변환
      setChatList((prevChatList) => [...prevChatList, data]);
      console.log(data.message);
    };
  }, [socketConnected]); // socketConnected 값이 변경되면 useEffect 실행

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  // useEffect(() => {
  //   const fetchPreviousChats = async () => {
  //     try {
  //       // 수정된 부분: sender와 receiver 정보를 백엔드에서 필요한 형식으로 전달
  //       const response = await ChatAxiosApi.getChatMessages(sender, receiver);
  //       setChatList(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch previous chats:", error);
  //     }
  //   };

  // if (!ws.current) {
  //   ws.current = new WebSocket(Common.PALETTE_SOCKET_URL);
  //   ws.current.onopen = () => {
  //     console.log("connected to " + Common.PALETTE_SOCKET_URL);
  //     setSocketConnected(true);
  //   };
  // }

  //   ws.current.onmessage = (evt) => {
  //     const data = JSON.parse(evt.data);
  //     setChatList((prevChatList) => [...prevChatList, data]);
  //   };

  //   fetchPreviousChats(); // useEffect 안에서 호출

  //   return () => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   };
  // }, [sender, receiver]); // sender와 receiver 값이 변경되면 useEffect 실행

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

  const handleTemaClick = (image) => {
    setBackgroundImage(image);
    setTemaMenuVisible(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = chatstorage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        setImageURL(url); // 이미지 업로드 후 URL 설정
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };
  return (
    <GlobalStyle>
      <Chatpage backgroundImage={backgroundImage}>
        <TopText>상대 닉네임</TopText>
        <Textarea
          ref={chatContainerRef}
          isPlusMenuVisible={
            isPlusMenuVisible || isTemaMenuVisible || isEmojiMenuVisible
          }
        >
          {chatList.map((chat, index) => (
            <Message key={index} isSender={chat.sender === sender}>
              {chat.imageURL ? (
                <img
                  src={chat.imageURL}
                  alt="전송된 이미지"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                `${chat.sender} > ${chat.message}`
              )}
            </Message>
          ))}
        </Textarea>
        <PlusMenu isVisible={isPlusMenuVisible}>
          <PlusMenuBtn>
            <label htmlFor="imageInput">
              <FaRegImage className="icon 이미지사진" />
            </label>
            <input
              type="file"
              id="imageInput"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <TbWallpaper className="icon 톱니" onClick={toggleTemaMenu} />
            <MdEmojiEmotions className="icon 임티" onClick={toggleEmojiMenu} />
          </PlusMenuBtn>
        </PlusMenu>
        <TemaMenu isVisible={isTemaMenuVisible}>
          <img
            src={chatBack1}
            alt="테마1"
            onClick={() => handleTemaClick(chatBack1)}
          />
          <img
            src={chatBack2}
            alt="테마2"
            onClick={() => handleTemaClick(chatBack2)}
          />
          <img
            src={chatBack3}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack3)}
          />
        </TemaMenu>
        <EmojiMenu isVisible={isEmojiMenuVisible}>
          <EmojiIcon>
            <BsEmojiHeartEyes />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiAngry></BsEmojiAngry>
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiAstonished />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiFrown />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiDizzy />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiExpressionless />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiGrin />
          </EmojiIcon>
        </EmojiMenu>
        <InputText>
          <button className="plus" onClick={togglePlusMenu}></button>
          <input
            type="text"
            value={inputMsg}
            onChange={onChangMsg}
            placeholder="메시지를 입력하세요"
            onKeyUp={onEnterKey}
          />
          <button className="send" onClick={onClickMsgSend}>
            <FaHeart className="heart" />
          </button>
        </InputText>
      </Chatpage>
    </GlobalStyle>
  );
};

export default ChatMain;
