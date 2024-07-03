import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MapContainer from "./MapContainer";
import PlannerForm from "./PlannerForm";
import SavedCoursesList from "./SavedCourseList";
import PlaceCardList from "./PlaceCardList";
import theme6 from "../../img/background/theme/6.jpg";
import ReactDOM from "react-dom";
import DisplaceInfo from "./DisplaceInfo";
import MapModal from "./MapModal";
import DatePlannerAxios from "../../axiosapi/DatePlannerAxios";

const BookContainer = styled.div`
  width: 25.8vw;
  height: 69vh;
`;

const BookWrapper = styled.div`
  width: 53vw;
  height: 69vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${theme6});
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
`;

const DatePlanner = () => {
  const [currCategory, setCurrCategory] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  const [map, setMap] = useState(null);
  const placeOverlay = useRef(
    new window.kakao.maps.CustomOverlay({ zIndex: 1 })
  );
  const contentNode = useRef(document.createElement("div"));
  const mapContainer = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalMapContainerRef = useRef(null);
  const [numMarker, setNumMarker] = useState([]);
  const [title, setTitle] = useState("");

  // 모든 코스 조회 및 저장된 코스 목록 업데이트
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await DatePlannerAxios.getAllCourses();
        setSavedCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

   
  const addNumMark = () => {
    // 선택된 장소를 numMarker에 추가
    setNumMarker([...numMarker, ...selectedPlaces]);
  };

  // 코스 저장 또는 수정
  const handleSaveCourse = async (newCourse) => {
    try {
      let savedCourse;
      if (isEditing) {
        savedCourse = await DatePlannerAxios.updateCourse(savedCourses[currentCourseIndex].id, newCourse);
        console.log("테스트 확인용",savedCourses[currentCourseIndex])
        setSavedCourses(prevCourses =>
          prevCourses.map((course, index) =>
            index === currentCourseIndex ? savedCourse : course
          )
        );
        setIsEditing(false);
        setCurrentCourseIndex(null);
      } else {
        savedCourse = await DatePlannerAxios.createCourse(newCourse);
        setSavedCourses(prevCourses => [...prevCourses, savedCourse]);
      }
      setSelectedPlaces([]);
      console.log("Course saved successfully:", savedCourse);
      console.log(newCourse);
    } catch (error) {
      console.log('Error saving course:', error);
    }
  };

   // 코스 수정 모드로 전환
   const handleEditCourse = (index) => {
    const course = savedCourses[index];
    setSelectedPlaces(course.places);
    setTitle(course.title);
    setIsEditing(true);
    setCurrentCourseIndex(index);
  };

  // 코스 삭제
  const handleDeleteCourse = async (index) => {
    try {
      await DatePlannerAxios.deleteCourse(savedCourses[index].id);
      setSavedCourses(prevCourses => prevCourses.filter((_, i) => i !== index));
      setSelectedPlaces([]);
      setTitle("");
      setIsEditing(false);
      setCurrentCourseIndex(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // 장소 삭제
  const handleDeletePlace = (placeId) => {
    setSelectedPlaces(prevSelected =>
      prevSelected.filter((place) => place.id !== placeId)
    );
  };

  // 장소 카드 클릭 시 처리
  const handlePlaceCardClick = (place) => {
    if (selectedPlaces.length >= 10) {
      alert("장소는 최대 10개까지 선택할 수 있습니다.");
      return;
    }
  
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
    addNumMark(); // 장소를 클릭할 때마다 numMarker에 추가
  };

   // 선택된 장소 초기화
  const handleClearPlaces = () => {
    setSelectedPlaces([]);
  };
  // 장소 카드 클릭 시 지도 이동 및 장소 정보 표시
  const onClickPlaceCard = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    displayPlaceInfo(place);
  };
  // 장소 정보 표시
  const displayPlaceInfo = (place) => {
    ReactDOM.render(<DisplaceInfo place={place} />, contentNode.current);
    placeOverlay.current.setPosition(
      new window.kakao.maps.LatLng(place.y, place.x)
    );
    placeOverlay.current.setMap(map);
  };
   // 모달 열기
  const openModal = (index) => {
    setSelectedPlaces(savedCourses[index].places);
    console.log("모달확인", savedCourses[index].places);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 선택된 장소들에 대한 새 마커를 생성합니다.
    const newMarkers = selectedPlaces.map((place, index) => {
      // 각 장소에 대해 새 마커를 생성합니다.
      const imageIndex = index + 1; // 인덱스 + 1을 이미지 이름으로 사용
      const markerSrc = `${process.env.PUBLIC_URL}/mapmarker/nummarkers/0${imageIndex}.png`;
      console.log(imageIndex);
      const markerSize = new window.kakao.maps.Size(40, 40);
      const markerImg = new window.kakao.maps.MarkerImage(
        markerSrc,
        markerSize
      );
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
        // 마커의 위치를 장소의 좌표로 설정합니다.
        image: markerImg,
      });
      marker.setMap(map);
      // 생성된 마커를 지도에 추가합니다.
      return marker;
    });

    // 생성된 마커들을 상태로 업데이트합니다.
    setNumMarker(newMarkers);

    // 컴포넌트 언마운트 시 마커들을 정리합니다.
    return () => {
      newMarkers.forEach((marker) => {
        marker.setMap(null); // 지도에서 마커를 제거합니다.
      });
    };
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  // 마커 간 화살표 렌더링
  useEffect(() => {
    if (selectedPlaces.length > 1) {
      // 선택된 장소가 2개 이상인 경우에만 실행됩니다.
      const linePath = selectedPlaces.map(
        (place) => new window.kakao.maps.LatLng(place.y, place.x)
        // 각 장소의 좌표를 LatLng 객체로 변환하여 linePath 배열에 저장합니다.
      );

      const polyline = new window.kakao.maps.Polyline({
        endArrow: true, // 경로의 끝에 화살표를 추가합니다.
        path: linePath, // 경로를 linePath 배열로 설정합니다.
        strokeWeight: 5, // 경로의 선 두께를 설정합니다.
      });

      polyline.setMap(map);
      // 생성된 폴리라인을 지도에 추가합니다.

      return () => {
        polyline.setMap(null); // 컴포넌트 언마운트 시 폴리라인을 지도에서 제거합니다.
      };
    }
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  return (
    <BookWrapper>
      <BookContainer>
        <PlannerForm
          title={title}
          selectedPlaces={selectedPlaces}
          handleSaveCourse={handleSaveCourse}
          setSelectedPlaces={setSelectedPlaces}
          isEditing={isEditing}
          handleDeletePlace={handleDeletePlace}
          handleClearPlaces={handleClearPlaces}
        />

        <SavedCoursesList
          savedCourses={savedCourses}
          setSelectedCourse={(course) => setSelectedPlaces(course.places)}
          handleEditCourse={handleEditCourse}
          handleDeleteCourse={handleDeleteCourse}
          openModal={(index) => openModal(index)}
        />
      </BookContainer>
      <BookContainer>
        <MapContainer
          mapContainer={mapContainer}
          displayPlaceInfo={displayPlaceInfo}
          placeOverlay={placeOverlay}
          contentNode={contentNode}
          map={map}
          setMap={setMap}
          currCategory={currCategory}
          setCurrCategory={setCurrCategory}
          places={places}
          setPlaces={setPlaces}
        />
        <PlaceCardList
          places={places}
          onClickPlaceBtn={handlePlaceCardClick}
          onClickPlaceCard={onClickPlaceCard}
          selectedPlaces={selectedPlaces}
          currCategory={currCategory}
        />
      </BookContainer>

      <MapModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mapContainerRef={mapContainer}
        map={map}
        selectedPlaces={selectedPlaces}
        setNumMarker={setNumMarker}
      />
    </BookWrapper>
  );
};

export default DatePlanner;
