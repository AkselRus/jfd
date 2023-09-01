import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";
const userId = localStorageService.getUserId();

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint, payload);
        return data;
    },
    delete: async () => {
        return await httpService.delete(userEndpoint + userId);
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + userId);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default userService;
