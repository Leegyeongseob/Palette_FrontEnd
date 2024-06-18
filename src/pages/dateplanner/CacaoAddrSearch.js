import React, { useState } from "react";
const { kakao } = window;

const CacaoAddrSearch = () => {
  const [addr, setAddr] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const handleAddrSearch = () => {
    console.log("주소검색", addr);
    const Geocoder = new kakao.maps.services.Geocoder();
    Geocoder.addressSearch(addr, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLocation({ lat: coords.getLat(), lng: coords.getLng() });
      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    });
  };
  return (
    <div className="App">
      <input
        type="text"
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
        placeholder="주소를 입력하세요"
      />
      <button onClick={handleAddrSearch}>위치 찾기</button>
      {location.lat && (
        <div>
          <p>위도: {location.lat}</p>
          <p>경도: {location.lng}</p>
        </div>
      )}
    </div>
  );
};
export default CacaoAddrSearch;