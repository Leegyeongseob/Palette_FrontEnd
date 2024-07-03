import AxiosInstance from "./AxiosInstance";

const MemberAxiosApi = {
  //회원수정을 위한 계정을 불러오기 위한 axois
  memberAxios: async (email) => {
    const member = { email: email };
    return await AxiosInstance.post("/member/info", member);
  },
  //회원 수정 Axios
  memberModify: async (email, name, nickName, coupleName) => {
    const member = {
      email: email,
      name: name,
      nickName: nickName,
      coupleName: coupleName,
    };
    return await AxiosInstance.post("/member/modify", member);
  },
  memberDelete: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/member/delete", member);
  },
};

export default MemberAxiosApi;
