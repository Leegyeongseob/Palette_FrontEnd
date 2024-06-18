import React from 'react';
import styled from 'styled-components';
import CourseCard from './CourseCard';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const CourseList = ({ courses }) => {
  return (
    <ListContainer>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </ListContainer>
  );
};

export default CourseList;