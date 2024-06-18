import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
const Contain = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileDiv = styled.div`
  width: 8vw;
  height: 23vh;
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
  width: 70px;
  height: 70px;
  background-image: url(${heart});
  background-size: cover;
`;
const Profile = styled.div`
  width: 130px;
  height: 130px;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  border-radius: 50%;
`;
const Text = styled.div`
  width: 8vw;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
`;
const CoupleImg = () => {
  return (
    <Contain>
      <ProfileDiv>
        <ProfileImgDiv>
          <Profile imageurl={manprofile} />
        </ProfileImgDiv>
        <Text>알콩</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart />
      </HeartDiv>
      <ProfileDiv>
        <ProfileImgDiv>
          <Profile imageurl={womanprofile} />
        </ProfileImgDiv>
        <Text>달콩</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
