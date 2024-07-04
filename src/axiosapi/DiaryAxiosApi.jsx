import axios from "axios";
import Common from "../common/Common";

const AxiosApi = {
  // 회원 가입
  diaryReg: async (selsectDate, email, pwd, name) => {
    const member = {
      selsectDate: selsectDate,
      email: email,
      password: pwd,
      name: name,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/signup", member);
  },
};
export default AxiosApi;
