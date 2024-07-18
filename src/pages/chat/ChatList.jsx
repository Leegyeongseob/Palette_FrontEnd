import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Common from "../../common/Common";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import { useRef } from "react";
import ChatModal from "./ChatModal";

const ChatListContainer = styled.div`
  /* width: 54vw; */
  width: 1000px;
  height: 68vh;
  padding: 15px;
  position: relative;
  margin-top: 5vh;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* background-color: black; */
  @media screen and (max-width: 1200px) {
    width: 832px;
    height: 60vh;
  }
  @media screen and (max-width: 768px) {
    width: 560px;
    height: 36vh;
  }
`;

const ChatUl = styled.ul`
  list-style-type: none;
  /* padding: 0; */
`;

const ChatRoom = styled.li`
  display: flex;
  background-color: #fff;
  /* border: 1px solid #ddd; */
  /* margin-bottom: 10px; */
  padding: 13px;
  /* border-radius: 5px; */

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #e9e9e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 0 10px 0;
  color: #444;
`;

const ChatDate = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0;
  text-align: right;
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

  const openModal = () => {
    setCreateModal(true);
  };

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
    <ChatListContainer>
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
  );
}

export default ChatList;
