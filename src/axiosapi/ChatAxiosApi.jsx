import axios from "axios";
import Common from "../common/Common";
import AxiosInstance from "./AxiosInstance";

const ChatAxiosApi = {
  // 채팅방 정보 보기
  chatDetail: async () => {
    // roomId 매개변수 삭제
    return await AxiosInstance.get(Common.PALLETE_DOMAIN + `/chat/messages`);
  },
  // 채팅방 생성
  chatCreate: async (name) => {
    const chat = {
      name: name,
    };
    return await AxiosInstance.post(Common.PALLETE_DOMAIN + "/chat/new", chat);
  },
};

export default ChatAxiosApi;
