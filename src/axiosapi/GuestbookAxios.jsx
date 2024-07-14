import AxiosInstance from "./AxiosInstance";

const GuestbookAxios ={

getGuestBookEntries: async (coupleName) => {
    console.log("coupleName",coupleName)
    const response = await AxiosInstance.get(`/guestbook/${coupleName}`);
    console.log("response",response)
    return response.data;
    
},

addGuestBookEntry: async (entry) => {
    const response = await AxiosInstance.post('/guestbook', entry);
    return response.data;
},

updateGuestBookEntry: async (entryId, entry) => {
    await AxiosInstance.put(`/guestbook/${entryId}`, entry);
},

deleteGuestBookEntry: async (entryId, memberEmail) => {
    await AxiosInstance.delete(`/guestbook/${entryId}`, {
        params: { memberEmail }
    });
},
};
export default GuestbookAxios;