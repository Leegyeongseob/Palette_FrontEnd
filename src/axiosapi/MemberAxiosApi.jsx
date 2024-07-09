import AxiosInstance from "./AxiosInstance";

const MemberAxiosApi = {
  //회원수정을 위한 계정을 불러오기 위한 axois
  memberAxios: async (email) => {
    const member = { email: email };
    return await AxiosInstance.post("/member/info", member);
  },
  //회원 수정 Axios
  memberModify: async (email, updateEmail, pwd, name, nickName, coupleName) => {
    const member = {
      email: email,
      updateEmail: updateEmail,
      pwd: pwd,
      name: name,
      nickName: nickName,
      coupleName: coupleName,
    };
    return await AxiosInstance.post("/member/modify", member);
  },
  //회원 삭제 Axois
  memberDelete: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/member/delete", member);
  },
  //커플 이름 확인 Axios
  coupleNameSearch: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/member/coupleNameSearch", member);
  },

  //솔로인지 커플인지 Axios
  isCoupleTrue: async (coupleName) => {
    const member = {
      coupleName: coupleName,
    };
    return await AxiosInstance.post("/member/isCoupleTrue", member);
  },
  //프로필url 저장 Axios
  profileUrlSave: async (email, url) => {
    return await AxiosInstance.get(
      `/member/profileUrlSave?email=${email}&url=${url}`
    );
  },
  //커플 프로필 url을 가져오는 Axios
  coupleProfileUrl: async (email) => {
    return await AxiosInstance.get(`member/coupleProfileUrl?email=${email}`);
  },
};

export default MemberAxiosApi;
