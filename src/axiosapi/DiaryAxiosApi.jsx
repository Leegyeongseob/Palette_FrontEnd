import AxiosInstance from "./AxiosInstance";

const AxiosApi = {
  // 다이어리 저장
  diaryReg: async (saveData) => {
    return await AxiosInstance.post("/diary/save", saveData);
  },
};
export default AxiosApi;
