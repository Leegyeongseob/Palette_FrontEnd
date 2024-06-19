import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useAddress from "../../hooks/useLocation";

const AppContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
`;

const CategoryList = styled.ul`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  display: flex;
  padding: 0;
  flex-wrap: 5px;
`;

const CategoryItem = styled.li`
  list-style: none;
  float: left;
  width: 50px;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #acacac;

  &:last-child {
    margin-right: 0;
    border-right: 0;
  }

  &:hover {
    background: #ffe6e6;
    border-left: 1px solid #acacac;
    margin-left: -1px;
  }

  &.on {
    background: #eee;
  }
`;

const CategoryIcon = styled.span`
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
  ${({ category }) =>
    category &&
    `background: url(/mapmarker/category/${category}.png) no-repeat;`};
  background-size: 30px 30px;
`;

const KakaoMap = () => {
  const mapRef = useRef(null);
  const managerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { addr, location } = useAddress();
  const [selectedOverlay, setSelectedOverlay] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  useEffect(() => {
    console.log("현재 위치에 대한 주소 : ", addr);
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.long),
      level: 3,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // Drawing Manager 설정
    const drawingManager = new window.kakao.maps.drawing.DrawingManager({
      map: kakaoMap,
      drawingMode: [
        window.kakao.maps.drawing.OverlayType.ARROW,
        window.kakao.maps.drawing.OverlayType.MARKER,
        window.kakao.maps.drawing.OverlayType.POLYLINE,
      ],
      guideTooltip: ["draw", "drag", "edit"],
    });

    // 이벤트 리스너 설정
    window.kakao.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function (event) {
        const overlay = event.overlay;
        // 오버레이(도형) 클릭 시 이벤트 처리
        window.kakao.maps.event.addListener(overlay, "click", function () {
          setSelectedOverlay(event.type);
        });
      }
    );

    managerRef.current = drawingManager; // ref에 DrawingManager 할당

    return () => {
      // Clean-up function to remove listeners or clear manager if needed
      window.kakao.maps.event.removeListener(drawingManager, "overlaycomplete");
    };
  }, [location.lat, location.long]);

  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchButtonClick = () => {
  //   if (map && searchQuery) {
  //     const places = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

  //     markers.forEach((marker) => marker.setMap(null)); //  마커 지우기

  //     places.keywordSearch(searchQuery, (data, status) => {
  //       if (status === window.kakao.maps.services.Status.OK) {
  //         const newMarkers = data.map((place) => {
  //           const placeMarker = new window.kakao.maps.Marker({
  //             position: new window.kakao.maps.LatLng(place.y, place.x),
  //           });

  //           placeMarker.setMap(map);
  //           // Kakao Map에서 마커에 대한 이벤트 처리를 하는 표준 함수
  //           window.kakao.maps.event.addListener(placeMarker, "click", () => {
  //             setSelectedPlace(place);
  //           });

  //           return placeMarker;
  //         });
  //         setMarkers(newMarkers);
  //       }
  //     });
  //   }
  // };

  const selectOverlay = (type) => {
    const manager = managerRef.current;
    manager.cancel();
    manager.select(type);
    setSelectedOverlay(type);
  };

  // 카테고리
  const onClickCategory = (categoryId) => {
    if (currCategory === categoryId) {
      removeMarker();
      setCurrCategory(categoryId);
    } else {
      setCurrCategory(categoryId);
      searchPlaces(categoryId);
    }

    console.log("카테고리 ID : " + currCategory);
  };

  const searchPlaces = (categoryId) => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(categoryId, placesSearchCB, { useMapBounds: true });
    console.log("test" + categoryId);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(data);
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error("장소 검색 중 에러가 발생했습니다.");
    }
  };
  const categories = {
    CE7: { order: 0 },
    FD6: { order: 1 },
    AD5: { order: 2 },
    AT4: { order: 3 },
    CT1: { order: 4 },
    CS2: { order: 5 },
  };

  const displayPlaces = (places) => {
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    const order = categories[currCategory]?.order;
    // 기존 마커를 제거합니다
    removeMarker();

    // 새로운 장소 데이터에 대해 마커를 생성하고 지도에 표시합니다
    for (let i = 0; i < places.length; i++) {
      // 각 장소에 대해 마커를 생성하고 지도에 표시합니다
      const marker = addMarker(
        new window.kakao.maps.LatLng(places[i].y, places[i].x),
        order
      );

      // 마커와 검색결과 항목을 클릭했을 때 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      (function (marker, place) {
        window.kakao.maps.event.addListener(marker, "click", function () {
          setSelectedPlace(place);
        });
      })(marker, places[i]);

      // 생성된 마커를 상태에 저장합니다
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }
  };

  const addMarker = (position) => {
    console.log(currCategory);
    // 카테고리 아이디에 따라 이미지 경로를 설정합니다
    const imagePath = `${process.env.PUBLIC_URL}/mapmarker/category3/${currCategory}.png`;

    const imageSize = new window.kakao.maps.Size(27, 28);

    const markerImage = new window.kakao.maps.MarkerImage(imagePath, imageSize);

    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  return (
    <AppContainer>
      <MapContainer ref={mapRef}>
        <CategoryList id="category">
          <CategoryItem
            id="CE7"
            className={currCategory === "CE7" ? "on" : ""}
            onClick={() => onClickCategory("CE7")}
          >
            <CategoryIcon category="CE7" />
            카페
          </CategoryItem>
          <CategoryItem
            id="FD6"
            className={currCategory === "FD6" ? "on" : ""}
            onClick={() => onClickCategory("FD6")}
          >
            <CategoryIcon category="FD6" />
            음식점
          </CategoryItem>
          <CategoryItem
            id="AD5"
            className={currCategory === "AD5" ? "on" : ""}
            onClick={() => onClickCategory("AD5")}
          >
            <CategoryIcon category="AD5" />
            숙박
          </CategoryItem>
          <CategoryItem
            id="AT4"
            className={currCategory === "AT4" ? "on" : ""}
            onClick={() => onClickCategory("AT4")}
          >
            <CategoryIcon category="AT4" />
            관광명소
          </CategoryItem>
          <CategoryItem
            id="CT1"
            className={currCategory === "CT1" ? "on" : ""}
            onClick={() => onClickCategory("CT1")}
          >
            <CategoryIcon category="CT1" />
            문화시설
          </CategoryItem>
          <CategoryItem
            id="CS2"
            className={currCategory === "CS2" ? "on" : ""}
            onClick={() => onClickCategory("CS2")}
          >
            <CategoryIcon category="CS2" />
            편의점
          </CategoryItem>
        </CategoryList>
      </MapContainer>
      <div>
        <button
          onClick={() =>
            selectOverlay(window.kakao.maps.drawing.OverlayType.POLYLINE)
          }
        >
          선
        </button>
        <button
          onClick={() =>
            selectOverlay(window.kakao.maps.drawing.OverlayType.ARROW)
          }
        >
          화살표
        </button>
        <button
          onClick={() =>
            selectOverlay(window.kakao.maps.drawing.OverlayType.MARKER)
          }
        >
          마커
        </button>
      </div>
      {selectedPlace && (
        <div>
          <h2>{selectedPlace.place_name}</h2>
          <p>{selectedPlace.address_name}</p>
          <p>{selectedPlace.phone}</p>
        </div>
      )}
    </AppContainer>
  );
};

export default KakaoMap;
