import AxiosInstance from "./AxiosInstance";

const AlbumAxiosApi = {
  albumReg: async (saveData) => {
    return await AxiosInstance.post("/album/save", saveData);
  },
  getImages: async (email) => {
    return await AxiosInstance.get("/album/images", {
      params: {
        email: email,
      },
    });
  },
};
export default AlbumAxiosApi;
