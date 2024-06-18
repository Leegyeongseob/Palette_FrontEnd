import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import CourseList from './CourseList';
import KakaoMap from './Map';


const PlannerContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #FFF8DC;
  border: 1px solid #E6E6FA;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: blue
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #E6E6FA;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #E6E6FA;
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
    background-color: black;
  }
`;

const DatePlanner = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [places, setPlaces] = useState('');
  const [savedCourses, setSavedCourses] = useState([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem('savedCourses');
    if (storedCourses) {
      setSavedCourses(JSON.parse(storedCourses));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { courseName, description, places };
    const updatedCourses = [...savedCourses, newCourse];
    setSavedCourses(updatedCourses);
    localStorage.setItem('savedCourses', JSON.stringify(updatedCourses));
    setCourseName('');
    setDescription('');
    setPlaces('');
  };

  return (
    <div>
      <Header />
      <PlannerContainer>
      <KakaoMap />
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
          <Button type="submit">저장</Button>
        </Form>
      </PlannerContainer>
      <CourseList courses={savedCourses} />
    </div>
  );
};

export default DatePlanner;