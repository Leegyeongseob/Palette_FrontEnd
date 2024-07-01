import { useEffect } from "react";

const useKakao = (appKey) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(appKey); // 여기에 본인의 카카오 앱 키를 입력하세요
        console.log(window.Kakao.isInitialized()); // true
      }
    };
    document.body.appendChild(script);
  }, [appKey]);
};

export default useKakao;
