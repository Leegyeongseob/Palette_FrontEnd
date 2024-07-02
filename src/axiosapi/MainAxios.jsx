import AxiosInstance from "./AxiosInstance";
const MainAxios = {
  searchNickName: async (coupleName) => {
    return await AxiosInstance.get(
      `/main/searchNickName?coupleName=${coupleName}`
    );
  },
  isExistDday: async (coupleName) => {
    return await AxiosInstance.get(
      `/main/isExistDday?coupleName=${coupleName}`
    );
  },
};
export default MainAxios;
