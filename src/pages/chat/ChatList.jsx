import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import ChatModal from "./ChatModal";
import chat from "../../img/background/theme/chat.jpg";
import chat_1 from "../../img/background/theme/chat-1.jpg";

const BookTheme = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${chat});
  /* background-color: #d0d7e9; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookTheme2 = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.05vw;
  background-image: url(${chat_1});
  /* background-color: #d0d7e9; */
  background-size: cover;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const ChatListContainer = styled.div`
  width: 90%;
  height: 90%;
  padding: 22px;
  position: relative;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #dbe5f8;
  overflow: auto;
`;

const ChatUl = styled.ul`
  list-style-type: none;
`;

const ChatRoom = styled.li`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 10px;
  /* margin-bottom: 5px; */
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e9e9e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.h1`
  width: 100%;
  height: 10%;
  font-size: 1.4vw;
  color: #333;
  text-align: center;
  border-bottom: 1px solid darkgray;
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 10px 0;
  color: #444;
`;

const CircleFixedButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 30px;
  z-index: 10;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1da1f2;
  color: white;
  font-size: 30px;
  line-height: 1;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #1991db;
  }

  &:before {
    content: "+";
  }
`;

function ChatList() {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const [createModal, setCreateModal] = useState(false);

  const closeModal = () => {
    setCreateModal(false);
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await ChatAxiosApi.chatList(email);
        console.log(response.data);
        const filteredRooms = filterChatRooms(response.data, email);
        setChatRooms(filteredRooms);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };
    fetchChatRooms(); // 최초 한 번 호출

    // 1초마다 채팅방 목록 업데이트
    const intervalId = setInterval(fetchChatRooms, 1000);

    // 컴포넌트 언마운트 시 인터벌 해제
    return () => clearInterval(intervalId);
  }, []);

  const filterChatRooms = (rooms, email) => {
    return rooms.filter(
      (room) => room.firstEmail === email || room.secondEmail === email
    );
  };

  const enterChatRoom = (roomId) => {
    console.log(`Entering chat room ${roomId}`);
    navigate(`/chat/${roomId}`);
  };

  const createChatRoom = () => {
    setCreateModal(true);
  };

  return (
    <>
      <BookTheme>
        <ChatListContainer>
          <Header>채팅방 목록</Header>
          <ChatUl>
            {chatRooms.map((room) => (
              <ChatRoom
                key={room.roomId}
                onClick={() => enterChatRoom(room.roomId)}
              >
                <ChatName>{room.name}</ChatName>
              </ChatRoom>
            ))}
          </ChatUl>
          <CircleFixedButton onClick={createChatRoom}></CircleFixedButton>
          <ChatModal isOpen={createModal} onClose={closeModal}></ChatModal>
        </ChatListContainer>
      </BookTheme>
      <BookTheme2></BookTheme2>
    </>
  );
}

export default ChatList;
