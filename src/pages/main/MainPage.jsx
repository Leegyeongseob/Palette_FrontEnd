import styled from "styled-components";
import theme11 from "../../img/background/theme/11.jpg";

const BookSign = styled.div`
  width: 25.8vw;
  height: 71vh;
`;
const BookTheme = styled.div`
  width: 52.6vw;
  height: 68vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${theme11});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;

const MainPage = () => {
  return (
    <BookTheme>
      <BookSign></BookSign>
      <BookSign></BookSign>
    </BookTheme>
  );
};

export default MainPage;
