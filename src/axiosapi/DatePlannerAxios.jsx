import AxiosInstance from './AxiosInstance';

const DatePlannerAxios = {
  // 모든 코스 조회
  getAllCourses: async () => {
    try {
      const response = await AxiosInstance.get('/course');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // 특정 ID의 코스 조회
  getCourseById: async (id) => {
    try {
      const response = await AxiosInstance.get(`/course/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${id}:`, error);
      throw error;
    }
  },

  // 새로운 코스 생성
  createCourse: async (courseData) => {
    try {
      const response = await AxiosInstance.post('/course', courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // 코스 수정
  updateCourse: async (id, courseData) => {
    try {
      const response = await AxiosInstance.put(`/course/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating course with ID ${id}:`, error);
      throw error;
    }
  },

  // 코스 삭제
  deleteCourse: async (id) => {
    try {
      await AxiosInstance.delete(`/course/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting course with ID ${id}:`, error);
      throw error;
    }
  }
};

export default DatePlannerAxios;
