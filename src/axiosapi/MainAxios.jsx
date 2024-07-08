import AxiosInstance from "./AxiosInstance";
const MainAxios = {
  //닉네임 찾기
  searchNickName: async (email, coupleName) => {
    return await AxiosInstance.get(
      `/main/searchNickName?email=${email}&coupleName=${coupleName}`
    );
  },
  //디데이 검색.
  searchDday: async (coupleName) => {
    return await AxiosInstance.get(`/main/searchDday?coupleName=${coupleName}`);
  },
  //디데이 값 저장.
  saveDday: async (coupleName, dDay) => {
    return await AxiosInstance.get(
      `/main/saveDday?coupleName=${coupleName}&dDay=${dDay}`
    );
  },
};
export default MainAxios;
