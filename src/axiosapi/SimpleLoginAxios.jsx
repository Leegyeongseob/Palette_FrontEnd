import axios from "axios";

const SimpleLoginAxios = {
  getToken: async (code) => {
    console.log("code:", code);
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_KAKAO_REST_API_KEY,
    };
    //key값 확인하는 부분
    console.log(process.env.REACT_APP_KAKAO_API_KEY);
    console.log(process.env.REACT_APP_KAKAO_REDIRECT_URI);
    console.log(process.env.REACT_APP_KAKAO_REST_API_KEY);
    return await axios.post("https://kauth.kakao.com/oauth/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  },
  tokenInfo: async (ACCESS_TOKEN) => {
    return await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  },
};
export default SimpleLoginAxios;
