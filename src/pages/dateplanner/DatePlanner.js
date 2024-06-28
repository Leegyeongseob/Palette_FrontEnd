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
  const placeOverlay = useRef(new window.kakao.maps.CustomOverlay({ zIndex: 1 }));
  const contentNode = useRef(document.createElement("div"));
  const mapContainer = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalMapContainerRef = useRef(null);
  const [numMarker, setNumMarker] = useState([]);
  const [title, setTitle] = useState("")

  
  const addNumMark = () => {
    // 선택된 장소를 numMarker에 추가
    setNumMarker([...numMarker, ...selectedPlaces]);
  };

  const handleSaveCourse = (newCourse) => {
    if (isEditing) {
      setSavedCourses((prevCourses) =>
        prevCourses.map((course, index) =>
          index === currentCourseIndex ? newCourse : course
        )
      );
      setIsEditing(false);
      setCurrentCourseIndex(null);
    } else {
      setSavedCourses((prevCourses) => [...prevCourses, newCourse]);
    }
    setSelectedPlaces([]);
    
  };

  const handleEditCourse = (index) => {
    const course = savedCourses[index];
    setSelectedPlaces(course.places);
    setTitle(course.title);
    console.log("타이틀",title)
    setIsEditing(true);
    setCurrentCourseIndex(index);
  };
  

  const handleDeleteCourse = (index) => {
    setSavedCourses((prevCourses) =>
      prevCourses.filter((_, i) => i !== index)
    );
   
  };

  const handleDeletePlace = (placeId) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.id !== placeId)
    );
  };

  const handlePlaceCardClick = (place) => {
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
    addNumMark(); // 장소를 클릭할 때마다 numMarker에 추가
  };

  const handleClearPlaces = () => {
    setSelectedPlaces([]);
  };

  const onClickPlaceCard = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    displayPlaceInfo(place);
  };

  const displayPlaceInfo = (place) => {
    ReactDOM.render(<DisplaceInfo place={place} />, contentNode.current);
    placeOverlay.current.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.current.setMap(map);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {

    // Create new markers for selected places
    const newMarkers = selectedPlaces.map(place => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });
      marker.setMap(map);
      return marker;
    });

    // Update markers state
    setNumMarker(newMarkers);

    // Clean up markers on component unmount
    return () => {
      newMarkers.forEach(marker => {
        marker.setMap(null); // Remove marker from map
      });
    };
  }, [selectedPlaces, map]);

  // 마커 간 화살표 렌더링
  useEffect(() => {
    if (selectedPlaces.length > 1) {
      const linePath = selectedPlaces.map(
        (place) => new window.kakao.maps.LatLng(place.y, place.x)
      );

      const polyline = new window.kakao.maps.Polyline({
        endArrow: true,
        path: linePath,
        strokeWeight: 5,
      });

      polyline.setMap(map);

      return () => {
        polyline.setMap(null); // 화살표 제거
      };
    }
  }, [selectedPlaces, map]);

  return (
    <BookWrapper>
      <BookContainer>
      
        <SavedCoursesList
        
          savedCourses={savedCourses}
          setSelectedCourse={(course) => setSelectedPlaces(course.places)}
          handleEditCourse={handleEditCourse}
          handleDeleteCourse={handleDeleteCourse}
          openModal={openModal}
        />

        <PlannerForm
          title={title}
          selectedPlaces={selectedPlaces}
          handleSaveCourse={handleSaveCourse}
          setSelectedPlaces={setSelectedPlaces}
          isEditing={isEditing}
          handleDeletePlace={handleDeletePlace}
          handleClearPlaces={handleClearPlaces}
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
          selectedPlaces={selectedPlaces}
          setSelectedPlaces={setSelectedPlaces}
          numMarker={numMarker} // numMarker 상태를 MapContainer에 전달
          setNumMarker={setNumMarker} // numMarker 상태를 업데이트할 수 있는 함수를 전달
        />
        <PlaceCardList
          places={places}
          onClickPlaceBtn={handlePlaceCardClick}
          onClickPlaceCard={onClickPlaceCard}
          selectedPlaces={selectedPlaces}
          currCategory={currCategory}
        />
        
      </BookContainer>

      <MapModal isOpen={isModalOpen} onClose={closeModal} mapContainerRef={modalMapContainerRef} />
    </BookWrapper>
  );
};

export default DatePlanner;
