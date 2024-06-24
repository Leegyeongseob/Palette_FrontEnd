import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DisplayPlaceInfo from "./DisplayInfo"; // DisplayPlaceInfo 컴포넌트를 불러옵니다.
import ReactDOM from "react-dom";
import useAddress from "../../hooks/useLocation";

// 지도를 감싸는 컨테이너 스타일링
const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;

// 카테고리 목록을 감싸는 스타일링
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
  padding:0;
  display: flex;
`;

// 카테고리 아이템의 스타일링
const CategoryItem = styled.li`
  float: left;
  list-style: none;
  width: 60px;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #acacac;
  font-size: 12px;
  &.on {
    background: #eee; // 선택된 카테고리에 배경색을 적용합니다.
  }
  &:hover {
    background: #ffe6e6; // 마우스 호버 시 배경색을 변경합니다.
    border-left: 1px solid #acacac;
    margin-left: -1px;
  }
  &:last-child {
    margin-right: 0;
    border-right: 0;
  }
`;

// 카테고리 아이콘 스타일링
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

// KakaoMap0 컴포넌트 정의
const KakaoMap = () => {
  const mapContainer = useRef(null); // 지도 컨테이너 useRef로 설정
  const [map, setMap] = useState(null); // 지도 객체 상태 관리
  const [currCategory, setCurrCategory] = useState(''); // 현재 선택된 카테고리 상태 관리
  const [markers, setMarkers] = useState([]); // 마커 배열 상태 관리
  const placeOverlay = useRef(
    new window.kakao.maps.CustomOverlay({ zIndex: 1 })
  ); // 커스텀 오버레이 useRef로 설정
  const contentNode = useRef(document.createElement("div")); // 커스텀 오버레이의 컨텐츠 노드 useRef로 설정
  const ps = new window.kakao.maps.services.Places(map); // 장소 검색 객체 생성
  const { addr, location } = useAddress(); // 커스텀 훅 사용

  // 컨텐츠 노드의 클래스 설정
  contentNode.current.className = "placeinfo_wrap";

  // 커스텀 오버레이에 컨텐츠 설정
  placeOverlay.current.setContent(contentNode.current);

  // 지도 초기화 useEffect
  useEffect(() => {
    console.log(addr)
    const { kakao } = window; // 전역 window 객체에서 kakao를 가져옵니다.
    const Container = mapContainer.current; // 지도를 담을 영역의 DOM 레퍼런스

    // 지도 컨테이너가 없으면 return
    if (!Container) return;

    // 지도 옵션 설정
    const mapOption = {
      center: new kakao.maps.LatLng(location.lat , location.long), // 지도의 중심 좌표
      level: 3, // 지도의 확대 레벨
    };

    // 새로운 지도 생성
    const newMap = new kakao.maps.Map(Container, mapOption);
    setMap(newMap); // 상태 업데이트

     ps.current = new kakao.maps.services.Places(newMap);

  }, [location.lat, location.long]);

  useEffect(() => {
    if (map) {
      const handleIdle = () => {
        if (currCategory) {
          searchPlaces();
        }
      };
  
      // 지도 idle 이벤트 등록
      window.kakao.maps.event.addListener(map, "idle", handleIdle);
  
      // clean-up function to remove the event listener
      return () => {
        window.kakao.maps.event.removeListener(map, "idle", handleIdle);
      };
    }
  }, [map, currCategory]);

  // //지도가 생성되면 idle 이벤트 리스너 등록 useEffect
  // useEffect(() => {
  //   if (map) {
  //     // 지도 idle 이벤트 등록
  //     window.kakao.maps.event.addListener(map, "dragend", () =>{
  //       searchPlaces()
  //       alert("이벤트 발생")
  //     } );
  //   }
  // }, [map]);


  // // currCategory 변경 시 장소 검색 useEffect
  // useEffect(() => {
  //   searchPlaces(); // currCategory가 변경될 때마다 장소 검색 함수 실행
  // }, [currCategory]);

  // 카테고리에 따라 장소 검색 함수
  const searchPlaces = () => {
    if (!currCategory) {
      return;
    }

    placeOverlay.current.setMap(null); // 커스텀 오버레이 숨기기
    removeMarker(); // 마커 제거 함수 호출

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true }); // 카테고리에 따른 장소 검색 요청
    console.log("카테고리 검색을 요청합니다. 현재 카테고리: " + currCategory);
  };

 // 장소 검색 콜백 함수
const placesSearchCB = (data, status) => {
  if (status === window.kakao.maps.services.Status.OK) {
    console.log("통과")
    displayPlaces(data); // 검색 결과가 OK면 장소 표시 함수 호출
  } else {
    console.error("장소 검색 에러:", status);
  }
};

  // 검색된 장소 표시 함수
  const displayPlaces = (places) => {
    const newMarkers = places.map((place) => {
      const marker = addMarker(new window.kakao.maps.LatLng(place.y, place.x)); // 마커 생성 함수 호출

      // 마커 클릭 시 장소 정보 표시 이벤트 등록
      window.kakao.maps.event.addListener(marker, "click", () => {
        displayPlaceInfo(place); // 장소 정보 표시 함수 호출
      });

      return marker; // 생성된 마커 반환
    });

    setMarkers(newMarkers); // 마커 배열 상태 업데이트
  };

  // 마커 추가 함수
  const addMarker = (position) => {
    const imagePath = `${process.env.PUBLIC_URL}/mapmarker/category3/${currCategory}.png`; // 이미지 경로 설정
    const imageSize = new window.kakao.maps.Size(60, 60); // 이미지 크기 설정
    const markerImage = new window.kakao.maps.MarkerImage(imagePath, imageSize); // 마커 이미지 객체 생성
    const marker = new window.kakao.maps.Marker({
      position, // 마커 위치
      image: markerImage, // 마커 이미지 설정
    });

    marker.setMap(map); // 마커 지도에 표시
    markers.push(marker); // 마커 배열에 추가
    return marker; // 생성된 마커 반환
  };

  // 마커 모두 제거 함수
  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null)); // 모든 마커 지도에서 제거
    setMarkers([]); // 마커 배열 초기화
    console.log("마커를 모두 제거했습니다.");
  };

  // 장소 정보 표시 함수
  const displayPlaceInfo = (place) => {
    ReactDOM.render(<DisplayPlaceInfo place={place} />, contentNode.current); // 장소 정보 컴포넌트 렌더링
    placeOverlay.current.setPosition(
      new window.kakao.maps.LatLng(place.y, place.x)
    ); // 커스텀 오버레이 위치 설정
    placeOverlay.current.setMap(map); // 커스텀 오버레이 지도에 표시
  };

  

   // 카테고리 클릭 처리 함수
   const onClickCategory = (id) => {
    if (id === currCategory) {
        // 현재 선택된 카테고리가 이미 활성화된 상태라면 해제 처리
        setCurrCategory('');
        console.log("테스트",currCategory)
    } else {
        // 그렇지 않으면 해당 카테고리를 활성화 처리
        setCurrCategory('');
        setCurrCategory(id);
        
    }
};

// useEffect를 이용하여 currCategory 변화 감지
useEffect(() => {
    if (currCategory !== '') {
        // currCategory가 변경될 때만 실행되는 로직
        console.log("카테고리 필터 적용됨. 선택한 카테고리:", currCategory);
        searchPlaces(); // 장소 검색 함수 호출
    } else {
        // currCategory가 빈 문자열일 때 실행되는 로직
        console.log("카테고리 필터 해제됨", currCategory);
        removeMarker(); // 마커 제거 함수 호출
    }
}, [currCategory]); // currCategory가 변경될 때만 useEffect 실행

  


  return (
    <div>
      <MapWrap ref={mapContainer}>
      <CategoryList id="category">
        {['CE7', 'FD6', 'AD5', 'AT4', 'CT1', 'CS2'].map((id) => (
          <CategoryItem
            key={id}
            className={currCategory === id ? 'on' : ''}
            onClick={() => onClickCategory(id)}
          >
            <CategoryIcon category={id} selected={currCategory === id} />
            {id === 'CE7' && '카페'}
            {id === 'FD6' && '음식점'}
            {id === 'AD5' && '숙박'}
            {id === 'AT4' && '관광명소'}
            {id === 'CT1' && '문화시설'}
            {id === 'CS2' && '편의점'}
          </CategoryItem>
        ))}
      </CategoryList>
      </MapWrap>
      <div className="placeinfo_wrap" ref={contentNode} />
    </div>
  );
};

export default KakaoMap;
