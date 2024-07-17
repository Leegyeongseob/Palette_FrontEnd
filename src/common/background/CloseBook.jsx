import styled from "styled-components";
import closebook from "../../img/background/closebook2.png";
import background from "../../img/background/theme/background3.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useEffect, useState } from "react";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
`;

const Book = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${closebook});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media screen and (max-width: 768px) {
    min-width: 550px;
    height: 80%;
  }
  @media screen and (max-height: 768px) {
    width: 85%;
    min-height: 700px;
  } */
`;

const BookTheme = styled.div`
  width: 470px;
  height: 73vh;
  margin-left: 48px;
  margin-bottom: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    min-width: 450px;
    height: 70%;
  }
  @media screen and (max-height: 768px) {
    width: 65%;
    min-height: 100px;
  }
`;

const LogoDiv = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-height: 768px) {
    width: 65%;
    min-height: 100px;
  }
`;

const Logo = styled.img`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 768px) {
    width: 85px;
    height: 85px;
  }
  @media screen and (max-height: 768px) {
    width: 85px;
    height: 85px;
  }
  @media screen and (max-width: 480px) {
    width: 5vw;
    height: 5vw;
  }
`;

const Contents = styled.div`
  width: 460px;
  height: 58vh;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    width: 50vw;
    height: 50vh;
  }
  @media screen and (max-height: 768px) {
    min-height: 350px;
    width: 50vw;
  }
`;

const CloseBook = ({ modify }) => {
  const [coupleName, setCoupleName] = useState();
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (modify) {
      coupleNameAxios();
    }
  }, []);
  const coupleNameAxios = async () => {
    const res = await MemberAxiosApi.renderCoupleNameSearch(email);
    setCoupleName(res.data);
  };
  return (
    <Background>
      <Book>
        <BookTheme>
          <LogoDiv>
            {!modify && (
              <Link to="/">
                <Logo alt="logo" src={logo} />
              </Link>
            )}
            {modify && (
              <Link to={`/${coupleName}/main-page`}>
                <Logo alt="logo" src={logo} />
              </Link>
            )}
          </LogoDiv>
          <Contents>
            <Outlet />
          </Contents>
        </BookTheme>
      </Book>
    </Background>
  );
};

export default CloseBook;
