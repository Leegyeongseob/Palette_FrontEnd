import styled from "styled-components";
import theme11 from "../../img/background/theme/11.jpg";
const BookSign = styled.div`
  width: 25.8vw;
  height: 69vh;
`;
const BookTheme = styled.div`
  width: 54vw;
  height: 69vh;
  margin-top: 5vh;
  margin-left: 0.8vw;
  background-image: url(${theme11});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;

const DateClothes = () => {
  return (
    <BookTheme>
      <BookSign></BookSign>
      <BookSign></BookSign>
    </BookTheme>
  );
};
export default DateClothes;
