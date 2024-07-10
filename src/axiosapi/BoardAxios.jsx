import axiosInstance from "./AxiosInstance";

const BoardAxios = {
  fetchBoardData: async (page, size) => {
    try {
      const response = await axiosInstance.get("/boards", {
        params: {
          page: page,
          size: size,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch board data", error);
      throw error;
    }
  },

  fetchBoardById: async (id) => {
    try {
      const response = await axiosInstance.get(`/boards/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch board data with id: ${id}`, error);
      throw error;
    }
  },

  createBoard: async (boardReqDto) => {
    try {
      const response = await axiosInstance.post("/boards", boardReqDto);
      return response.data;
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      throw error;
    }
  },

  updateBoard: async (id, boardReqDto) => {
    try {
      const response = await axiosInstance.put(`/boards/${id}`, boardReqDto);
      return response.data;
    } catch (error) {
      console.error(`Failed to update board with id: ${id}`, error);
      throw error;
    }
  },

  deleteBoard: async (id) => {
    try {
      await axiosInstance.delete(`/boards/${id}`);
    } catch (error) {
      console.error(`Failed to delete board with id: ${id}`, error);
      throw error;
    }
  },
};

export default BoardAxios;
