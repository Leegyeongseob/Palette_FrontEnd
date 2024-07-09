import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
import MainAxios from "../../axiosapi/MainAxios";
import { useEffect, useState } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { profileStorage } from "../../firebase/ProfileImgUpload";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const Contain = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: ${({ clothes }) => (clothes ? "space-evenly" : "center")};
  align-items: center;
`;
const ProfileDiv = styled.div`
  width: ${({ clothes }) => (clothes ? "23vw" : "8vw")};
  height: ${({ clothes }) => (clothes ? "15vh" : "23vh")};
  display: ${({ clothes }) => (clothes ? "flex" : "block")};
  flex-direction: ${({ direction }) => (direction ? "row-reverse" : "row")};
  justify-content: flex-end;
`;
const ProfileImgDiv = styled.div`
  width: 8vw;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeartDiv = styled.div`
  width: 4vw;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Heart = styled.div`
  width: ${({ clothes }) => (clothes ? "2.604vw" : "3.646vw")};
  height: ${({ clothes }) => (clothes ? "5.247vh" : "7.345vh")};
  background-image: url(${heart});
  background-size: cover;
`;
const Profile = styled.div`
  width: 6.771vw;
  height: 13.641vh;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  border-radius: 50%;
  position: absolute;
`;
const Text = styled.div`
  width: ${({ clothes }) => (clothes ? "7vw" : "8vw")};
  height: 7.345vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.042vw;
  font-weight: 600;
  color: ${({ clothes }) => (clothes ? "#000" : "#fff")};
`;
const ProfileCover = styled.div`
  width: 6.771vw;
  height: 13.641vh;
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > label {
    cursor: pointer;
    width: 5vw;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }
  & > input[type="file"] {
    display: none;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:hover > label {
    display: flex;
  }
`;
const CoupleImg = ({ clothes = false }) => {
  // 커플 닉네임 저장
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  //나의 이미지 url저장
  const [imgUrl, setImgUrl] = useState("");
  //내 짝의 이미지 url저장
  const [myDarling, setMyDarling] = useState("");
  //파일 저장 변수
  const [saveFile, setSaveFile] = useState(null);
  const email = sessionStorage.getItem("email");
  //커플 개인 닉네임 불러오기
  const coupleNickNameAxois = async () => {
    //커플 이름 search
    const resCouple = await MemberAxiosApi.coupleNameSearch(email);
    //커플 이름으로 닉네임 가져오기
    const resNickName = await MainAxios.searchNickName(email, resCouple.data);
    console.log(resNickName.data);
    setCoupleNickName(resNickName.data);
  };
  useEffect(() => {
    coupleNickNameAxois();
    coupleProfileAxois();
  }, []);
  const AddImgBtnOnChangeHandler = (e) => {
    // 파일 받는 부분
    setSaveFile(e.target.files[0]);
  };
  useEffect(() => {
    handleFileUpload();
  }, [saveFile]);
  // 파일 업로드 하고 이전파일 삭제
  const handleFileUpload = async () => {
    if (saveFile) {
      const storageRef = ref(profileStorage, saveFile.name);
      try {
        // 파일 업로드
        await uploadBytesResumable(storageRef, saveFile);
        console.log("File uploaded successfully!");
        // 이전 파일 삭제
        if (imgUrl) {
          const oldFileRef = ref(profileStorage, imgUrl); // imgUrl은 이전 파일의 다운로드 URL입니다.
          await deleteObject(oldFileRef);
          console.log("Previous file deleted successfully!");
        }
        const url = await getDownloadURL(storageRef);
        // DB에 url 저장
        const res = await MemberAxiosApi.profileUrlSave(email, url);
        console.log(res.data);
        if (url && res.data) {
          setImgUrl(url);
        }
        //파이어베이스 이전 파일 삭제

        setSaveFile(null);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };
  // 처음 들어왔을 때 화면에 띄워주는 비동기 함수
  const coupleProfileAxois = async () => {
    const res = await MemberAxiosApi.coupleProfileUrl(email);
    setImgUrl(res.data[0]);
    sessionStorage.setItem("imgUrl", res.data[0]);
    setMyDarling(res.data[1]);
    sessionStorage.setItem("myDarling", res.data[1]);
    console.log(res.data);
  };
  return (
    <Contain clothes={clothes}>
      <ProfileDiv clothes={clothes}>
        <ProfileImgDiv>
          <Profile imageurl={imgUrl ? imgUrl : manprofile}>
            <ProfileCover>
              <label htmlFor="fileInput" className="AddLabel">
                Choose File
              </label>
              <input
                id="fileInput"
                className="AddImgBtn"
                type="file"
                onChange={AddImgBtnOnChangeHandler}
              ></input>
            </ProfileCover>
          </Profile>
        </ProfileImgDiv>
        <Text clothes={clothes}>{coupleNickName[0] || "알콩"}</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart clothes={clothes} />
      </HeartDiv>
      <ProfileDiv clothes={clothes} direction={true}>
        <ProfileImgDiv>
          <Profile imageurl={myDarling ? myDarling : womanprofile} />
        </ProfileImgDiv>
        <Text clothes={clothes}>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
