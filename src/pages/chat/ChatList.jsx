import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Common from "../../common/Common";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import { useRef } from "react";

const ChatListContainer = styled.div`
  width: 54vw;
  height: 68vh;
  padding: 30px;
  position: relative;
  margin: 40px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ChatRoom = styled.li`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
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

const DeleteButton = styled.button`
  margin-left: auto;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
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
  const ws = useRef(null); // 웹소켓 객체
  const { roomId } = useParams(); // 채팅방 번호
  const [sender, setSender] = useState(""); // 보내는 사람
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부

  // useEffect(() => {
  //   const fetchChatRooms = async () => {
  //     try {
  //       const response = await ChatAxiosApi.chatList(email);
  //       console.log(response.data);
  //       setChatRooms(response.data);
  //     } catch (error) {
  //       console.error("Error fetching chat rooms:", error);
  //     }
  //   };
  //   fetchChatRooms();

  // }, [email]);

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
    navigate("/chatcreate");
  };

  return (
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
    </ChatListContainer>
  );
}

export default ChatList;
