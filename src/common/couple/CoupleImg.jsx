import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
import MainAxios from "../../axiosapi/MainAxios";
import { useEffect, useState } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
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
  &:hover > .AddLabel {
    width: 5vw;
    height: 3vh;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    border: none;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:hover > .AddImgBtn {
    display: flex;
  }
  &:hover > .UploadBtn {
    display: flex;
  }
`;
const AddFileLabel = styled.label`
  display: none;
`;
const AddImgFileInput = styled.div`
  display: none;
`;
const UploadFileBtn = styled.div`
  width: 4vw;
  height: 3vh;
  border-radius: 10px;
  display: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
`;
const CoupleImg = ({ clothes = false }) => {
  // 커플 닉네임 저장
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  // 이미지 url저장
  const [imgUrl, setImgUrl] = useState("");
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
  }, []);
  const AddImgBtnOnChangeHandler = (e) => {
    // 파일 받는 부분
    setSaveFile(e.target.files[0]);
  };
  // 파일 업로드 부분
  const handleFileUpload = () => {
    uploadFile(saveFile);
  };
  // 파일 업로드 하는 비동기 함수
  const uploadFile = async () => {
    //파이어베이스에 이미지 업로드 하는 부분
  };
  return (
    <Contain clothes={clothes}>
      <ProfileDiv clothes={clothes}>
        <ProfileImgDiv>
          <Profile imageurl={manprofile}>
            <ProfileCover>
              {saveFile ? (
                <UploadFileBtn className="UploadBtn" onClick={handleFileUpload}>
                  Upload
                </UploadFileBtn>
              ) : (
                <>
                  <AddFileLabel htmlFor="fileInput" className="AddLabel">
                    Choose File
                  </AddFileLabel>
                  <AddImgFileInput
                    id="fileInput"
                    className="AddImgBtn"
                    type="file"
                    onChange={AddImgBtnOnChangeHandler}
                  ></AddImgFileInput>
                </>
              )}
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
          <Profile imageurl={womanprofile} />
        </ProfileImgDiv>
        <Text clothes={clothes}>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
