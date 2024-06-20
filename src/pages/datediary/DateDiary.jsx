import styled from "styled-components";
import theme3 from "../../img/background/theme/3.jpg";
import theme3_1 from "../../img/background/theme/3-1.jpg";

const BookTheme = styled.div`
  width: 26vw;
  height: 69vh;
  margin-top: 5vh;
  margin-left: 0.8vw;
  background-image: url(${theme3});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;
const BookTheme2 = styled.div`
  width: 26vw;
  height: 69vh;
  margin-top: 5vh;
  margin-left: 0.8vw;
  background-image: url(${theme3_1});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;

const BookSign = styled.div`
  width: 26vw;
  height: 69vh;
`;
const BookSign2 = styled.div`
  width: 26vw;
  height: 69vh;
`;

const DateAlbum = () => {
  return (
    <>
      <BookTheme>
        <BookSign></BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2></BookSign2>
      </BookTheme2>
    </>
  );
};
export default DateAlbum;
