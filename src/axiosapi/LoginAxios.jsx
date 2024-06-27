import axios from "axios";
import Common from "../common/Common";
import AxiosInstance from "./AxiosInstance";
const LoginAxios = {
  memberSignUp: async (
    email,
    pwd,
    name,
    registrationNumber,
    nickName,
    coupleName
  ) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
      registrationNumber: registrationNumber,
      nickName: nickName,
      coupleName: coupleName,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/signup", member);
  },
  emailIsExist: async (email) => {
    const emailObject = {
      email: email,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/email", emailObject);
  },
  login: async (email, pwd) => {
    const member = {
      email: email,
      pwd: pwd,
    };
    return await AxiosInstance.post("/auth/login", member);
  },
};
export default LoginAxios;
