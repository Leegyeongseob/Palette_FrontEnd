import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDrag } from "@use-gesture/react";
import axios from "axios";

// 스타일드 컴포넌트 정의
const MenuContainer = styled.div`
  width: ${({ shoes, clothNum }) =>
    clothNum === 7 ? "13vw" : shoes ? "5vw" : "9w"};
  height: ${({ shoes, clothNum }) =>
    clothNum === 7 ? "33vh" : shoes ? "7vh" : "17vh"};
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  display: ${({ clothNum, OnePiece }) =>
    (!OnePiece && clothNum === 7) ||
    ((clothNum === 4 || clothNum === 5) && OnePiece)
      ? "none"
      : "block"};
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const MenuItem = styled.div`
  flex: 0 0 100%;
  background-image: url(${(props) => props.item});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const Swiper = ({ shoes, clothNum, OnePiece }) => {
  // const manPath = process.env.PUBLIC_URL + "/clothes/man/";
  // const manTops = [
  //   manPath + "top/1.png",
  //   manPath + "top/2.png",
  //   manPath + "top/3.png",
  // ];
  // const manPants = [
  //   manPath + "pants/1.jpg",
  //   manPath + "pants/2.jpg",
  //   manPath + "pants/3.jpg",
  // ];
  // const manShoes = [
  //   manPath + "shoes/1.jpg",
  //   manPath + "shoes/2.jpg",
  //   manPath + "shoes/3.jpg",
  // ];
  // const womanPath = process.env.PUBLIC_URL + "/clothes/woman/";
  // const womanTops = [
  //   womanPath + "top/1.jpg",
  //   womanPath + "top/2.jpg",
  //   womanPath + "top/3.jpg",
  //   // womanPath + "top/4.jpg",
  //   // womanPath + "top/5.jpg",
  //   // womanPath + "top/6.jpg",
  // ];
  // const womanPants = [
  //   womanPath + "pants/1.jpg",
  //   womanPath + "pants/2.jpg",
  //   womanPath + "pants/3.jpg",
  //   // womanPath + "pants/4.jpg",
  //   // womanPath + "pants/5.jpg",
  //   // womanPath + "pants/6.jpg",
  // ];
  // const womanShoes = [
  //   womanPath + "shoes/1.jpg",
  //   womanPath + "shoes/2.jpg",
  //   womanPath + "shoes/3.jpg",
  //   // womanPath + "shoes/4.jpg",
  //   // womanPath + "shoes/5.jpg",
  //   // womanPath + "shoes/6.jpg",
  // ];
  // const womanOnepiece = [
  //   womanPath + "onepiece/1.jpg",
  //   womanPath + "onepiece/2.jpg",
  //   womanPath + "onepiece/3.jpg",
  //   // womanPath + "onepiece/4.jpg",
  //   // womanPath + "onepiece/5.jpg",
  // ];
  const [clothesData, setClothesData] = useState({
    manTopClothes: [],
    manPantsClothes: [],
    manShoes: [],
    womanTopClothes: [],
    womanButtomClothes: [],
    womanShoes: [],
    womanOnepiece: [],
  });

  const clothGroups = {
    1: clothesData.manTopClothes,
    2: clothesData.manPantsClothes,
    3: clothesData.manShoes,
    4: clothesData.womanTopClothes,
    5: clothesData.womanButtomClothes,
    6: clothesData.womanShoes,
    7: clothesData.womanOnepiece,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  //옷 데이터 저장
  const PYTHON_CLOTHES_PATH = "http://localhost:5000/date-clothes";
  useEffect(() => {
    fetchData();
  }, []);

  // 파이썬에서 데이터를 가져오는 비동기 함수
  const fetchData = async () => {
    const endpoints = [
      "manTopClothes",
      "manPantsClothes",
      "manShoes",
      "womanTopClothes",
      "womanButtomClothes",
      "womanShoes",
      "womanOnepiece",
    ];

    try {
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          axios.get(`${PYTHON_CLOTHES_PATH}/${endpoint}`)
        )
      );

      setClothesData({
        manTopClothes: responses[0].data.map((data) => data.img_src),
        manPantsClothes: responses[1].data.map((data) => data.img_src),
        manShoes: responses[2].data.map((data) => data.img_src),
        womanTopClothes: responses[3].data.map((data) => data.img_src),
        womanButtomClothes: responses[4].data.map((data) => data.img_src),
        womanShoes: responses[5].data.map((data) => data.img_src),
        womanOnepiece: responses[6].data.map((data) => data.img_src),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSwipe = (direction) => {
    const items = clothGroups[clothNum];
    const itemsLength = items.length > 1 ? items.length - 1 : 0; // 마지막 아이템의 인덱스

    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? itemsLength : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === itemsLength ? 0 : prevIndex + 1
      );
    }
  };
  const bind = useDrag(
    ({ down, movement: [mx], direction: [dx], cancel, last }) => {
      setDragging(down);
      if (last) {
        if (Math.abs(mx) > 50) {
          // threshold 값을 적절히 조정
          handleSwipe(dx > 0 ? "left" : "right"); // 방향을 반대로 처리
        }
        cancel();
      }
    },
    { threshold: 50 } // 드래그 민감도를 적절히 조정
  );
  const items = clothGroups[clothNum];

  // 무한 루프를 위해 아이템 길이가 1보다 큰 경우에만 마지막 아이템을 맨 앞에 추가하여 순환
  const infiniteItems = items.length > 1 ? [...items, items[0]] : items;

  return (
    <MenuContainer shoes={shoes} clothNum={clothNum} OnePiece={OnePiece}>
      <MenuWrapper
        {...bind()}
        style={{
          transform: `translateX(${-100 * currentIndex}%)`,
          transition: dragging ? "none" : "transform 0.5s ease-in-out",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        {infiniteItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </MenuWrapper>
    </MenuContainer>
  );
};

export default Swiper;
