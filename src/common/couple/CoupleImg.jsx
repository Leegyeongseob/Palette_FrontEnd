import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
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
const CoupleImg = ({ clothes = false }) => {
  return (
    <Contain clothes={clothes}>
      <ProfileDiv clothes={clothes}>
        <ProfileImgDiv>
          <Profile imageurl={manprofile} />
        </ProfileImgDiv>
        <Text clothes={clothes}>알콩</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart clothes={clothes} />
      </HeartDiv>
      <ProfileDiv clothes={clothes} direction={true}>
        <ProfileImgDiv>
          <Profile imageurl={womanprofile} />
        </ProfileImgDiv>
        <Text clothes={clothes}>달콩</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
