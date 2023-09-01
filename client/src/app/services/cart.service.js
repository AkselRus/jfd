import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userId = localStorageService.getUserId();
const userEndpoint = `user/${userId}`;

const purchases = "/purchases/";

const cartService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },

    // getCurrentUser: async () => {
    //     const { data } = await httpService.get(userEndpoint + userId);
    //     return data;
    // },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + purchases,
            payload
        );

        return data;
    },
    delete: async (payload) => {
        const { data } = await httpService.delete(
            userEndpoint + "/purchases/" + payload
        );
        return data;
    },
    deleteAll: async () => {
        const { data } = await httpService.delete(userEndpoint + "/purchases");
        return data;
    }
};
export default cartService;
