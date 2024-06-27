import axios from "axios";
import Common from "../common/Common";
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
};
export default LoginAxios;
