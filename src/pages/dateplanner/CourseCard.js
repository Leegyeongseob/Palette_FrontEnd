import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  border: 1px solid ;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #FFF8DC;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
`;

const CardDescription = styled.p`
  margin: 0;
  color: black;
`;

const CourseCard = ({ course }) => {
  return (
    <Card>
      <CardImage src={course.img} alt={course.name} />
      <CardContent>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
