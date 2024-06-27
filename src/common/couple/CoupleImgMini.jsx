import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";

const Contain = styled.div`
  width: 7.8125vw; // 150px / 1920 * 100
  height: 15.74vh; // 150px / 953 * 100
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileDiv = styled.div`
  width: flex;
  height: flex;
`;

const ProfileImgDiv = styled.div`
  width: 6vw;
  height: 11vh;
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
  width: 1.3021vw; // 25px / 1920 * 100
  height: 2.6233vh; // 25px / 953 * 100
  background-image: url(${heart});
  background-size: cover;
`;

const Profile = styled.div`
  width: 3.6458vw; // 70px / 1920 * 100
  height: 7.3453vh; // 70px / 953 * 100
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  border-radius: 50%;
`;

const Text = styled.div`
  width: auto;
  height: 1.0493vh; // 10px / 953 * 100
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6771vw; // 13px / 1920 * 100
  font-weight: 600;
  color: black;
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
