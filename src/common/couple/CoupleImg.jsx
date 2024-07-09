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
  height: ${({ clothes }) => (clothes ? "12vh" : "23vh")};
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
  width: ${({ clothes }) => (clothes ? "5vw" : "6.771vw;")};
  height: ${({ clothes }) => (clothes ? "10vh" : "13.641vh;")};
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
  display: ${({ clothes }) => (clothes ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Label = styled.label`
  cursor: pointer;
  width: 5vw;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;

  ${ProfileCover}:hover & {
    display: flex;
  }
`;

const Input = styled.input`
  display: none;
`;

const CoupleImg = ({ clothes = false }) => {
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const [imgUrl, setImgUrl] = useState("");
  const [myDarling, setMyDarling] = useState("");
  const [saveFile, setSaveFile] = useState(null);
  const email = sessionStorage.getItem("email");

  const coupleNickNameAxios = async () => {
    const resCouple = await MemberAxiosApi.coupleNameSearch(email);
    const resNickName = await MainAxios.searchNickName(email, resCouple.data);
    setCoupleNickName(resNickName.data);
  };

  useEffect(() => {
    coupleNickNameAxios();
    coupleProfileAxios();
  }, []);

  const AddImgBtnOnChangeHandler = (e) => {
    setSaveFile(e.target.files[0]);
  };

  useEffect(() => {
    handleFileUpload();
  }, [saveFile]);

  const handleFileUpload = async () => {
    if (saveFile) {
      const storageRef = ref(profileStorage, saveFile.name);
      try {
        await uploadBytesResumable(storageRef, saveFile);
        console.log("File uploaded successfully!");

        if (imgUrl) {
          const oldFileRef = ref(profileStorage, imgUrl);
          await deleteObject(oldFileRef);
          console.log("Previous file deleted successfully!");
        }

        const url = await getDownloadURL(storageRef);
        const res = await MemberAxiosApi.profileUrlSave(email, url);
        console.log(res.data);

        if (url && res.data) {
          setImgUrl(url);
        }

        setSaveFile(null);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const coupleProfileAxios = async () => {
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
          <Profile imageurl={imgUrl ? imgUrl : manprofile} clothes={clothes}>
            <ProfileCover clothes={clothes}>
              <Label htmlFor="fileInput">Choose File</Label>
              <Input
                id="fileInput"
                type="file"
                clothes={clothes}
                onChange={AddImgBtnOnChangeHandler}
              />
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
          <Profile
            imageurl={myDarling ? myDarling : womanprofile}
            clothes={clothes}
          />
        </ProfileImgDiv>
        <Text clothes={clothes}>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
