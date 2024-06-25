import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme6 from "../../img/background/theme/6.jpg";
import KakaoMap from "./Map";

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

const MapSection = styled.div`
  width: 25.8vw;
  min-width: 228px;
  display: flex;
  flex-direction: column;
`;

const MapBanner = styled.div`
  margin: 5px;
`;

const PlannerContainer = styled.div`
  padding: 10px;
  max-width: 600px;
  background-color: rgba(236, 205, 175, 1);
  border: 1px solid #e6e6fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  text-align: center;
  color: blue;
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e6e6fa;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #e6e6fa;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #444;
  }
`;

const SavedCoursesContainer = styled.div`
  margin-top: 20px;
`;

const SavedCoursesTitle = styled.h2`
  text-align: center;
  color: darkblue;
  margin-bottom: 10px;
`;

const CourseList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CourseItem = styled.li`
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseActions = styled.div`
  display: flex;
  gap: 5px;
`;

const DatePlanner = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [places, setPlaces] = useState("");
  const [savedCourses, setSavedCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const loadedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setSavedCourses(loadedCourses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedCourses = savedCourses.map((course, index) =>
        index === editIndex ? { courseName, description, places } : course
      );
      setSavedCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      setEditIndex(null);
    } else {
      const newCourse = { courseName, description, places };
      const updatedCourses = [...savedCourses, newCourse];
      setSavedCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }

    setCourseName("");
    setDescription("");
    setPlaces("");
  };

  const handleDelete = (index) => {
    const updatedCourses = savedCourses.filter((_, i) => i !== index);
    setSavedCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const handleEdit = (index) => {
    const course = savedCourses[index];
    setCourseName(course.courseName);
    setDescription(course.description);
    setPlaces(course.places);
    setEditIndex(index);
  };

  return (
    <div>
      <BookWrapper>
        <BookContainer>
          <SavedCoursesContainer>
            <SavedCoursesTitle>저장된 코스들</SavedCoursesTitle>
           
            <CourseList>
              {savedCourses.map((course, index) => (
                <CourseItem key={index}>
                  <div>
                    <h3>{course.courseName}</h3>
                    <p>{course.description}</p>
                    <p>{course.places}</p>
                  </div>
                  <CourseActions>
                    <Button onClick={() => handleEdit(index)}>수정</Button>
                    <Button onClick={() => handleDelete(index)}>삭제</Button>
                  </CourseActions>
                </CourseItem>
              ))}
            </CourseList>
          </SavedCoursesContainer>
           <PlannerContainer>
              <Title>데이트 코스 플래너</Title>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="코스 이름"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                <Textarea
                  placeholder="코스 설명"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Textarea
                  placeholder="장소들 (쉼표로 구분)"
                  value={places}
                  onChange={(e) => setPlaces(e.target.value)}
                />
                <Button type="submit">
                  {editIndex !== null ? "수정 완료" : "저장"}
                </Button>
              </Form>
            </PlannerContainer>
        </BookContainer>
        <BookContainer>
          <MapSection>
            <MapBanner>
              <KakaoMap />
            </MapBanner>
           
          </MapSection>
        </BookContainer>
      </BookWrapper>
    </div>
  );
};

export default DatePlanner;
