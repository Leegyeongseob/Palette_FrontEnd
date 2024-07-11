import { useEffect } from "react";
import SimpleLoginAxios from "../../../axiosapi/SimpleLoginAxios";
import { useNavigate } from "react-router-dom";
import LoginAxios from "../../../axiosapi/LoginAxios";
import Common from "../../../common/Common";
const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    const fetchKakaoAuthCode = async () => {
      try {
        // 인가 토큰으로 accessToken과 유저 정보 받아오는 부분
        const res = await SimpleLoginAxios.getToken(code);
        const tokendata = await SimpleLoginAxios.tokenInfo(
          res.data.access_token
        );
        const propsToPass = {
          kakaoProp: true,
          kakaoEmail: tokendata.data.kakao_account.email,
          kakaopwd: tokendata.data.id,
          kakaoName: tokendata.data.properties.nickname,
          kakaoImgUrl: tokendata.data.properties.profile_image,
        };
        const emailExist = await LoginAxios.emailIsExist(
          tokendata.data.kakao_account.email
        );
        //이메일 존재하면 화면이동
        if (emailExist.data) {
          //엑세스 토큰 작업
          const email = tokendata.data.kakao_account.email;
          const pwd = tokendata.data.id;
          const ImgUrl = tokendata.data.properties.profile_image;
          const response = await LoginAxios.login(email, pwd);
          console.log("accessToken : ", response.data.accessToken);
          console.log("refreshToken : ", response.data.refreshToken);
          Common.setAccessToken(response.data.accessToken);
          Common.setRefreshToken(response.data.refreshToken);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("kakaoImgUrl", ImgUrl);
          navigate("/:coupleName/main-page");
        }
        //아니면 여기로 이동
        else {
          navigate("/signup-page", { state: propsToPass });
        }
      } catch (error) {
        console.error("Error during Kakao login:", error);
      }
    };

    fetchKakaoAuthCode();
  }, [code, navigate]);
};
export default KakaoRedirect;
