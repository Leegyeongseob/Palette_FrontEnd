import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import useAddress from "../../hooks/useLocation";
import DisplaceInfo from "./DisplaceInfo";

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
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

const PlaceCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 28vh; /* 지도 영역의 높이를 제외한 남은 공간만큼 높이 설정 */
`;

const PlaceCard = styled.div`
  width: calc(33.33% - 20px); /* 3열로 정렬, 여백 포함 */
  height: 14vh;
  margin: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 1px 2px #888;
  &:hover {
    background: #888;
  }
`;

const PlaceCardLink = styled.a`
  color: #000;
  text-decoration: none;
  &:hover {
    color: red;
  }
`;

const PlaceCardText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PlaceCardAddress = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
`;

const PlaceCardPhone = styled.div`
  font-size: 12px;
  color: #0f7833;
`;



const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [currCategory, setCurrCategory] = useState("");
  const [markers, setMarkers] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const placeOverlay = useRef(new window.kakao.maps.CustomOverlay({ zIndex: 1 }));
  const contentNode = useRef(document.createElement("div"));
  const ps = new window.kakao.maps.services.Places(map);
  const { addr, location } = useAddress();
  const [places, setPlaces] = useState([]);

  contentNode.current.className = "placeinfo_wrap";
  placeOverlay.current.setContent(contentNode.current);

  useEffect(() => {
    const { kakao } = window;
    const Container = mapContainer.current;

    if (!Container) return;

    const mapOption = {
      center: new kakao.maps.LatLng(location.lat, location.long),
      level: 3,
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
  }, [map, currCategory]);

  const searchPlaces = () => {
    if (!currCategory) {
      return;
    }

    placeOverlay.current.setMap(null);
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    console.log("카테고리 검색을 요청합니다. 현재 카테고리: " + currCategory);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
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
    setMarkers([]);
    console.log("마커를 모두 제거했습니다.");
  };

  const displayPlaceInfo = (place) => {
    ReactDOM.render(<DisplaceInfo place={place} />, contentNode.current);
    placeOverlay.current.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.current.setMap(map);
  };

  const onClickCategory = (id) => {
    if (id === currCategory) {
      setCurrCategory("");
    } else {
      setCurrCategory(id);
    }
  };

  const onClickPlaceCard = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    displayPlaceInfo(place);
    addPlaceToCourse(place);
  };

  const addPlaceToCourse = (place) => {
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
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

  // 마커 간 화살표 렌더링
  useEffect(() => {
    if (selectedPlaces.length > 1) {
      const linePath = selectedPlaces.map((place) => new window.kakao.maps.LatLng(place.y, place.x));

      const polyline = new window.kakao.maps.Polyline({
        endArrow:true,
        path: linePath,
        strokeWeight: 5
      });

      polyline.setMap(map);

      return () => {
        polyline.setMap(null); // 화살표 제거
      };
    }
  }, [selectedPlaces, map]);

  return (
    <div>

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
      <PlaceCardList>
        {places.map((place, index) => (
          <PlaceCard key={index} onClick={() => onClickPlaceCard(place)}>
            <PlaceCardLink href={place.place_url} target="_blank" title={place.place_name}>
              <PlaceCardText>{place.place_name}</PlaceCardText>
            </PlaceCardLink>
            <PlaceCardAddress>{place.road_address_name}</PlaceCardAddress>
            <PlaceCardPhone>{place.phone}</PlaceCardPhone>
          </PlaceCard>
        ))}
      </PlaceCardList>
      
    </div>
  );
};

export default KakaoMap;
