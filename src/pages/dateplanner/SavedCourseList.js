import React from "react";
import styled from "styled-components";

const SavedCoursesContainer = styled.div`
  max-width: 600px;
  background-color: rgba(236, 242, 248, 0.8);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
`;

const CourseList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CourseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const CourseTitle = styled.span`
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
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

const SavedCoursesList = ({openModal, savedCourses, setSelectedCourse, handleEditCourse, handleDeleteCourse }) => {

  
  
  return (
    <SavedCoursesContainer>
      <h2>저장된 코스</h2>
      <CourseList>
        {savedCourses.map((course, index) => (
          <CourseItem key={index}>
            <CourseTitle onClick={openModal}>{course.title}</CourseTitle>
            <ActionButtons>
              <Button onClick={() => handleEditCourse(index)}>수정</Button>
              <Button onClick={() => handleDeleteCourse(index)}>삭제</Button>
              <button onClick={openModal}>지도 보기</button>
            </ActionButtons>
          </CourseItem>
        ))}
      </CourseList>
    </SavedCoursesContainer>
  );
};

export default SavedCoursesList;
