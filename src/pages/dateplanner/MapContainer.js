import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useAddress from "../../hooks/useLocation";
// import ReactDOM from "react-dom";
// import DisplaceInfo from "../PinView/DisplaceInfo";


const Search = styled.form`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;


const MapSection = styled.div`
  width: 25.8vw;
  min-width: 228px;
  display: flex;
  flex-direction: column;
`;

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 36vh;
`;

const CategoryList = styled.ul`
  position: absolute;
  bottom: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  padding: 0;
  display: flex;
`;

const CategoryItem = styled.li`
  float: left;
  list-style: none;
  width: 3.8vw;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #acacac;
  font-size: 12px;
  &.on {
    background: #eee;
  }
  &:hover {
    background: #ffe6e6;
    border-left: 1px solid #acacac;
    margin-left: -1px;
  }
  &:last-child {
    margin-right: 0;
    border-right: 0;
  }
`;

const CategoryIcon = styled.span`
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
  background: ${({ selected, category }) =>
    selected
      ? `url(/mapmarker/category3/${category}.png) no-repeat`
      : `url(/mapmarker/category/${category}.png) no-repeat`};
  background-size: 30px 30px;
`;

const MapContainer = ({
  mapContainer,
  displayPlaceInfo,
  contentNode,
  placeOverlay,
  map,
  setMap,
  currCategory,
  setCurrCategory,
  setPlaces,
}) => {
  const [markers, setMarkers] = useState([]);
  const ps = new window.kakao.maps.services.Places(map);
  const { location } = useAddress();
  contentNode.current.className = "placeinfo_wrap";
  placeOverlay.current.setContent(contentNode.current);

  useEffect(() => {
    const { kakao } = window;
    const Container = mapContainer.current;

    if (!Container) return;

    const mapOption = {
      center: new kakao.maps.LatLng(location.lat, location.long),
      level: 6,
    };

    const newMap = new kakao.maps.Map(Container, mapOption);
    setMap(newMap);
    ps.current = new kakao.maps.services.Places(newMap);
  }, [location.lat, location.long]);

  useEffect(() => {
    if (map) {
      const handleIdle = () => {
        if (currCategory) {
          searchPlaces();
        }
      };

      window.kakao.maps.event.addListener(map, "dragend", handleIdle);
      window.kakao.maps.event.addListener(map, "zoom_changed", handleIdle);

      return () => {
        window.kakao.maps.event.removeListener(map, "dragend", handleIdle);
        window.kakao.maps.event.removeListener(map, "zoom_changed", handleIdle);
      };
    }
  }, [map, currCategory ]);

  const searchPlaces = () => {
    if (!currCategory) {
      return;
    }

    placeOverlay.current.setMap(null);
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, {
      useMapBounds: true,
    });
    console.log("카테고리 검색을 요청합니다. 현재 카테고리: " + currCategory);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(data);
      setPlaces(data);
      displayPlaces(data);
    } else {
      alert("검색결과가 없습니다.");
      console.error("장소 검색 에러:", status);
    }
  };

  const displayPlaces = (places) => {
    const newMarkers = places.map((place) => {
      const marker = addMarker(new window.kakao.maps.LatLng(place.y, place.x));

      window.kakao.maps.event.addListener(marker, "click", () => {
        displayPlaceInfo(place);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const addMarker = (position) => {
    const imagePath = `${process.env.PUBLIC_URL}/mapmarker/category3/${currCategory}.png`;
    const imageSize = new window.kakao.maps.Size(30, 30);
    const markerImage = new window.kakao.maps.MarkerImage(imagePath, imageSize);
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    markers.push(marker);
    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]); // 이 부분을 추가해야 합니다.
    console.log("마커를 모두 제거했습니다.");
  };

  const onClickCategory = (id) => {
    if (id === currCategory) {
      setCurrCategory("");
    } else {
      setCurrCategory(id);
    }
  };

  useEffect(() => {
    if (currCategory !== "") {
      console.log("카테고리 필터 적용됨. 선택한 카테고리:", currCategory);
      searchPlaces();
    } else {
      console.log("카테고리 필터 해제됨");
      removeMarker();
    }
  }, [currCategory]);

  const handleSubmit = (e) => {
    console.log("테스트", handleSubmit);

    e.preventDefault();
    const keyword = e.target.elements.keyword.value.trim();
    if (!keyword) {
      alert("키워드를 입력하세요.");
      return;
    }

    placeOverlay.current.setMap(null);
    ps.keywordSearch(keyword, keywordSearchCB);
  };

  const keywordSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      searchPlace(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const searchPlace = (places) => {
    markers.forEach((marker) => marker.setMap(null));
    const bounds = new window.kakao.maps.LatLngBounds();

    const newMarkers = places.map((place, index) => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        displayPlaceInfo(place);
      });

      bounds.extend(markerPosition);
      return marker;
    });

    newMarkers.forEach((marker) => marker.setMap(map));
    setMarkers(newMarkers);
    map.setBounds(bounds);


  };

  return (
    <div>
      <MapSection
        placeOverlay={placeOverlay}
        map={map}
        placesSearchCB={placesSearchCB}
      >
        <MapWrap ref={mapContainer}>
          <CategoryList id="category">
            {["CE7", "FD6", "AD5", "AT4", "CT1", "CS2"].map((id) => (
              <CategoryItem
                key={id}
                className={currCategory === id ? "on" : ""}
                onClick={() => onClickCategory(id)}
              >
                <CategoryIcon category={id} selected={currCategory === id} />
                {id === "CE7" && "카페"}
                {id === "FD6" && "음식점"}
                {id === "AD5" && "숙박"}
                {id === "AT4" && "관광명소"}
                {id === "CT1" && "문화시설"}
                {id === "CS2" && "편의점"}
              </CategoryItem>
            ))}
          </CategoryList>
        </MapWrap>
      <Search onSubmit={handleSubmit}>
        <input type="text" name="keyword" />
        <button type="submit">검색하기</button>
      </Search>
      </MapSection>
    </div>
  );
};

export default MapContainer;
